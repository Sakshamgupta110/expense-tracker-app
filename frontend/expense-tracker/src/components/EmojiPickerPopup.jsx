import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { LuImage } from "react-icons/lu"


// test
const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emojiObject) => {
    onSelect(emojiObject.emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
        >
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <LuImage className="text-gray-400 text-xl" />
          )}
        </button>
        {icon ? (<span className="text-sm text-gray-600">change emoji</span>) : (<span className="text-sm text-gray-600">Select an emoji for your income source</span>)}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-10">
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            width={300}
            height={400}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup