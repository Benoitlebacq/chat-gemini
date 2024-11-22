export type Content = {
    role: string;
    parts: [{ text: string }];
}

export type Messsage = {
    content: string;
    isUser: boolean;
    timestamp: Date;
}