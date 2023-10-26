import React, { useState } from "react";
import "../../App.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setCompany] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    let user = { email, password, name, number };

    try {
      const response = await axios.post(
        `http://localhost:7000/api/v1/auth/register`,
        user
      );
      // console.log("response", response.data.msg)
      if (response) {
        setEmail("");
        setPassword("");
        navigate("/login");
        window.location.reload();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="row">
        <div
          className="col-6 d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div className="col-8 border p-5 shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="text-center">Create Account</h3>
            <form onSubmit={handelSubmit}>
              <div class="mb-3 mt-5">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter company name"
                  required
                  value={name}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div class="mb-3 ">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email id"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label>Number</label>
                <input
                  type="number"
                  className="form-control mt-1"
                  placeholder="Enter number"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {"Sign Up"}
              </button>
              {/* {error && (<div className='alert alert-danger mt-3'>{error}</div>)} */}
            </form>
          </div>
        </div>
        <div
          className="col-6 text-center bgblue d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div className="text-light">
            <h2>Welcome!</h2>
            <p>
              To keep contacted with us please
              <br /> Login with your info
            </p>
            <NavLink to="/login">
              <button className="btn btn-primary">Sign In</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
