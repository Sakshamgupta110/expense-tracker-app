import React from 'react'

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div>
      <p className='text-sm'>{content}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
        type='button'
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type='button'
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert