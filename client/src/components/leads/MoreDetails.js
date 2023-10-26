import React, { useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";

function MoreDetails(props) {
  const {
    leadsource,
    businesscategory,
    businessdetails,
    country,
    description,
    leadname,
    city,
    state,
    email,
    street,
    website,
    number,
    zipcode,
    _id,
    contacteddate,
  } = props.lead;
  // console.log("lead", props);
  const [edit, setEdit] = useState(false);

  const [editedData, setEditedData] = useState({
    leadsource,
    businesscategory,
    businessdetails,
    country,
    description,
    leadname,
    city,
    state,
    email,
    street,
    website,
    number,
    zipcode,
    contacteddate,
  });
  const handleCancelClick = () => {
    setEditedData({
      leadsource,
      businesscategory,
      businessdetails,
      country,
      description,
      leadname,
      city,
      state,
      email,
      street,
      website,
      number,
      zipcode,
      contacteddate,
    });
    setEdit(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const updatedLeadData = { ...editedData };

      const res = await axios.put(
        `http://localhost:7000/api/v1/lead/updateLead/${_id}`,
        updatedLeadData
      );
      if (res) {
        setEdit(false);
      }
    } catch (error) {
      console.log("Error updating data", error);
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end col-8 mb-3">
        {edit ? (
          <div>
            <button className="btn btn-warning m-1" onClick={handleCancelClick}>
              Cancel
            </button>
            <button className="btn btn-success m-1" onClick={handleUpdate}>
              Update
            </button>
          </div>
        ) : (
          <button className="btn btn-primary m-1" onClick={() => setEdit(true)}>
            <FiEdit />
          </button>
        )}
      </div>
      <h5 className="p-1">Lead Details</h5>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="businessdetails"
              value={editedData.businessdetails}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.businessdetails}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Lead Source</label>
        <div class="col-sm-6">
          <input type="text" readonly class="form-control" value={leadsource} />
        </div>
      </div>

      <h5 className="p-1">Business Details</h5>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Business Name</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="leadname"
              value={editedData.leadname}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.leadname}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="businessdetails"
              value={editedData.businessdetails}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.businessdetails}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Technology</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="businessdetails"
              value={editedData.businessdetails}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.businessdetails}
            />
          )}
        </div>
      </div>

      <h5 className="p-1">Contact Details</h5>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Company</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="businesscategory"
              value={editedData.businesscategory}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.businesscategory}
            />
          )}
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="email"
              className="form-control"
              name="email"
              value={editedData.email}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.email}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Phone</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="number"
              className="form-control"
              name="number"
              value={editedData.number}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.number}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Contacted date</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="date"
              className="form-control"
              name="contacteddate"
              value={editedData.contacteddate}
              onChange={handleInputChange}
              onWheel={(event) => event.currentTarget.blur()}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.contacteddate}
            />
          )}
        </div>
      </div>

      <h5 className="p-1">Address Information</h5>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Street</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="street"
              value={editedData.street}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.street}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">City</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="city"
              value={editedData.city}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.city}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">State</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="state"
              value={editedData.state}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.state}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Zipcode</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="number"
              className="form-control"
              name="zipcode"
              value={editedData.zipcode}
              onChange={handleInputChange}
              onWheel={(event) => event.currentTarget.blur()}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.zipcode}
            />
          )}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Country</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="country"
              value={editedData.country}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.country}
            />
          )}
        </div>
      </div>
      <h6>Description</h6>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-6">
          {edit ? (
            <input
              type="text"
              className="form-control"
              name="description"
              value={editedData.description}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              readOnly
              className="form-control"
              value={editedData.description}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default MoreDetails;
