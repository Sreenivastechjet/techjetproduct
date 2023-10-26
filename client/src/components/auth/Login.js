import React, { useState } from "react";
import "../../App.css";
import { loginUser } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { MdOutlineVpnKey } from "react-icons/md";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    let jsonCredentials = { email, password };

    if (email && password) {
      dispatch(loginUser(jsonCredentials)).then((res) => {
        if (res.payload) {
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          window.location.reload();
        }
      });
    }
  };
  return (
    <>
      <div className="row">
        <div
          className="col-6 text-center bgblue d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div className="text-light">
            <h2>Hello!</h2>
            <h6>
              Enter your details & start your <br /> journey with us
            </h6>
            <NavLink to="/register">
              <button className="btn btn-primary">Sign Up</button>
            </NavLink>
          </div>
        </div>
        <div
          className="col-6 d-flex align-items-center justify-content-center shadow"
          style={{ height: "100vh" }}
        >
          <div className="col-8 border p-5 shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="text-center">Login To Techjet.ai</h3>

            <form onSubmit={handelSubmit}>
              <div class="mb-3 mt-5 input-group flex-nowrap">
                {/* <label>Email address</label> */}
                <span class="input-group-text" id="addon-wrapping">
                  <FiMail />
                </span>
                <input
                  type="email"
                  className="form-control input-from"
                  placeholder="Enter email id"
                  aria-describedby="addon-wrapping"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-3 input-group flex-nowrap">
                {/* <label >Password</label> */}
                <span class="input-group-text" id="pass">
                  <MdOutlineVpnKey />
                </span>
                <input
                  type="password"
                  className="form-control input-from"
                  placeholder="Enter password"
                  aria-describedby="pass"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary ">
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
