import React from "react";
import { FaTrash } from "react-icons/fa";

const MessageCard = ({ msg, onDelete }) => {
  return (
    <div className="scale-90 bg-gradient-to-br from-blue-950/90 to-indigo-900/90 backdrop-blur-lg p-8 rounded-3xl text-white shadow-xl border border-white/10 transition-transform hover:scale-100 hover:shadow-2xl duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{msg.name}</h3>
          <span className="text-xs text-gray-300 block mt-1">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
        </div>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-400"
          title="Delete Message"
        >
          <FaTrash size={18} />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 mb-3">
        <span className="text-blue-200 text-sm flex items-center gap-2">
          <span className="font-medium">Email:</span>
          <span className="truncate max-w-[180px]"><a href={`mailto:${msg.email}`} className="font-bold">{msg.email}</a></span>
        </span>
        <span className="text-blue-200 text-sm flex items-center gap-2">
          <span className="font-medium">Phone:</span>
          <span><a href={`tel:${msg.phone}`} className="font-bold">{msg.phone}</a></span>
        </span>
      </div>
      <div className="bg-white/10 rounded-xl p-4 mt-2 shadow-inner">
        <p className="italic text-indigo-200 font-semibold">{msg.subject}</p>
        <p className="mt-2 leading-relaxed text-white/90">{msg.message}</p>
      </div>
    </div>
  );
};

export default MessageCard;
