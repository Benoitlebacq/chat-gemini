import "./chatInterface.scss";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { Content, Messsage } from "../models/Chat.models";

const ChatInterface: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Messsage[]>([]);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    //Ajouter le message de l'utilisateur
    const userMessage: Messsage = {
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
      const aiMessage: Messsage = {
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
      <div className="chat">
        {messages.map((message, index) => (
          <div className={message.isUser ? "userMessage" : "AIMessage"} key={index}>
            {message.content}
            <div ref={messageEndRef} />
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          name="inputMessage"
          className="input__message"
          placeholder="Entrez votre message"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDownCapture={handleKeyDown}
        />
        <button
          className="input__button"
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}

export default ChatInterface