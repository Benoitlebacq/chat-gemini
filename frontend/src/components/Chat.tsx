import { useEffect, useRef } from "react";

import { Message } from "../models/Chat.models";

const Chat: React.FC<{ messages: Message[] }> = ({ messages }) => {
    const messageEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="chat">
            {messages.map((message, index) => (
                <div className={message.isUser ? "userMessage" : "AIMessage"} key={index}>
                    {message.content}
                </div>
            ))}
            <div ref={messageEndRef} />
        </div>
    )
}

export default Chat