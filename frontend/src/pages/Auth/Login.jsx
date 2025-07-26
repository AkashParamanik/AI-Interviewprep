import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstane from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  //handle login form
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //login api call
    try {
      const response = await axiosInstane.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      // console.log(response.data.token);

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(`Something went wrong. Please try again ${error}`);
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black ">Welcome Back</h3>
      <p className=" text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to login
      </p>
      <form action="" onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="min. 8 Characters"
          type="password"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          Login
        </button>
        <p className="text-[13px] text-slate-800 mt-3 ">
          Don't have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer "
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
