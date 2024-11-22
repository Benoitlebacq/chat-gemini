import { InputProps } from "../models/Chat.models";

const Input: React.FC<InputProps> = ({ inputMessage, handleInputChange, handleKeyDown, handleSendMessage, isLoading }) => {
    return (
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
    )
}

export default Input