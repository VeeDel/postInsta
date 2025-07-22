export interface addLanguageColumnPayload {
    language_code:string;
    language_name:string;
}

export interface getLanguageDataFromStatusIdPayload {
    status_id:number;
}

export interface translateAllKeywordsPayload {
    language_code:string;
}

export interface editLanguagePayload {
    status_id:number;
    language:string;
    country:string;
    default_status: boolean;
    language_alignment:string;
}

export interface translateOneKeywordPayload {
    setting_id:number;
    status_id:number;
    newValue:string;
}

export interface fetchLanguageKeywordsWithTranslationPayload {
    status_id:number;
    page_no:number;
    per_page:number;
}

export interface editKeywordPayload {
    status_id:number;
    setting_id:number;
    newValue:string;
}