import React, { useEffect, useState } from "react";
import MoreDetails from "./MoreDetails";
import { BsChevronUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Table from "react-bootstrap/Table";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Input } from "antd";
import { TbCurrencyRupee } from "react-icons/tb";
import "../../index.css";
import Select from "react-select";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Paper } from "@mui/material";
import moment from "moment";
import {
  Link as ScrollLink,
  Element,
  Events,
  animateScroll as scroll,
} from "react-scroll";

const ITEM_HEIGHT = 48;

function DealDetails() {
  const params = useParams();
  const Navigate = useNavigate();
  const [openD, setOpenD] = useState(false);
  const [deal, setDeal] = useState([]);

  // console.log("deal>>>", deal);

  const [selectedFile, setSelectedFiles] = useState([]);
  const [businessname, setBusinessname] = useState("");

  const [selectedlead, setSelectedlead] = useState(null);
  const [selectedleadval, setSelectedleadval] = useState(null);
  const [assignTo, setAssignTo] = useState(null);
  const [followUp, setFollowUp] = useState(null);
  const [dropopen, setdropopen] = useState(false);
  const [selectedassign, setSelectedassign] = useState(null);
  const [selectedfallow, setSelectedfallow] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [note, setNote] = useState("");
  const [resnotes, setResnotes] = useState("");
  const [status, setStatus] = useState("");
  const [assaignstatus, setAssaignstatus] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState("allInformation");

  const menuopen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    // console.log("Menu clicked");
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewFile = (file) => {
    // Construct the URL for the file you want to view
    const fileURL = `http://localhost:7000/api/v1/lead/viewFile/${params.id}/${file}`;

    window.open(fileURL, "_blank");
  };
  const downloadFile = async (file) => {
    // Replace with the correct API endpoint
    const downloadUrl = `http://localhost:7000/api/v1/lead/downloadFile/${file}`;

    axios({
      url: downloadUrl,
      method: "GET",
      responseType: "blob", // Treat the response as a binary blob
    })
      .then((response) => {
        // Create a Blob URL for the file content
        const blob = new Blob([response.data]);
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a hidden anchor link to trigger the download
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = blobUrl;
        a.download = "file_1697195032108.jpg";
        document.body.appendChild(a);

        // Trigger the download
        a.click();

        // Clean up the anchor element and URL
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.log("Error downloading file:", error);
      });
  };

  const getDetails = async (id) => {
    let res = await axios
      .get(`http://localhost:7000/api/v1/deal/getsingledeal/${id}`)
      .then((res) => {
        if (res) {
          // console.log("dealsdetails", res?.data);
          setDeal(res?.data?.deal);
        }
      });
  };

  const handelnotes = async () => {
    if (note) {
      try {
        const res = await axios.patch(
          `http://localhost:7000/api/v1/deal/updateLeadnotes/${params.id}`,
          { newnote: note }
        );
        if (res) {
          getDetails(params.id);
          setNote("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImgChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSelectedImg(selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        await axios.patch(
          `http://localhost:7000/api/v1/deal/updateLeadfile/${params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        getDetails(params.id);
        setSelectedImg("");

        // File uploaded successfully, handle any UI updates or feedback
      } catch (error) {
        // console.log("File upload error", error);
        // Handle error and provide user feedback
      }
    }
  };

  useEffect(() => {
    getDetails(params.id);
  }, []);

  const back = () => {
    Navigate(`/deals`);
  };

  const handleclick = () => {
    setOpenD(!openD);
  };

  //   const handelDelete = async (index) => {
  //     if (index) {
  //       try {
  //         const res = await axios.delete(
  //           `http://localhost:7000/api/v1/lead/updateLead/${params.id}/${index}`
  //         );
  //         getDetails(params.id);
  //         console.log(res);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  return (
    <div className="main">
      <div className="p-3">
        <div className="pt-3 pb-3 m-3 d-flex justify-content-between">
          <button className="ps-3 btn btn-outline-secondary" onClick={back}>
            {" "}
            <MdKeyboardBackspace /> Deal Information
          </button>
          {/* <div className="d-flex">
            <button className="btn btn-outline-primary me-2">
              Assign Project Manager
            </button>
          </div> */}
        </div>
        <div className="row m-2 justify-content-between">
          <div className="col-3 g-3">
            <div className="p-3 bgwhite">
              <div className="d-flex flex-column">
                <ScrollLink
                  to="allInformation"
                  smooth={true}
                  className={`btn btn-primary m-1 ${
                    activeTab === "allInformation" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("allInformation")}
                >
                  All Information
                </ScrollLink>
                <ScrollLink
                  to="notes"
                  smooth={true}
                  className={`btn btn-primary m-1 ${
                    activeTab === "notes" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("notes")}
                >
                  Notes
                </ScrollLink>
                <ScrollLink
                  to="attachments"
                  smooth={true}
                  className={`btn btn-primary m-1 ${
                    activeTab === "attachments" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("attachments")}
                >
                  Attachments
                </ScrollLink>

                <ScrollLink
                  to="emails"
                  smooth={true}
                  className={`btn btn-primary m-1 ${
                    activeTab === "emails" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("emails")}
                >
                  Emails
                </ScrollLink>

                <ScrollLink
                  to="invitedMeetings"
                  smooth={true}
                  className={`btn btn-primary m-1 ${
                    activeTab === "invitedMeetings" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("invitedMeetings")}
                >
                  Invited Meetings
                </ScrollLink>
              </div>
            </div>
          </div>
          <div className="col-9 g-3 bgwhite">
            <Element name="allInformation">
              <div>
                <div>
                  <div className="ms-3">
                    <div className="d-flex p-3">
                      <h5> Business Name * {"businessname"}</h5>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-sm-2 col-form-label">Title</label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          value={"Title"}
                          readonly
                          class="form-control"
                          placeholder="N/A"
                        />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-sm-2 col-form-label">Email</label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          value={deal.email}
                          readonly
                          class="form-control"
                          placeholder="N/A"
                        />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-sm-2 col-form-label">Phone</label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          value={deal.number}
                          readonly
                          class="form-control"
                          placeholder="N/A"
                        />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-sm-2 col-form-label">Budget</label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          value={deal.amount}
                          readonly
                          class="form-control"
                          placeholder="N/A"
                        />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-sm-2 col-form-label">Deadline</label>
                      <div class="col-md-6">
                        <input
                          type="text"
                          value={deal.deadline}
                          readonly
                          class="form-control"
                          placeholder="N/A"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button className="btn text-primary" onClick={handleclick}>
                      More Details{" "}
                      <span className="ps-3">
                        {!openD ? (
                          <BsChevronDown style={{ color: "black" }} />
                        ) : (
                          <BsChevronUp style={{ color: "black" }} />
                        )}
                      </span>
                    </button>
                    {openD && <MoreDetails deal={deal} />}
                  </div>
                </div>
              </div>
            </Element>

            <Element name="notes">
              <div className="col-12 p-3">
                <div className="">
                  <h4>Notes</h4>
                  <div class="d-flex align-items-center justify-content-between">
                    <div className="col-8">
                      <textarea
                        class="form-control"
                        placeholder="Add a Note"
                        value={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <button className="btn btn-primary" onClick={handelnotes}>
                      Add Notes
                    </button>
                  </div>
                </div>

                {/* <div className="container">
                  {resnotes.length > 0 ? (
                    <div className="p-5">
                      <Table>
                        <thead className="thead-success">
                          <tr>
                            <th>No</th>
                            <th>Added By</th>
                            <th>date</th>
                            <th>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resnotes.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{"Name"}</td>
                                <td>
                                  {moment(item.timestamp).format("DD/MM/YYYY")}
                                </td>
                                <td>{item.note}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>{" "}
                    </div>
                  ) : (
                    <p className="py-2">No Notes Added</p>
                  )}
                </div> */}
              </div>
            </Element>

            <Element name="attachments">
              <div className="row">
                <div className="col-12 p-3">
                  <div className="d-flex justify-content-between">
                    <h4>Attachments</h4>
                    <div>
                      <input
                        type="file"
                        id="file"
                        onChange={handleImgChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="file" className="btn btn-primary">
                        <span className="pe-2">
                          <div
                            style={{
                              color: "white",
                              display: "inline-block",
                            }}
                          >
                            <ImAttachment />
                          </div>
                        </span>
                        Attach File
                      </label>
                    </div>
                  </div>
                  {/* {selectedFile.length > 0 ? (
                    <div className="p-5">
                      <Table>
                        <thead className="thead-success">
                          <tr>
                            <th>No</th>
                            <th>File Name</th>
                            <th>Attached By</th>
                            <th>Date Attached</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFile.map((file, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{file.filename}</td>
                                <td>{"Name"}</td>
                                <td>
                                  {moment(file.timestamp).format("DD/MM/YYYY")}
                                </td>
                                <td>
                                  <div>
                                    <IconButton
                                      aria-label="more"
                                      id="long-button"
                                      aria-controls={
                                        menuopen ? "long-menu" : undefined
                                      }
                                      aria-expanded={
                                        menuopen ? "true" : undefined
                                      }
                                      aria-haspopup="true"
                                      onClick={handleMenuClick}
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      id="long-menu"
                                      MenuListProps={{
                                        "aria-labelledby": "long-button",
                                      }}
                                      anchorEl={anchorEl}
                                      open={menuopen}
                                      onClose={handleMenuClose}
                                      PaperComponent={({ children }) => (
                                        <Paper
                                          style={{
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: "100px",
                                          }}
                                        >
                                          {children}
                                        </Paper>
                                      )}
                                    >
                                      <>
                                        <MenuItem
                                          onClick={() => {
                                            handleMenuClose();
                                            handleViewFile(file.filename);
                                          }}
                                        >
                                          {"View"}
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            handleMenuClose();
                                            downloadFile(file.filename);
                                          }}
                                        >
                                          {"Download"}
                                        </MenuItem>
                                        <MenuItem
                                          // onClick={handleMenuClose}
                                          style={{ color: "red" }}
                                          onClick={() => {
                                            handleMenuClose();
                                            handelDelete(file.filename);
                                          }}
                                        >
                                          {"Delete"}
                                        </MenuItem>
                                      </>
                                    </Menu>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>{" "}
                    </div>
                  ) : (
                    <p>No Attachments</p>
                  )} */}
                </div>
              </div>
            </Element>

            <Element name="emails">
              <div className="row">
                <div className="col-12 p-3">
                  <div className="d-flex justify-content-between">
                    <h4>Emails</h4>
                    <button className="btn btn-primary">Compose Email</button>
                  </div>
                  <p>No Attachments</p>
                </div>
              </div>
            </Element>

            <Element name="invitedMeetings">
              <div className="row">
                <div className="col-12 p-3">
                  <div className="d-flex justify-content-between">
                    <h4>Invited Meetings</h4>
                    <button className="btn btn-primary">Shedule Meet</button>
                  </div>
                  <p>No Attachments</p>
                </div>
              </div>
            </Element>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealDetails;
