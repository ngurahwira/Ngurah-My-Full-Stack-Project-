import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "../configs/config";
const G_CLIENT = import.meta.env.VITE_G_CLIENT;

const API = axios.create({
  baseURL: BASE_URL,
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      let { data } = await API.post("/auth/google", null, {
        headers: {
          g_token: response.credential,
        },
      });
      // console.log(data);
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: G_CLIENT,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            {/* form */}
            <form
              className="card-body"
              novalidate=""
              action=""
              onSubmit={handleLogin}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="name"
                  placeholder="Email"
                  className="input input-bordered"
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <Link to={"/register"}>
                    <p className="text-blue">Create Account?</p>
                  </Link>
                </div>
              </div>
              <div className="form-control mt-6">
                <button>Login</button>
              </div>

              <div id="buttonDiv"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
