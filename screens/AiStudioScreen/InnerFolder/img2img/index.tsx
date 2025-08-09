import React, { useState, useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';
import styles from '../AiChat.module.sass';

// Import your services
import { img2Img, uploadMedia } from 'services/api/aiModel/aiStudioServices';

type ImageToImageModelProps = {
  className?: string;
  message: string;
  inputImage?: string | File; // Can be URL string or File object
  onResponse: (response: string, generatedImage?: string) => void;
};

const ImageToImageModel = ({ className, message, inputImage, onResponse }: ImageToImageModelProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  // Add refs to track processing state and prevent duplicate calls
  const isProcessingRef = useRef(false);
  const lastProcessedMessage = useRef<string>('');

  const processImage = useCallback(async () => {
    // Prevent duplicate calls
    if (isProcessingRef.current) {
      return;
    }

    // Check if we've already processed this exact message
    if (lastProcessedMessage.current === message) {
      return;
    }

    if (!message || !message.trim()) {
      onResponse("Please provide a prompt to transform the image.", undefined);
      return;
    }

    if (!inputImage) {
      onResponse("Please provide an image to transform.", undefined);
      return;
    }

    // Set processing flags
    isProcessingRef.current = true;
    lastProcessedMessage.current = message;
    
    setIsProcessing(true);
    setProgress(5);
    setCurrentStep('Starting image processing...');
    setGeneratedImage(null);

    try {
      let imageUrlToUse = '';

      // Step 1: ALWAYS upload the image first via uploadMedia API
      setProgress(15);
      setCurrentStep('Uploading image to get URL...');

      try {
        let uploadPayload;
        
        if (inputImage instanceof File) {
          // If it's a File object, use it directly
          uploadPayload = {
            files: inputImage
          };
        } else if (typeof inputImage === 'string') {
          // If it's a URL string, we need to convert it to a File first
          // Fetch the image and convert to blob, then to File
          const response = await fetch(inputImage);
          const blob = await response.blob();
          const file = new File([blob], 'image.png', { type: blob.type });
          
          uploadPayload = {
            files: file
          };
        } else {
          throw new Error('Invalid input image format');
        }
        
        console.log('Calling uploadMedia API...');
        const uploadResponse = await uploadMedia(uploadPayload);
        console.log('Upload response:', uploadResponse);
        
        if (uploadResponse && uploadResponse.urls && Array.isArray(uploadResponse.urls) && uploadResponse.urls.length > 0) {
          imageUrlToUse = uploadResponse.urls[0];
          setUploadedImageUrl(imageUrlToUse);
          setProgress(35);
          setCurrentStep('Image uploaded successfully, got URL: ' + imageUrlToUse.substring(0, 50) + '...');
        } else {
          console.error('Upload response structure:', uploadResponse);
          throw new Error('Failed to upload image - no URLs returned from uploadMedia API. Check response structure.');
        }
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Image upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown upload error'}`);
      }

      // Step 2: Get API key and prepare img2img
      const apiKey = process.env.NEXT_PUBLIC_TEXT_2_IMAGE_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }
      
      setProgress(45);
      setCurrentStep('Building transformation request with uploaded image URL...');

      // Step 3: Create img2img payload using the uploaded image URL
      const payload = {
        key: apiKey,
        model_id: "flux",
        prompt: message,
        negative_prompt: "(worst quality:2), (low quality:2), (normal quality:2), (jpeg artifacts), (blurry), (duplicate), (morbid), (mutilated), (out of frame), (extra limbs), (bad anatomy), (disfigured), (deformed), (cross-eye), (glitch), (oversaturated), (overexposed), (underexposed), (bad proportions), (bad hands), (bad feet), (cloned face), (long neck), (missing arms), (missing legs), (extra fingers), (fused fingers), (poorly drawn hands), (poorly drawn face), (mutation), (deformed eyes), watermark, text, logo, signature, grainy, tiling, censored, nsfw, ugly, blurry eyes, noisy image, bad lighting, unnatural skin, asymmetry",
        init_image: imageUrlToUse, // This will now ALWAYS be the URL from uploadMedia API
        width: "1024",
        height: "1024", 
        samples: "1",
        num_inference_steps: "31",
        safety_checker: true,
        safety_checker_type: "sensitive_content_text",
        enhance_prompt: false,
        guidance_scale: 7.5,
        strength: 0.7,
        scheduler: "DPMSolverMultistepScheduler",
        seed: "",
        base64: false,
        webhook: null,
        track_id: null
      };
      
      console.log('img2img payload:', payload);
      
      setProgress(60);
      setCurrentStep('Calling img2img API with uploaded image URL...');

      // Step 4: Make img2img API call
      console.log('Calling img2Img API with payload:', JSON.stringify(payload, null, 2));
      const response = await img2Img(payload);
      console.log('img2Img response:', JSON.stringify(response, null, 2));
      
      setProgress(75);
      setCurrentStep('Processing response...');

      // Handle different response scenarios
      if (!response) {
        throw new Error('No response received from img2img API');
      }

      // Check for API limit error immediately
      if (response.message && response.message.includes('limit')) {
        throw new Error(`API Limit Error: ${response.message}`);
      }

      if (response.error && response.error.includes('limit')) {
        throw new Error(`API Limit Error: ${response.error}`);
      }

      // Success with immediate result
      if (response.status === 'success') {
        if (response.output && Array.isArray(response.output) && response.output.length > 0) {
          setProgress(100);
          setCurrentStep('Complete!');
          
          const imageUrl = response.output[0];
          setGeneratedImage(imageUrl);
          
          setTimeout(() => {
            onResponse(`Image generated successfully using uploaded image: ${uploadedImageUrl}`, imageUrl);
            setIsProcessing(false);
            setProgress(0);
            setCurrentStep('');
            isProcessingRef.current = false;
          }, 500);
          return;
        } else {
          throw new Error('No image in successful response');
        }
      }

      // Processing status - need to poll
      if (response.status === 'processing') {
        setCurrentStep('Image is being generated...');
        setProgress(80);

        const maxAttempts = 15; // Reduced attempts
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          setCurrentStep(`Generating... (${attempt + 1}/${maxAttempts})`);
          setProgress(80 + (attempt / maxAttempts) * 15);

          await new Promise(resolve => setTimeout(resolve, 2000)); // Reduced wait time

          try {
            if (response.fetch_result && response.fetch_result.length > 0) {
              const fetchUrl = response.fetch_result[0];
              console.log(`Polling attempt ${attempt + 1}, fetching: ${fetchUrl}`);
              
              const pollResponse = await fetch(fetchUrl);
              const pollResult = await pollResponse.json();
              console.log(`Poll result ${attempt + 1}:`, pollResult);

              if (pollResult.status === 'success' && pollResult.output) {
                const imageUrl = Array.isArray(pollResult.output) ? pollResult.output[0] : pollResult.output;
                
                setProgress(100);
                setCurrentStep('Complete!');
                setGeneratedImage(imageUrl);
                
                setTimeout(() => {
                  onResponse(`Image generated successfully after polling (${attempt + 1} attempts)`, imageUrl);
                  setIsProcessing(false);
                  setProgress(0);
                  setCurrentStep('');
                  isProcessingRef.current = false;
                }, 500);
                return;
              }

              if (pollResult.status === 'failed' || pollResult.status === 'error') {
                throw new Error(pollResult.message || pollResult.error || 'Generation failed during processing');
              }
            }
          } catch (pollError) {
            console.error(`Polling error on attempt ${attempt + 1}:`, pollError);
            if (attempt === maxAttempts - 1) {
              throw new Error(`Polling failed after ${maxAttempts} attempts: ${pollError.message}`);
            }
          }
        }

        throw new Error('Image generation timed out during polling');
      }

      // Error status
      if (response.status === 'error' || response.status === 'failed') {
        const errorMsg = response.message || response.error || response.messege || 'Generation failed';
        throw new Error(`API Error: ${errorMsg}`);
      }

      // Unknown status
      throw new Error(`Unexpected response status: ${response.status || 'unknown'} - Full response: ${JSON.stringify(response)}`);

    } catch (error) {
      // Better error handling
      let errorMessage = 'Failed to transform image';
      
      if (error && typeof error === 'object') {
        // Handle axios/network errors
        if ('response' in error && error.response) {
          // Type assertion to access response safely
          const errWithResponse = error as { response: { data: any; status: number } };
          
          const responseData = errWithResponse.response.data;
          if (typeof responseData === 'string') {
            errorMessage = responseData;
          } else if (responseData && responseData.message) {
            errorMessage = responseData.message;
          } else if (responseData && responseData.error) {
            errorMessage = responseData.error;
          } else {
            errorMessage = `HTTP ${errWithResponse.response.status} Error`;
          }
        } else if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message;
        } else if (error.toString && error.toString() !== '[object Object]') {
          errorMessage = error.toString();
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      onResponse(`Sorry, I encountered an error while transforming the image: ${errorMessage}`, undefined);
      
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setCurrentStep('');
      isProcessingRef.current = false; // Always reset processing flag
    }
  }, [message, inputImage, onResponse]); // Include all dependencies

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'transformed-image.png';
      link.click();
    }
  };

  const copyImageUrl = () => {
    if (generatedImage) {
      navigator.clipboard.writeText(generatedImage);
    }
  };

  // Fixed useEffect with proper dependency array and duplicate prevention
  useEffect(() => {
    // Only process if we have a message and we're not already processing
    if (message && message.trim() && !isProcessingRef.current && lastProcessedMessage.current !== message) {
      processImage();
    }
  }, [message, processImage]); // Proper dependency array

  if (!message && !isProcessing && !generatedImage) {
    return null;
  }

  // Helper function to get display image source
  const getDisplayImageSrc = () => {
    if (inputImage instanceof File) {
      return URL.createObjectURL(inputImage);
    }
    return uploadedImageUrl || (typeof inputImage === 'string' ? inputImage : '');
  };

  return (
    <div className={styles.content}>
      {(inputImage || uploadedImageUrl) && (
        <div className={styles.inputPreview}>
          <div className={styles.imageContainer}>
            <img 
              src={getDisplayImageSrc()} 
              alt="Input image"
              className={styles.inputImage}
            />
            <div className={styles.imageLabel}>Input</div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className={styles.generationProgress}>
          <div className={styles.loadingAnimation}>
            <div className={styles.spinner}></div>
          </div>
          <div className={styles.progressText}>
            {currentStep || 'Processing...'}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {generatedImage && (
        <div className={styles.generatedImage}>
          <div className={styles.imageContainer}>
            <img 
              src={generatedImage} 
              alt="Generated image"
              className={styles.outputImage}
            />
            <div className={styles.imageLabel}>Generated</div>
          </div>
          <div className={styles.imageActions}>
            <button onClick={downloadImage} className={styles.actionButton}>
              Download
            </button>
            <button onClick={copyImageUrl} className={styles.actionButton}>
              Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageToImageModel;