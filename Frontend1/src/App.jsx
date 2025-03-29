import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import { useEffect, useState, useRef } from "react";
import ChatMessage from "./components/ChatMessage";
import { companyInfo } from "./companyInfo";
import "dotenv/config"

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: "Hey there! How can I help you today?",
    },
    {
      role: "model",
      text: companyInfo,
      hideInChat: true // Hidden from UI but available in context
    }
  ]);
  
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef();

  const updateHistory = (text, isError = false) => {
    setChatHistory(prev => [
      ...prev.filter(msg => msg.text !== "Thinking..."),
      { role: "model", text, isError }
    ]);
    setIsLoading(false);
  };

  const generateBotResponse = async (history) => {
    setIsLoading(true);
    const formattedHistory = history
      .filter(chat => !chat.hideInChat)
      .map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(process.env.VITE_API_URL, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || 
          `API request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      
      const apiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                           data.candidates?.[0]?.contents?.parts?.[0]?.text || 
                           "I couldn't generate a response. Please try again.";
      
      updateHistory(apiResponseText.replace(/\*\*(.*?)\*\*/g, "$1").trim());
    } catch (error) {
      console.error("API Error:", error);
      updateHistory(
        `Sorry, I encountered an error: ${error.message}`,
        true
      );
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? 'show-chatbot' : ""}`}>
      <button 
        onClick={() => setShowChatbot(prev => !prev)} 
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button 
            onClick={() => setShowChatbot(prev => !prev)} 
            className="material-symbols-rounded"
          >
            keyboard_arrow_down
          </button>
        </div>
        
        <div ref={chatBodyRef} className="chat-body">
          {chatHistory
            .filter(chat => !chat.hideInChat)
            .map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          
          {isLoading && (
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">Thinking...</p>
            </div>
          )}
        </div>
        
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;