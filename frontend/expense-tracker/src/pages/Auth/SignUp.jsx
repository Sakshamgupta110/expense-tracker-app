import React, { useContext, useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { Link } from 'react-router-dom'
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector'
import ApiPaths from '../../utils/ApiPaths'
import { UserContext } from "../../context/UserContext";
import axiosInstance from '../../utils/axiosInstance'
import uploadImage from '../../utils/uploadImage'

const SignUp = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl="";
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setError("");
    

    //api call
    
    
    try {


      if(profilePicture) {
        const imgUploadRes = await uploadImage(profilePicture);
        profileImageUrl = imgUploadRes || "";
      }
      const response = await axiosInstance.post(ApiPaths.AUTH.REGISTER, {
        fullName: name,
        email,
        password,
        profileImageUrl
      });
      const { token, user } = response.data.message;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong.please try again");
      }
    }
    
    

  }

  return (
    <Authlayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-200 via-white to-violet-100">
        <div className="max-w-xl w-full bg-white p-12 rounded-2xl shadow-2xl border border-purple-200 flex flex-col animate-fade-in">
      
          <h3 className="text-2xl font-bold text-black mb-2 text-center">Create an account</h3>
          <p className="text-sm text-slate-700 mb-6 text-center">
            Please enter your details to create an account
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ProfilePhotoSelector image={profilePicture} setImage={setProfilePicture} />   
             

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={name}
                onChange={({ target }) => setName(target.value)}
                label="Full Name"
                placeholder="Enter your name"
                type="text"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
            />
            {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
            <button
  disabled={!name || !email || !password || !confirmPassword}
  className={`bg-violet-500 text-white py-2 rounded font-semibold 
    hover:bg-purple-700 hover:scale-105 shadow-md transition-all
    ${(!name || !email || !password || !confirmPassword) ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  Create Account
</button>

            <p className="text-xs text-slate-700 mt-2 text-center">
              Already have an account? <Link className="text-medium text-violet-600 underline" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Authlayout>
  )
}

export default SignUp