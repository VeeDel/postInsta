import React, { useState, useRef } from 'react';
import cn from 'classnames';
import styles from '../AiChat.module.sass';
import { text2Img } from 'services/api/aiModel/aiStudioServices';
import { text2ImgPayload } from 'services/api/aiModel/aiStudioInterface';

// Global cache to prevent duplicate API calls for same message
const generationCache = new Map<string, Promise<any>>();

type TextToImageModelProps = {
  className?: string;
  message: string;
  onResponse: (response: string, generatedImage?: string) => void;
};

const TextToImageModel = ({ className, message, onResponse }: TextToImageModelProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);
  const isGeneratingRef = useRef(false);
  const messageRef = useRef<string>('');

  const generateImage = async () => {
    const cacheKey = `${message.trim()}_${Date.now()}`;
    
    // Multiple prevention checks
    if (isGeneratingRef.current || isGenerating || hasGenerated || messageRef.current === message) {
      return;
    }

    // Check if same request is already in progress
    if (generationCache.has(message.trim())) {
      try {
        const cachedResponse = await generationCache.get(message.trim());
        if (cachedResponse && cachedResponse.status === 'success' && cachedResponse.output && cachedResponse.output.length > 0) {
          const generatedImageUrl = Array.isArray(cachedResponse.output) ? cachedResponse.output[0] : cachedResponse.output;
          setGeneratedImage(generatedImageUrl);
          onResponse("Image generated successfully!", generatedImageUrl);
        }
      } catch (error) {
        // Silent error handling
      }
      return;
    }

    // Set all flags to prevent duplicate calls
    isGeneratingRef.current = true;
    messageRef.current = message;
    setIsGenerating(true);
    setHasGenerated(true);
    setProgress(0);
    setGeneratedImage(null);
    setCurrentStep('Initializing...');

    // Start progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Get API key from environment
      const apiKey = process.env.NEXT_PUBLIC_TEXT_2_IMAGE_KEY;
      
      if (!apiKey) {
        throw new Error('API key not found. Please check your environment configuration.');
      }

      setCurrentStep('Preparing image generation...');

      // Create payload using your interface - ensure single image generation
      const payload: text2ImgPayload = {
        key: apiKey,
        prompt: message,
        negative_prompt: "(worst quality:2), (low quality:2), (normal quality:2), (jpeg artifacts), (blurry), (duplicate), (morbid), (mutilated), (out of frame), (extra limbs), (bad anatomy), (disfigured), (deformed), (cross-eye), (glitch), (oversaturated), (overexposed), (underexposed), (bad proportions), (bad hands), (bad feet), (cloned face), (long neck), (missing arms), (missing legs), (extra fingers), (fused fingers), (poorly drawn hands), (poorly drawn face), (mutation), (deformed eyes), watermark, text, logo, signature, grainy, tiling, censored, nsfw, ugly, blurry eyes, noisy image, bad lighting, unnatural skin, asymmetry",
        samples: "1", // Explicitly set to 1
        height: "1024",
        width: "1024",
        safety_checker: true,
        seed: null,
        base64: false,
        webhook: null,
        track_id: null,
        model_id: "gen4_image"
      };

      setCurrentStep('Generating image...');

      // Create and cache the API promise to prevent duplicate calls
      const apiPromise = text2Img(payload);
      generationCache.set(message.trim(), apiPromise);

      // Call your API service
      const response = await apiPromise;
      
      // Complete progress
      setProgress(100);
      clearInterval(progressInterval);
      setCurrentStep('Complete!');

      // Handle the API response - ensure only one image is processed
      if (response && response.status === 'success' && response.output && response.output.length > 0) {
        // Always take only the first image, even if multiple are returned
        const generatedImageUrl = Array.isArray(response.output) ? response.output[0] : response.output;
        
        // Additional check to ensure we only have one image URL
        if (typeof generatedImageUrl === 'string' && generatedImageUrl.trim()) {
          setGeneratedImage(generatedImageUrl);
          
          // Clean up cache after successful generation
          setTimeout(() => {
            generationCache.delete(message.trim());
            // Call onResponse only once with single image
            onResponse("", generatedImageUrl);
            setIsGenerating(false);
            isGeneratingRef.current = false;
            setProgress(0);
            setCurrentStep('');
          }, 500);
        } else {
          throw new Error('Invalid image URL received from API');
        }
      } else {
        throw new Error(response?.message || 'Failed to generate image. Please try again.');
      }
      
    } catch (error) {
      clearInterval(progressInterval);
      
      // Clean up cache on error
      generationCache.delete(message.trim());
      
      // Reset all flags
      isGeneratingRef.current = false;
      setIsGenerating(false);
      setHasGenerated(false); // Reset on error to allow retry
      setProgress(0);
      setCurrentStep('');
      
      let errorMessage = "Sorry, I encountered an error while generating the image.";
      
      if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
      }
      
      onResponse(errorMessage, undefined);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png';
      link.click();
    }
  };

  const copyImageUrl = () => {
    if (generatedImage) {
      navigator.clipboard.writeText(generatedImage);
    }
  };

  React.useEffect(() => {
    // Prevent multiple generations and only generate once
    if (message.trim() && !hasGenerated && !isGenerating && !isGeneratingRef.current && messageRef.current !== message) {
      generateImage();
    }
  }, [message]); // Only depend on message

  if (!message.trim() && !isGenerating && !generatedImage) {
    return null;
  }

  return (
    <div className={styles.content}>
        <div className={styles.prompt}>
          <strong>Prompt:</strong> {message}
        </div>

        {isGenerating && (
          <div className={styles.generationProgress}>
            <div className={styles.loadingAnimation}>
              <div className={styles.spinner}></div>
            </div>
            <div className={styles.progressText}>
              Generating image...
            </div>
          </div>
        )}

      </div>
  );
};

export default TextToImageModel;