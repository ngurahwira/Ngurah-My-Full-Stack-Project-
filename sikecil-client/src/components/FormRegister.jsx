import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../configs/config";
BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/register", {
        fullname,
        address,
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
    navigate("/");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" noValidate onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">FullName</span>
              </label>
              <input
                type="text" // Change 'type' to 'text' for full name and email fields
                placeholder="FullName"
                className="input input-bordered"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text" // Change 'type' to 'text' for the address field
                placeholder="Address"
                className="input input-bordered"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email" // Change 'type' to 'email' for the email field
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit">Register</button>{" "}
              {/* Add type attribute for the submit button */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
