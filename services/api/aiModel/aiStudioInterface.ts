export interface text2ImgPayload {
    key: string;
    prompt: string;
    negative_prompt: string;
    samples: string;
    height: string;
    width: string;
    safety_checker: boolean;
    seed: null;
    base64: boolean;
    webhook: null;
    track_id: null;
    model_id: string;
}

// img2img 
export interface img2ImgPayload {
    key: string;
    model_id: string;
    prompt: string;
    negative_prompt: string;
    init_image: string;
    width: string;
    height: string;
    samples: string;
    temp?: boolean;
    safety_checker: boolean;
    strength: number;
    seed: null | string;
    webhook: null | string;
    track_id: null | string;
    base64?: boolean;
    enhance_prompt?: boolean;
    enhance_style?: string;
    instant_response?: boolean;
}

export interface uploadMediaPaylod {
    files: File;
}