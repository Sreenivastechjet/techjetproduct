import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const leadsourceOptions = [
  { value: "Social media", label: "Social media" },
  { value: "Referral marketing", label: "Referral marketing" },
  { value: "Direct marketing", label: "Direct marketing" },
  { value: "Advertisement", label: "Advertisement" },
  { value: "Others", label: "Others" },
];
const TechOptions = [
  { value: "React", label: "React" },
  { value: "WordPress", label: "WordPress" },
  { value: "PHP", label: "PHP" },
  { value: "Java", label: "Java" },
  { value: "Others", label: "Others" },
];

function AddLeads() {
  const [user, setUser] = useState({
    leadname: "",
    businessdetails: "",
    leadsource: "",
    technology: "",
    businesscategory: "",
    zipcode: "",
    state: "",
    city: "",
    street: "",
    country: "",
    number: "",
    email: "",
    website: "",
    modeofcontact: "",
    contacteddate: "",
    description: "",
  });
  // console.log("first", user.contacteddate);
  const navigate = useNavigate();

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleselect = (selectedOption) => {
    setUser({ ...user, leadsource: selectedOption.label });
  };
  const handletechselect = (selectedOption) => {
    setUser({ ...user, technology: selectedOption.label });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // console.log("formdata", user);
    try {
      const response = await axios.post(
        `http://localhost:7000/api/v1/lead/createleads`,
        user
      );
      // console.log("response", response.data.msg);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/leads");
      setUser({});
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCancel = () => {
    setUser({
      leadname: "",
      businessdetails: "",
      leadsource: "",
      technology: "",
      businesscategory: "",
      zipcode: "",
      state: "",
      city: "",
      street: "",
      country: "",
      number: "",
      email: "",
      website: "",
      modeofcontact: "",
      contacteddate: "",
      description: "",
    });
  };
  return (
    <div className="main p-4">
      <form action="" onSubmit={handelSubmit}>
        <div className="d-flex justify-content-between p-3">
          <div>
            <h5>Create Lead</h5>
          </div>
          <div>
            <button
              className="btn btn-outline-primary me-3"
              type="cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </div>

        <div className="bgwhite">
          <div className="row mt-3 p-3">
            <div className="col-6">
              <div className="m-2">
                <h6 className="h3text">Lead Details</h6>
                <div className="card">
                  <div className="card-body">
                    <div className="form-group mt-2">
                      <label className="h4text">LEAD NAME</label>
                      <input
                        type="text"
                        name="leadname"
                        value={user.leadname}
                        onChange={handelChange}
                        className="form-control mt-2"
                        placeholder="Enter Lead Name"
                      />
                    </div>
                    <div className="form-group mt-3 pb-3">
                      <label className="h4text">LEAD SOURCE</label>
                      <Select
                        // name="leadsource"
                        value={user.leadsource.label}
                        onChange={handleselect}
                        options={leadsourceOptions}
                        className="reactselect"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-2 mt-4">
                <h6 className="h3text">Business Details</h6>
                <div className="card">
                  <div className="card-body">
                    <div className="form-group mt-2">
                      <label className="h4text">BUSINESS NAME</label>
                      <input
                        type="text"
                        name="businessdetails"
                        value={user.businessdetails}
                        onChange={handelChange}
                        className="form-control mt-2"
                        placeholder="Business name"
                      />
                    </div>
                    <div className="form-group mt-3 pb-3">
                      <label className="h4text">BUSINESS CATEGORY</label>
                      <input
                        type="text"
                        name="businesscategory"
                        value={user.businesscategory}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Business category"
                      />
                    </div>
                    <div className="form-group mt-3 pb-3">
                      <label className="h4text">TECHNOLOGY</label>
                      <Select
                        // name="leadsource"
                        value={user.technology.label}
                        onChange={handletechselect}
                        options={TechOptions}
                        className="reactselect"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-2 mt-4">
                <h6 className="h3text">Address Information</h6>
                <div className="card">
                  <div className="card-body">
                    <div className="form-group mt-2">
                      <label className="h4text">STREET</label>
                      <input
                        type="text"
                        name="street"
                        value={user.street}
                        onChange={handelChange}
                        className="form-control mt-2"
                        placeholder="Enter Street"
                      />
                    </div>
                    <div className="form-group mt-3 ">
                      <label className="h4text">CITY</label>
                      <input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Enter City"
                      />
                    </div>
                    <div className="form-group mt-3 ">
                      <label className="h4text">STATE</label>
                      <input
                        type="text"
                        name="state"
                        value={user.state}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Enter State"
                      />
                    </div>
                    <div className="form-group mt-3 pb-3">
                      <label className="h4text">COUNTRY</label>
                      <input
                        type="text"
                        name="country"
                        value={user.country}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Enter Country"
                      />
                    </div>
                    <div className="form-group mt-3 pb-3">
                      <label className="h4text">ZIPCODE</label>
                      <input
                        type="number"
                        name="zipcode"
                        value={user.zipcode}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Enter Zip code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="m-2">
                <h6 className="h3text">Contact Details</h6>
                <div className="card">
                  <div className="card-body">
                    <div className="form-group mt-2">
                      <label className="h4text">PHONE NUMBER</label>
                      <input
                        type="number"
                        name="number"
                        value={user.number}
                        onChange={handelChange}
                        className="form-control mt-2"
                        placeholder="Enter Phone No."
                      />
                    </div>
                    <div className="form-group mt-3 ">
                      <label className="h4text">EMAIL ID</label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Enter Email Id"
                      />
                    </div>
                    <div className="form-group mt-3 ">
                      <label className="h4text">WEBSITE</label>
                      <input
                        type="text"
                        name="website"
                        value={user.website}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Website Link (if any)"
                      />
                    </div>
                    <div className="form-group mt-3 ">
                      <label className="h4text">MODE OF CONTACT</label>
                      <input
                        type="text"
                        name="modeofcontact"
                        value={user.modeofcontact}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Enter Mode Of Contact"
                      />
                    </div>
                    <div className="form-group mt-3 pb-3">
                      <label className="h4text">CONTACTED DATE</label>
                      <input
                        type="date"
                        name="contacteddate"
                        value={user.contacteddate}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input"
                        placeholder="Enter Date Of Contact"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 m-2">
                <h6 className="h3text">Lead Details</h6>
                <div className="card">
                  <div className="card-body">
                    <div className="form-group mt-2 pb-3">
                      <label className="h4text">DESCRIPTION</label>
                      <input
                        type="text"
                        name="description"
                        value={user.description}
                        onChange={handelChange}
                        className="form-control mt-2 custom-input inputtext"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddLeads;
