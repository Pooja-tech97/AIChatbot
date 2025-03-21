import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BarLoader } from "react-spinners";
import Header from "./Header";
import { addQuestion, addAnswer, setLoading } from "../features/chatbotSlice";
import "./Chatbot.css";

const Chatbot = () => {
  const [inputData, setInputData] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatbot.messages);

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";
  const API_KEY = "AIzaSyDV-Ya9BB0gfqgCdvdtN4W2FZSyXGcAf8U";

  const sendingData = {
    contents: [
      {
        parts: [{ text: "" }],
      },
    ],
  };

  const getData = async () => {
    if (!inputData.trim()) return;

    const questionTime = new Date().toLocaleTimeString();

    // Dispatch- addQuestion action to store
    dispatch(
      addQuestion({
        text: inputData,
        time: questionTime,
      })
    );

    //-----------setloading to true

    sendingData.contents[0].parts[0].text = inputData;

    try {
      const res = await axios.post(`${url}${API_KEY}`, sendingData);
      // console.log("Res", res);

      const answerTime = new Date().toLocaleTimeString();

      // Dispatch- addAnswer action to the store
      dispatch(
        addAnswer({
          text: res.data.candidates[0].content.parts[0].text,
          time: answerTime,
        })
      );
    } catch (error) {
      const errorTime = new Date().toLocaleTimeString();

      // Dispatch error message
      dispatch(
        addAnswer({
          text: "Sorry, unable to load. Please try again.",
          time: errorTime,
        })
      );
    } //---------after I got the response set loading (false)

    setInputData("");
  };

  const handleInput = (event) => {
    setInputData(event.target.value);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleDislike = (index) => {
    alert(`You disliked the response at index ${index}`);
  };

  return (
    <div className="container">
      <Header />
      <div className="data-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.type === "question" ? "message-container" : "message-answer"
            }`}
          >
            <p>
              <strong>{msg.type === "question" ? "User:" : "AI:"}</strong>{" "}
              {msg.text}
              <span className="timestamp"> ({msg.time})</span>
            </p>
            {msg.type === "answer" && (
              <div className="hover-options">
                <button onClick={() => handleCopy(msg.text)}>📋</button>

                <button onClick={() => handleDislike(index)}>👎</button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="loader">
            <BarLoader loading={loading} />
          </div>
        )}
        <div className="input-container">
          <input
            type="text"
            placeholder="Converse with Nester..."
            onChange={handleInput}
            value={inputData}
          />
          <button onClick={getData}>Send &#x2192;</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
