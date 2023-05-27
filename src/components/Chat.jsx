import React, { useState } from "react";
import annyang from "annyang";
// eslint-disable-next-line no-unused-vars
import Persona from "./Model";
import Button from "./Button";
import "./CSS/Chat.css";

//use chat with server and serverOpenai instead to make the model use the openai api , make sure to have an api key
function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTalk = (e) => {
    e.preventDefault();
    handleSpeechRecognition();
    // setInputText("Test");
    // handleSendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSpeechRecognition = () => {
    if (annyang) {
      annyang.start({ autoRestart: false });
      annyang.addCallback("result", (phrases) => {
        console.log("You said:", phrases[0]);
        setInputText(phrases[0]);
      });
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: inputText,
        sender: "user",
      };
      console.log(inputText);
      setMessages([...messages, newMessage]);
      setInputText("");
      const generatedText =
        "Hello world! I am an experiment created by Ali to explore the customization of bots and their voices. I was built using the OpenAI API."; // Updated property name to "botResponse"
      const botMessage = {
        id: Date.now(),
        text: generatedText,
        sender: "bot",
      };

      window.responsiveVoice.speak(botMessage.text, "UK English Female");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`chat-widget ${isCollapsed ? "collapsed" : ""}`}>
      {!isCollapsed && (
        <div className="chat-widget__content">
          <div className="chat-widget__messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "message--user" : "message--bot"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-widget__input">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
            <Button label="Talk" onClick={handleTalk} />
          </div>
        </div>
      )}
      <div className="chat-widget__toggle" onClick={handleToggleCollapse}>
        {isCollapsed ? "Expand" : "Collapse"}
      </div>
    </div>
  );
}

export default ChatWidget;
