import "./chatInterface.scss";

import { ChangeEvent, KeyboardEvent, useState } from "react";

import { Content, Message } from "../models/Chat.models";
import Chat from "./Chat";
import Input from "./Input";

const ChatInterface: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);

  const handleSendMessage = async (): Promise<undefined> => {
    if (!inputMessage.trim()) return

    //Ajouter le message de l'utilisateur
    const userMessage: Message = {
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setInputMessage('')
    setIsLoading(true)
    setMessages((previousMessage) => [...previousMessage, userMessage])
    setChatHistory((prev) => [...prev, { role: 'user', parts: [{ text: userMessage.content }] }])


    try {
      const response = await fetch('http://localhost:3000/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ message: inputMessage, history: chatHistory })
      })

      const data = await response.text()

      //Ajouter le message de l'utilisateur
      const aiMessage: Message = {
        content: data,
        isUser: false,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, aiMessage])
      setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: aiMessage.content }] }])

    } catch (error) {
      console.log('error :::::', error)
    } finally {
      setIsLoading(false)
    }

  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
    return
  }

  return (
    <div className="container">
      <Chat messages={messages} />
      <Input
        inputMessage={inputMessage}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  )
}

export default ChatInterface