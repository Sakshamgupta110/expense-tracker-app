import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  const handleImageRemove = (e) => {
    setImage(null);
    setPreviewURL(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className='flex flex-col items-center'>
          <span className="w-20 h-20 flex items-center justify-center rounded-full bg-violet-500 text-white text-5xl mb-2">
            <LuUser />
          </span>
          <button
            type="button"
            className="text-violet-600"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="flex flex-col  rounded-2xl items-center">
          <img
            src={previewURL}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
          <button
            type="button"
            className="text-red-500"
            onClick={handleImageRemove}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
