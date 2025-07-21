
import { useRouter } from "next/navigation";
import cn from "classnames";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import styles from "./Background.module.sass";

type BackgroundProps = {
    onSave?: () => void;
    isLoading?: boolean;
    onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    triggerFileInput?: () => void;
    previewImage?: string | null;
    fileInputRef?: React.RefObject<HTMLInputElement>;
};

const Background = ({ 
    onSave, 
    isLoading, 
    onImageChange, 
    triggerFileInput, 
    previewImage,
    fileInputRef 
}: BackgroundProps) => {
    const router = useRouter();

    return (
        <div className={styles.background}>
            <Image
                src="/images/background-1.jpg"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt=""
            />
            <div className={styles.avatar} onClick={triggerFileInput}>
                <Image
                    src={previewImage || "/images/avatar-9.png"}
                    width={80}
                    height={80}
                    alt="Profile"
                />
                <Icon name="camera" />
                <input 
                    type="file" 
                    onChange={onImageChange} 
                    ref={fileInputRef}
                    accept="image/*"
                    // style={{ display: 'none' }}
                />
            </div>
            <button
                className={cn("button-circle", styles.back)}
                onClick={() => router.back()}
            >
                <Icon name="arrow-left" />
            </button>
            <div className={styles.buttons}>
                <button className={cn("button-circle", styles.button)}>
                    <Icon name="trash" />
                </button>
                <button className={cn("button-circle", styles.button)}>
                    <Icon name="camera" />
                </button>
                <button 
                    className={cn("button", styles.button)} 
                    onClick={onSave} 
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default Background;