import { ChangeEvent, FormEvent, useState, useEffect, useRef, useCallback } from "react";
import cn from "classnames";
import Tabs from "@/components/Tabs";
import Search from "@/components/Search";
import Actions from "@/components/Actions";
import ScrollMask from "@/components/ScrollMask";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import styles from "./InnerFolder.module.sass";

import { media } from "mocks/media";
import AiChat from "@/components/AiChat";

// Import the ImageModal component
import ImageModal from "@/components/AiChat/ImageModal/index";

// Import model response components
import TextToImageModel from "@/screens/AiStudioScreen/InnerFolder/text2img/index";
import ImageToImageModel from "@/screens/AiStudioScreen/InnerFolder/img2img/index";

type Message = {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  image?: string;
  isProcessing?: boolean;
};

type FolderChatData = {
  messages: Message[];
  newChat: string;
  processingMessage: string;
  processingImage: string;
  showModelResponse: boolean;
};

type InnerFolderProps = {
    className?: string;
    onClose: () => void;
    selectedFolderId?: string;
    selectedFolderName?: string;
    selectedFolderType?: string;
};

// Create a global store for folder chats outside the component
const folderChatsStore: Record<string, FolderChatData> = {};
// Track object URLs for cleanup
const imageUrlsToCleanup = new Set<string>();

const InnerFolder = ({ 
    className, 
    onClose, 
    selectedFolderId, 
    selectedFolderName, 
    selectedFolderType 
}: InnerFolderProps) => {
    const [tab, setTab] = useState<string>("all");
    const [search, setSearch] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [error, setError] = useState<string>("");
    const [forceUpdate, setForceUpdate] = useState(0);
    
    // Modal state for image preview
    const [modalImage, setModalImage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Ref for the chat history container to control scrolling
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    // Initialize folder data if it doesn't exist
    const initializeFolderData = useCallback((folderId: string): FolderChatData => {
        if (!folderChatsStore[folderId]) {
            folderChatsStore[folderId] = {
                messages: [],
                newChat: "",
                processingMessage: "",
                processingImage: "",
                showModelResponse: false
            };
        }
        return folderChatsStore[folderId];
    }, []);

    // Get current folder's chat data
    const getCurrentFolderData = useCallback((): FolderChatData => {
        if (!selectedFolderId) {
            return {
                messages: [],
                newChat: "",
                processingMessage: "",
                processingImage: "",
                showModelResponse: false
            };
        }
        
        return initializeFolderData(selectedFolderId);
    }, [selectedFolderId, initializeFolderData]);

    // Update current folder's chat data
    const updateCurrentFolderData = useCallback((updates: Partial<FolderChatData>) => {
        if (!selectedFolderId) return;
        
        initializeFolderData(selectedFolderId);
        
        folderChatsStore[selectedFolderId] = {
            ...folderChatsStore[selectedFolderId],
            ...updates
        };
        
        // Force re-render
        setForceUpdate(prev => prev + 1);
    }, [selectedFolderId, initializeFolderData]);

    const currentFolderData = getCurrentFolderData();

    // Cleanup object URLs when component unmounts or folder changes
    useEffect(() => {
        return () => {
            imageUrlsToCleanup.forEach(url => {
                try {
                    URL.revokeObjectURL(url);
                } catch (e) {
                    console.warn('Failed to cleanup URL:', url);
                }
            });
            imageUrlsToCleanup.clear();
        };
    }, [selectedFolderId]);

    // Force re-render when folder changes
    useEffect(() => {
        setError(""); // Clear any previous errors
    }, [selectedFolderId]);

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Implement search functionality
    };

    // Function to scroll to bottom of chat
    const scrollToBottom = useCallback(() => {
        if (chatHistoryRef.current) {
            requestAnimationFrame(() => {
                if (chatHistoryRef.current) {
                    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
                }
            });
        }
    }, []);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [currentFolderData.messages, currentFolderData.showModelResponse, forceUpdate, scrollToBottom]);

    // Handle viewport changes on mobile (keyboard open/close)
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                scrollToBottom();
            }, 100);
        };

        const events = ['resize', 'orientationchange'];
        events.forEach(event => window.addEventListener(event, handleResize));
        
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        }

        return () => {
            clearTimeout(timeoutId);
            events.forEach(event => window.removeEventListener(event, handleResize));
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleResize);
            }
        };
    }, [scrollToBottom]);

    // Handle image click to open modal
    const handleImageClick = useCallback((imageSrc: string) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
    }, []);

    // Close modal
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setModalImage("");
    }, []);

    // Handle model response
    const handleModelResponse = useCallback((response: string, generatedImage?: string) => {
        try {
            const aiResponse: Message = {
                id: `ai-${Date.now()}-${Math.random()}`,
                content: response,
                timestamp: new Date(),
                isUser: false,
                image: generatedImage
            };
            
            const currentData = getCurrentFolderData();
            updateCurrentFolderData({
                messages: [...currentData.messages, aiResponse],
                showModelResponse: false,
                processingMessage: "",
                processingImage: ""
            });
            setError(""); // Clear any previous errors
        } catch (err) {
            console.error('Error handling model response:', err);
            setError('Failed to process model response');
        }
    }, [getCurrentFolderData, updateCurrentFolderData]);

    const handleSendMessage = useCallback((messageContent: string, imageFile?: File) => {
        if (!selectedFolderId) return;
        
        try {
            // Handle image upload if provided
            let imageUrl = '';
            if (imageFile) {
                imageUrl = URL.createObjectURL(imageFile);
                imageUrlsToCleanup.add(imageUrl);
            }

            const newMessage: Message = {
                id: `user-${Date.now()}-${Math.random()}`,
                content: messageContent,
                timestamp: new Date(),
                isUser: true,
                image: imageUrl || undefined
            };
            
            const currentData = getCurrentFolderData();
            const updatedMessages = [...currentData.messages, newMessage];
            
            // Check if we need to show model response based on selected folder type
            if (selectedFolderType === "text-to-image" || selectedFolderType === "image-to-image") {
                updateCurrentFolderData({
                    messages: updatedMessages,
                    newChat: "", // Clear the input
                    processingMessage: messageContent,
                    processingImage: imageUrl,
                    showModelResponse: true
                });
            } else {
                // Default AI response for other folder types
                updateCurrentFolderData({
                    messages: updatedMessages,
                    newChat: "" // Clear the input
                });
                
                // Simulate AI response
                setTimeout(() => {
                    const aiResponse: Message = {
                        id: `ai-${Date.now()}-${Math.random()}`,
                        content: imageUrl 
                            ? `I can see the image you shared! ${messageContent || "Nice photo!"}`
                            : `AI response to: "${messageContent}"`,
                        timestamp: new Date(),
                        isUser: false
                    };
                    
                    const latestData = getCurrentFolderData();
                    updateCurrentFolderData({
                        messages: [...latestData.messages, aiResponse]
                    });
                }, 1000);
            }
            setError(""); // Clear any previous errors
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message');
        }
    }, [selectedFolderId, selectedFolderType, getCurrentFolderData, updateCurrentFolderData]);

    // Handle content change in chat input - with immediate update
    const handleChatContentChange = useCallback((content: string) => {
        if (!selectedFolderId) return;
        
        // Directly update the store without triggering full re-render
        initializeFolderData(selectedFolderId);
        folderChatsStore[selectedFolderId].newChat = content;
        
        // Only update state for this specific change to avoid re-mounting components
        setForceUpdate(prev => prev + 1);
    }, [selectedFolderId, initializeFolderData]);

    const handleClearChat = useCallback(() => {
        if (!selectedFolderId) return;
        
        try {
            // Clean up any image URLs for this folder
            const currentData = getCurrentFolderData();
            currentData.messages.forEach(message => {
                if (message.image && imageUrlsToCleanup.has(message.image)) {
                    URL.revokeObjectURL(message.image);
                    imageUrlsToCleanup.delete(message.image);
                }
            });
            
            // Clear the current folder's chat data
            updateCurrentFolderData({
                messages: [],
                newChat: "",
                processingMessage: "",
                processingImage: "",
                showModelResponse: false
            });
            
            console.log(`Cleared chat for folder: ${selectedFolderName} (ID: ${selectedFolderId})`);
        } catch (err) {
            console.error('Error clearing chat:', err);
            setError('Failed to clear chat');
        }
    }, [selectedFolderId, selectedFolderName, getCurrentFolderData, updateCurrentFolderData]);

    const tabs = [
        {
            title: "All",
            value: "all",
        },
        {
            title: "Media",
            value: "media",
        },
    ];

    const actions = [
        {
            title: "Delete folder",
            icon: "trash",
            onClick: () => console.log("Delete folder"),
        },
        {
            title: "Clear all chat's",
            icon: "link",
            onClick: handleClearChat,
        },
    ];

    // Render the appropriate model response component
    const renderModelResponse = () => {
        if (!currentFolderData.showModelResponse) return null;

        try {
            switch (selectedFolderType) {
                case "text-to-image":
                    return (
                        <TextToImageModel
                            key={`text-to-image-${selectedFolderId}`}
                            message={currentFolderData.processingMessage}
                            onResponse={handleModelResponse}
                        />
                    );
                case "image-to-image":
                    return (
                        <ImageToImageModel
                            key={`image-to-image-${selectedFolderId}`}
                            message={currentFolderData.processingMessage}
                            inputImage={currentFolderData.processingImage}
                            onResponse={handleModelResponse}
                        />
                    );
                default:
                    return null;
            }
        } catch (err) {
            console.error('Error rendering model response:', err);
            return (
                <div className={styles.error}>
                    Failed to load model response
                </div>
            );
        }
    };

    // Debug logging (only in development)
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`Current folder: ${selectedFolderId} (${selectedFolderName})`);
            console.log('Current folder data:', currentFolderData);
        }
    }, [selectedFolderId, selectedFolderName, currentFolderData]);

    return (
        <div className={cn("row-container", className, styles.container)} style={isMobile ? { height: '100vh', maxHeight: '100vh', overflow: 'hidden' } : {}}>
            <div className={styles.head}>
                <button
                    className={cn("button-circle", styles.back)}
                    onClick={onClose}
                    aria-label="Go back"
                >
                    <Icon name="arrow-left" />
                </button>
                <Tabs
                    className={styles.tabs}
                    items={tabs}
                    value={tab}
                    setValue={setTab}
                />
                <Search
                    className={styles.search}
                    placeholder="Search previous chat's..."
                    value={search}
                    onChange={handleSearchChange}
                    onSubmit={handleSearchSubmit}
                />
                <Actions
                    className={styles.actions}
                    classBody={styles.actionsBody}
                    items={actions}
                    headButton
                />
            </div>
            
            {/* Error display */}
            {error && (
                <div className={styles.errorBanner}>
                    {error}
                    <button onClick={() => setError("")} className={styles.errorClose}>×</button>
                </div>
            )}
            
            <div className={styles.content} style={isMobile ? { paddingBottom: '160px' } : {}}>
                {tab === "all" && (
                    <>
                        <div className={styles.chatHistoryContainer} ref={chatHistoryRef}>
                            {currentFolderData.messages.length > 0 ? (
                                <>
                                    {currentFolderData.messages.map((message) => (
                                        <div 
                                            key={`${selectedFolderId}-${message.id}`}
                                            className={cn(styles.message, {
                                                [styles.userMessage]: message.isUser,
                                                [styles.aiMessage]: !message.isUser
                                            })}
                                        >
                                            {/* Only show header if there's actual content or if it's a user message */}
                                            {(message.content.trim() || message.isUser) && (
                                                <div className={styles.messageHeader}>
                                                    <div className={styles.messageSender}>
                                                        {message.isUser ? "You" : "AI"}
                                                    </div>
                                                    <div className={styles.messageTime}>
                                                        {message.timestamp.toLocaleTimeString([], { 
                                                            hour: '2-digit', 
                                                            minute: '2-digit' 
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                            <div className={styles.messageContent}>
                                                {message.image && (
                                                    <div className={styles.messageImage}>
                                                        <img 
                                                            src={message.image} 
                                                            alt="Generated image"
                                                            onClick={() => handleImageClick(message.image!)}
                                                            className={styles.clickableImage}
                                                            onError={(e) => {
                                                                console.error('Failed to load image:', message.image);
                                                                e.currentTarget.style.display = 'none';
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {/* Only show content if it's not empty */}
                                                {message.content.trim() && message.content}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Model Response Component */}
                                    {renderModelResponse()}
                                </>
                            ) : (
                                <div className={styles.emptyState}>
                                    {selectedFolderName ? (
                                        <div>
                                            <h4>Welcome to {selectedFolderName}!</h4>
                                            <p>Start a conversation to begin using this AI model.</p>
                                        </div>
                                    ) : (
                                        <p>No messages yet. Start a conversation!</p>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.aiChatWrapper}>
                            <AiChat
                                key={selectedFolderId} // Only re-mount when folder changes
                                className={styles.aiChatComponent}
                                content={currentFolderData.newChat}
                                setContent={handleChatContentChange}
                                messages={currentFolderData.messages}
                                onSendMessage={handleSendMessage}
                                placeholder={selectedFolderType === "text-to-image" 
                                    ? "Describe the image you want to generate..." 
                                    : selectedFolderType === "image-to-image"
                                    ? "Upload an image and describe how to transform it..."
                                    : "Start a chat..."
                                }
                            />
                        </div>
                    </>
                )}
                
                {tab === "media" && (
                    <ScrollMask className={styles.body} isMobileNavigation>
                        <div className={styles.images}>
                            {media.map((item) => (
                                <div key={item.id} className={styles.image}>
                                    <Image
                                        src={item.image}
                                        width={198}
                                        height={158}
                                        alt={item.id}
                                    />
                                </div>
                            ))}
                        </div>
                    </ScrollMask>
                )}
            </div>

            {/* Image Modal */}
            <ImageModal
                src={modalImage}
                alt="Full size image"
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default InnerFolder;