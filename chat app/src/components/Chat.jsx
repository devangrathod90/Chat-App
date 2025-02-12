import React, { useEffect, useState, useRef } from "react";
import { user } from "../components/join";
import socketIo from "socket.io-client";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import logo from '../assets/chat.png';

const EndPoint = "http://localhost:4500/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();

  const send = () => {
    if (message.trim()) {
      socketRef.current.emit("message", { message, id });
      setMessage("");
    }
  };

  useEffect(() => {
    socketRef.current = socketIo(EndPoint, { transports: ["websocket"] });

    socketRef.current.on("connect", () => {
      setId(socketRef.current.id);
    });

    socketRef.current.emit('joined', { user });

    socketRef.current.on('welcome', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socketRef.current.on('userJoined', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socketRef.current.on("leave", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socketRef.current.on('sendMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[#141E27]">
      <div className="bg-white md:h-[60%] md:w-[50%]  w-[100%] h-[100%]">
        <div className="md:h-[15%] h-[10%] bg-blue-900 flex justify-between pl-3 pr-5">
          <div className="flex items-center">
            <img className="h-20 w-22 p-3" src={logo} alt="Chat App Logo" />
            <p className="text-2xl text-white">Chat App</p>
          </div>
          <a className="flex items-center" href="/">
            <button className="text-white text-4xl transition-all delay-150 duration-200 hover:scale-140 cursor-pointer">⤬</button>
          </a>
        </div>
        <ReactScrollToBottom className="md:h-[70%] h-[80%] p-4 ">
          {messages.map((item, index) => (
            <Message className="inline-block " key={index} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'float-right' : 'float-left'} />
          ))}
        </ReactScrollToBottom>
        <div className="md:h-[15%] h-[10%] border-t-1 flex">
          <input
            type="text"
            onKeyDown={(e)=>e.key === 'Enter'? send() :null}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-[80%] border-0 outline-0 text-lg p-5"
            id="chatInput"
          />
          <button
            onClick={message.trim() ? send : null}
            className="bg-blue-900 w-[20%] hover:bg-blue-900 text-white transition-all delay-200 cursor-pointer text-4xl overflow-hidden"
          >
            <div className="transition-all delay-300 hover:translate-x-2">➤</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
