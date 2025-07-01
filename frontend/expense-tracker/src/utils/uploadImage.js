import axiosInstance from './axiosInstance';
import ApiPaths, { BASE_URL } from './ApiPaths';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file); //append image file to form data 

  try {
    const response = await axiosInstance.post(
      BASE_URL + ApiPaths.IMAGE.UPLOADS_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    // The backend should return { imageUrl: '...' }
    return response.data.imageUrl;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
}


export default uploadImage;