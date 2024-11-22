import { ChangeEvent, KeyboardEvent } from "react";

export type Content = {
    role: string;
    parts: [{ text: string }];
}

export type Message = {
    content: string;
    isUser: boolean;
    timestamp: Date;
}

export type InputProps = {
    inputMessage: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleSendMessage: () => Promise<undefined>;
    isLoading: boolean;
}