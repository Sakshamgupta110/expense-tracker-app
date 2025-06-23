import React, { useState } from "react";
import Authlayout from "../../components/layouts/Authlayout";
import { useNavigate } from "react-router-dom"; 
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

const Login = () => {

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 
const isValidPassword = (password) => {
  return password.length >= 8;
}




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!isValidEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!isValidPassword(password)){
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    
    //login api call
  };

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="yourname@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="********"
            type="password"
          />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="bg-violet-500 text-white py-2 rounded mt-2 hover:bg-purple-700 transition"
            disabled={!email || !password}
          >
            Log In
          </button>
          <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
            Don't have an account? <Link className="text-medium text-violet-600 underline" to="/signup">Sign up</Link>
          </p>
        </form>

      </div>
    </Authlayout>
  );
};

export default Login;
