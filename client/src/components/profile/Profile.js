import React, { useState, useEffect } from "react";
import dummypic from "../images/profile.png";
import axios from "axios";
import { upperFirst } from "../utils/common";

function Profile() {
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [passwordData, setPasswordData] = useState({});
  const [error, setError] = useState("");
  const id = userData?.image?._id


  console.log("first",userData?.image?._id)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjM5YmJlMmZkMTZhMzM3NmE3YzA1YyIsImlhdCI6MTY5ODA2NDYzOSwiZXhwIjoxNjk4MTUxMDM5fQ.7_15N6afWQN8o8sj4ndFrczeaURGRHLjP-bxf7AxdOE"
  const getDetails = () => {
    axios
      .get("http://localhost:7000/api/v1/auth/userinfo",{
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("res", response);
        setUserData(response.data.user)
        
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);


  const updateProfileImage = () => {
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    axios
      .put("/api/update-profile-image", formData)
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log("Profile image updated successfully");
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error updating profile image: ", error);
      });
  };

  const updatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    } else {
      await axios
        .put("http://localhost:7000/api/v1/auth/resetPassword", passwordData)
        .then((response) => {
          console.log("Password updated successfully");
        })
        .catch((error) => {
          console.error("Error updating password: ", error);
        });
    }
  };
  return (
    <div className="main">
      <div className="container p-5">
        <div className="bgwhite rounded">
          <h4 className="p-3">Profile Setting</h4>

          <div className="p-5">
            {/* <div className="col-8">
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary m-2" onClick={updateProfile}>
                  Update Details
                </button>
              </div>
            </div> */}

            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">User Name</label>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Please enter name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Email</label>
              <div class="col-md-6">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Please enter email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Number</label>
              <div class="col-md-6">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Please enter number"
                  value={userData.number}
                  onChange={(e) =>
                    setUserData({ ...userData, number: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Job Title</label>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Please enter title"
                  value={userData.title}
                  onChange={(e) =>
                    setUserData({ ...userData, title: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Profile pic</label>
              <div class="col-md-6 d-flex justify-content-between">
                <img
                  src={(userData?.image?.url) ? (userData?.image?.url) : (dummypic)}
                  alt={upperFirst(userData?.name)}
                  width="100"
                  height="100"
                  className="border border-primary-subtle rounded-circle"
                />
                <div className="">
                  <button
                    className="btn btn-primary"
                    onClick={updateProfileImage}
                  >
                    Update Picture
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 mt-3 rounded bgwhite">
          <h4 className="p-3">Change Password</h4>

          <div className="p-5">
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">Existing Password</label>
              <div class="col-md-6">
                <input
                  type="password"
                  class="form-control"
                  placeholder="******"
                  value={passwordData.existingPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      existingPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">New Password</label>
              <div class="col-md-6">
                <input
                  type="password"
                  class="form-control"
                  placeholder="******"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-2 col-form-label">
                Confirm New Password
              </label>
              <div class="col-md-6">
                <input
                  type="password"
                  class="form-control"
                  placeholder="******"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div>{error && <p className="text-danger">{error}</p>}</div>
              </div>
            </div>

            <div className="col-8">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary m-2"
                  onClick={updatePassword}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
