import React from "react";

const Message = ({ user, message, classs }) => {
  return (
    <div
      className={`flex ${
        classs === "float-right" ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`${
          classs === "float-right" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        } max-w-[85%] break-words p-3 rounded-xl shadow-md`}
        style={{ wordWrap: "break-word" }}
      >
        {user && <span className="font-bold block">{user}:</span>}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
