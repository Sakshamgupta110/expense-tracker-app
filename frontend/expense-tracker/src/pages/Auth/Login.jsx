import React, { useContext, useState } from "react";
import Authlayout from "../../components/layouts/Authlayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ApiPaths from "../../utils/ApiPaths";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    //login api call

    try {
     
      const response = await axiosInstance.post(ApiPaths.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data.message;
      if (token) {
        updateUser(user);
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong.please try again");
      }
    }
  };

  return (
    <Authlayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-200 via-white to-violet-100">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-purple-200 flex flex-col animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 mb-6 text-center">
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
            {error && (
              <div className="text-red-500 text-sm mb-2 text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="bg-violet-500 text-white py-2 rounded hover:bg-purple-700 hover:scale-105 shadow-md transition-all font-semibold"
              disabled={!email || !password}
            >
              Log In
            </button>
            <p className="text-xs text-slate-700 mt-2 text-center">
              Don't have an account?{" "}
              <Link
                className="text-medium text-violet-600 underline"
                to="/signup"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Authlayout>
  );
};

export default Login;
