import axios from "axios";
import React, { useState, useEffect } from "react";
import profile from "../images/profile.png";
import Avatar from "@mui/material/Avatar";
import {
  green,
  pink,
  deepOrange,
  yellow,
  deepPurple,
} from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";

function LeadBoardview() {
  const [leads, setLeads] = useState([]);
  const getLeads = async () => {
    const res = await axios
      .post(`http://localhost:7000/api/v1/lead/getEveryLeads`)
      .then((res) => {
        console.log("response", res);
        setLeads(res.data.leads);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLeads();
  }, []);
  // const option = [Converted tO Deal, Lost Lead, Sent SOW, Pending, Contact in Future, Not Contacted, Attempted to Contact]
  // const leadStage = ["Deal Won", "Negotiation", "Proposition", "Loss", "Qualified", "New Lead"];
  const newlead = leads.filter((item) => item.leadstage === "New Lead");
  const negotiation = leads.filter((item) => item.leadstage === "Negotiation");
  const proposition = leads.filter((item) => item.leadstage === "Proposition");
  const qualified = leads.filter((item) => item.leadstage === "Qualified");
  const loss = leads.filter((item) => item.leadstage === "Loss");
  const dealwon = leads.filter((item) => item.leadstage === "Deal Won");
  console.log("formData", newlead);

  return (
    <div className="">
      <div className="p-4">
        <div className="scrollable-row" style={{ height: "100%" }}>
          <div className="col-3 p-2">
            <div className="mb-3">
              New Leads{" "}
              <span className="badge bg-secondary">{newlead.length || 0}</span>
            </div>
            <div>
              {newlead.map((item, index) => {
                return (
                  <>
                    <div
                      class="card mb-3"
                      style={{ width: "100%" }}
                      key={{ index }}
                    >
                      <div class="card-body d-flex">
                        <div className="col-5">
                          <Avatar
                            alt={item.leadname.charAt(0)}
                            src={item?.leadname ? item.leadname : profile}
                            className="border border-primary"
                            sx={{
                              bgcolor: yellow[200],
                              color: deepPurple[600],
                            }}
                          />

                          <p class="card-text text-wrap pt-2">
                            <NavLink
                              to={`/leaddetails/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.leadname}
                            </NavLink>
                          </p>
                        </div>
                        <div className="col-7 text-center">
                          <p
                            className={` border rounded-1 status ${
                              item.status === "Converted to Deal"
                                ? "bg-success"
                                : item.status === "Lost Lead"
                                ? "bg-danger"
                                : item.status === "Sent SOW"
                                ? "bg-light"
                                : item.status === "Pending"
                                ? "bg-warning"
                                : item.status === "Contact in Future"
                                ? "bg-warning"
                                : item.status === "Attempted to Contact"
                                ? "bg-primary"
                                : "bg-light"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-2">
                            <MdOutlineMailOutline />
                          </div>
                          <div className="col-10">{item.email}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <PiPhoneCall />
                          </div>
                          <div className="col-10">{item.number}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col-3 p-2">
            <div className="mb-3">
              Qualified{" "}
              <span className="badge bg-secondary">
                {qualified.length || 0}
              </span>
            </div>
            <div>
              {qualified.map((item, index) => {
                return (
                  <>
                    <div
                      class="card mb-3"
                      style={{ width: "100%" }}
                      key={{ index }}
                    >
                      <div class="card-body d-flex ">
                        <div className="col-5">
                          <Avatar
                            alt={item.leadname.charAt(0)}
                            src={item?.leadname ? item.leadname : profile}
                            className="border border-primary"
                          />

                          <p class="card-text text-wrap pt-2">
                            <NavLink
                              to={`/leaddetails/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.leadname}
                            </NavLink>
                          </p>
                        </div>
                        <div className="col-7 text-center">
                          {" "}
                          <p
                            className={` border rounded-1 status ${
                              item.status === "Converted to Deal"
                                ? "bg-success"
                                : item.status === "Lost Lead"
                                ? "bg-danger"
                                : item.status === "Sent SOW"
                                ? "bg-light"
                                : item.status === "Pending"
                                ? "bg-warning"
                                : item.status === "Contact in Future"
                                ? "bg-warning"
                                : item.status === "Attempted to Contact"
                                ? "bg-primary"
                                : "bg-light"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-2">
                            <MdOutlineMailOutline />
                          </div>
                          <div className="col-10">{item.email}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <PiPhoneCall />
                          </div>
                          <div className="col-10">{item.number}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="col-3 p-2">
            <div className="mb-3">
              Proposition{" "}
              <span className="badge bg-secondary">
                {proposition.length || 0}
              </span>
            </div>
            <div>
              {proposition.map((item, index) => {
                return (
                  <>
                    <div
                      class="card mb-3"
                      style={{ width: "100%" }}
                      key={{ index }}
                    >
                      <div class="card-body d-flex">
                        <div className="col-5">
                          <Avatar
                            alt={item.leadname.charAt(0)}
                            src={
                              item?.leadnameleadname
                                ? item.leadnameleadname
                                : profile
                            }
                            sx={{ bgcolor: deepOrange[500] }}
                            className="border border-primary"
                          />

                          <p class="card-text text-wrap pt-2">
                            <NavLink
                              to={`/leaddetails/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.leadname}
                            </NavLink>
                          </p>
                        </div>
                        <div className="col-7 text-center">
                          {" "}
                          <p
                            className={` border rounded-1 status ${
                              item.status === "Converted To Deal"
                                ? "bg-success"
                                : item.status === "Lost Lead"
                                ? "bg-danger"
                                : item.status === "Sent SOW"
                                ? "bg-light"
                                : item.status === "Pending"
                                ? "bg-warning"
                                : item.status === "Contact in Future"
                                ? "bg-warning"
                                : item.status === "Attempted to Contact"
                                ? "bg-primary"
                                : "bg-light"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-2">
                            <MdOutlineMailOutline />
                          </div>
                          <div className="col-10">{item.email}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <PiPhoneCall />
                          </div>
                          <div className="col-10">{item.number}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col-3 p-2">
            <div className="mb-3">
              Negotiation{" "}
              <span className="badge bg-secondary">
                {negotiation.length || 0}
              </span>
            </div>
            <div>
              {negotiation.map((item, index) => {
                return (
                  <>
                    <div
                      class="card mb-3"
                      style={{ width: "100%" }}
                      key={{ index }}
                    >
                      <div class="card-body d-flex">
                        <div className="col-5">
                          <Avatar
                            alt={item.leadname.charAt(0)}
                            src={item?.leadname ? item.leadname : profile}
                            leadname
                            className="border border-primary"
                          />

                          <p class="card-text text-wrap pt-2">
                            <NavLink
                              to={`/leaddetails/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.leadname}
                            </NavLink>
                          </p>
                        </div>
                        <div className="col-7 text-center">
                          {" "}
                          <p
                            className={` border rounded-1 status ${
                              item.status === "Converted to Deal"
                                ? "bg-success"
                                : item.status === "Lost Lead"
                                ? "bg-danger"
                                : item.status === "Sent SOW"
                                ? "bg-light"
                                : item.status === "Pending"
                                ? "bg-warning"
                                : item.status === "Contact in Future"
                                ? "bg-warning"
                                : item.status === "Attempted to Contact"
                                ? "bg-primary"
                                : "bg-light"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-2">
                            <MdOutlineMailOutline />
                          </div>
                          <div className="col-10">{item.email}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <PiPhoneCall />
                          </div>
                          <div className="col-10">{item.number}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col-3 p-2">
            <div className="mb-3">
              Lost{" "}
              <span className="badge bg-secondary">{loss.length || 0}</span>
            </div>
            <div>
              {loss.map((item, index) => {
                return (
                  <>
                    <div
                      class="card mb-3"
                      style={{ width: "100%" }}
                      key={{ index }}
                    >
                      <div class="card-body d-flex">
                        <div className="col-5">
                          <Avatar
                            alt={item.leadname.charAt(0)}
                            src={item?.leadname ? item.leadname : profile}
                            className="border border-primary"
                            sx={{ bgcolor: pink[500] }}
                          />

                          <p class="card-text text-wrap pt-2">
                            <NavLink
                              to={`/leaddetails/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.leadname}
                            </NavLink>
                          </p>
                        </div>
                        <div className="col-7 text-center">
                          {" "}
                          <p
                            className={` border rounded-1 status ${
                              item.status === "Converted To Deal"
                                ? "bg-success"
                                : item.status === "Lost Lead"
                                ? "bg-danger"
                                : item.status === "Sent SOW"
                                ? "bg-light"
                                : item.status === "Pending"
                                ? "bg-warning"
                                : item.status === "Contact in Future"
                                ? "bg-warning"
                                : item.status === "Attempted to Contact"
                                ? "bg-primary"
                                : "bg-light"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-2">
                            <MdOutlineMailOutline />
                          </div>
                          <div className="col-10">{item.email}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <PiPhoneCall />
                          </div>
                          <div className="col-10">{item.number}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="col-3 p-2">
            <div className="mb-3">
              Deal Won{" "}
              <span className="badge bg-secondary">{dealwon.length || 0}</span>
            </div>
            <div>
              {dealwon.map((item, index) => {
                return (
                  <>
                    <div
                      class="card mb-3"
                      style={{ width: "100%" }}
                      key={{ index }}
                    >
                      <div class="card-body d-flex">
                        <div className="col-5">
                          <Avatar
                            alt={item.leadname.charAt(0)}
                            src={item?.leadname ? item.leadname : profile}
                            className="border border-primary"
                            sx={{ bgcolor: green[500] }}
                          />

                          <p class="card-text text-wrap pt-2">
                            <NavLink
                              to={`/leaddetails/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item.leadname}
                            </NavLink>
                          </p>
                        </div>
                        <div className="col-6 text-center">
                          {" "}
                          <p
                            className={` border rounded-1 status ${
                              item.status === "Converted to Deal"
                                ? "bg-success"
                                : item.status === "Lost Lead"
                                ? "bg-danger"
                                : item.status === "Sent SOW"
                                ? "bg-light"
                                : item.status === "Pending"
                                ? "bg-warning"
                                : item.status === "Contact in Future"
                                ? "bg-warning"
                                : item.status === "Attempted to Contact"
                                ? "bg-primary"
                                : "bg-light"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-2">
                            <MdOutlineMailOutline />
                          </div>
                          <div className="col-10">{item.email}</div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <PiPhoneCall />
                          </div>
                          <div className="col-10">{item.number}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadBoardview;
