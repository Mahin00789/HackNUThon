/** @format */

import { useRef } from "react";

const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  isLoading,
}) => {
  const inputRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage || isLoading) return;
    inputRef.current.value = "";

    // Add user message immediately
    const newHistoryWithUserMsg = [
      ...chatHistory,
      { role: "user", text: userMessage },
    ];
    setChatHistory(newHistoryWithUserMsg);

    // Generate response with the latest history including user message
    generateBotResponse(newHistoryWithUserMsg);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        className="material-symbols-rounded"
        disabled={isLoading}
      >
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
