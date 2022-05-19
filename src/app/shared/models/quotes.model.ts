import { Timestamp } from 'firebase/firestore';

export interface Quote {
    id: string;
    created_at: Timestamp;
    author: string | null;
    content: string;
}

export interface QuoteParams {
    content: string;
    author: string | null;
    created_at?: Timestamp;
}

export interface SuggestedQuote {
    text: string;
    author: string;
}
