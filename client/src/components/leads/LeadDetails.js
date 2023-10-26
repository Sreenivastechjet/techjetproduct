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
import { Tabs } from "antd";
import History from "./History";
import Email from "./Email";
const { TabPane } = Tabs;

const ITEM_HEIGHT = 48;
const leadstatus = [
  { value: "Attempted to Contact", label: "Attempted to Contact" },
  { value: "Not Contacted", label: "Not Contacted" },
  { value: "Contact in Future", label: "Contact in Future" },
  { value: "Pending", label: "Pending" },
  { value: "Negotiation/Review", label: "Negotiation/Review" },
  { value: "Sent Agreement", label: "Sent Agreement" },
  { value: "Sent SOW", label: "Sent SOW" },
  { value: "Lost Lead", label: "Lost Lead" },
  { value: "Converted to Deal", label: "Converted to Deal" },
];
const employeelist = [
  { value: "arun", label: "Arun" },
  { value: "kiran", label: "Kiran" },
  { value: "nithin", label: "Nithin" },
  { value: "megha", label: "Megha" },
  { value: "mahima", label: "Mahima" },
];
const followup = [
  { value: "Follow up 1", label: "Follow up 1" },
  { value: "Follow up 2", label: "Follow up 2" },
  { value: "Follow up 3", label: "Follow up 3" },
  { value: "Follow up 4", label: "Follow up 4" },
  { value: "Follow up 5", label: "Follow up 5" },
];

const stageOpt = [
  { value: "Advance Payment", label: "Advance Payment" },
  { value: "Full Payment", label: "Full Payment" },
  // { value: "stage1", label: "Stage-1 UI/UX" },
  // { value: "stage2", label: "Stage-2 Development" },
  // { value: "stage3", label: "Stage-3 QA/Testing" },
  // { value: "stage4", label: "Stage-1 Deployed" },
];
const leadstageoptions = [
  { value: "New Lead", label: "New Lead" },
  { value: "Qualified", label: "Qualified" },
  { value: "Loss", label: "Loss" },
  { value: "Proposition", label: "Proposition" },
  { value: "Negotiation", label: "Negotiation" },
  { value: "Deal Won", label: "Deal Won" },
];
function LeadDetails() {
  const [openD, setOpenD] = useState(false);
  const [selectedFile, setSelectedFiles] = useState([]);
  const [lead, setLead] = useState([]);
  const [businessname, setBusinessname] = useState("");
  const params = useParams();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
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
  const [status, setStatus] = useState(null);
  const [assaignstatus, setAssaignstatus] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState("allInformation");
  const [selectedleadstage, setSelectedleadstage] = useState(null);
  const [selectedstageval, setSelectedstageval] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("lead", lead);

  const [formData, setFormData] = useState({
    amount: 0,
    advance: 0,
    balanceamount: 0,
    projectName: "",
    deadline: "",
    dealclosedby: "",
    paymentstatus: "",
  });
  const [selectedStage, setSelectedStage] = useState("");
  const [gst] = useState(0.18);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      paymentstatus: selectedStage.value,
    }));

    setFormData((prevData) => {
      const gstAmount = parseInt(prevData.amount || 0) * gst;
      const totalAmount = parseInt(prevData.amount || 0) + gstAmount;
      const balanceAmount = totalAmount - prevData.advance;
      return { ...prevData, balanceamount: balanceAmount.toString() };
    });
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
        console.log("download", response);
        const contentType = response.headers["content-type"];
        let extension = "bin"; // Default to "bin" if the extension cannot be determined

        // Check for common file types (you can extend this list)
        if (contentType) {
          if (contentType.includes("pdf")) {
            extension = "pdf";
          } else if (
            contentType.includes("jpeg") ||
            contentType.includes("jpg")
          ) {
            extension = "jpg";
          }
          // Add more conditions for other file types as needed
        }
        // Create a Blob URL for the file content
        const blob = new Blob([response.data]);
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a hidden anchor link to trigger the download
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = blobUrl;
        a.download = `file_${Date.now()}.${extension}`;
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
  const handeldropopen = () => {
    setdropopen(!dropopen);
  };
  const canceledit = () => {
    setdropopen(!dropopen);
    setSelectedlead(null);
    setSelectedleadval(null);
    setSelectedassign(null);
    setAssignTo(null);
    setSelectedfallow(null);
    setFollowUp(null);
    setSelectedleadstage(null);
  };

  const handelleadselect = (selected) => {
    setSelectedlead(selected);
    setSelectedleadval(selected.value);
  };
  const leadstageselect = (selected) => {
    setSelectedleadstage(selected);
    setSelectedstageval(selected.value);
  };
  const handelassignselect = (selected) => {
    setSelectedassign(selected);
    setAssignTo(selected.value);
  };
  const handelefallowselect = (selected) => {
    setSelectedfallow(selected);
    setFollowUp(selected.value);
  };

  const getDetails = async (id) => {
    let res = await axios.get(
      `http://localhost:7000/api/v1/lead/getlead/${id}`
    );
    if (res) {
      setLead(res?.data?.lead);
      setBusinessname(res?.data?.lead.businessdetails);
      // console.log("npotes", res?.data?.lead.leadstatus);
      setSelectedFiles(res?.data?.lead.images);
      setResnotes(res?.data?.lead.notes);
      setStatus(res?.data?.lead?.status);
      setAssaignstatus(res?.data?.lead?.leadstatus);
    }
  };

  const handelnotes = async () => {
    if (note) {
      try {
        const res = await axios.patch(
          `http://localhost:7000/api/v1/lead/updateLeadnotes/${params.id}`,
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
          `http://localhost:7000/api/v1/lead/updateLeadfile/${params.id}`,
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
        console.log("File upload error", error);
        // Handle error and provide user feedback
      }
    }
  };

  const handleUpdateStatus = async () => {
    // Define the data to send in the request body
    const data = {
      status: selectedleadval,
      fallowUp: followUp,
      assignTo: assignTo,
      leadstage: selectedstageval,
    };

    await axios
      .put(
        `http://localhost:7000/api/v1/lead/updateLeadStatus/${params.id}`,
        data
      )
      .then((response) => {
        // console.log("Lead status updated successfully:", response.data);
        getDetails(params.id);
        setSelectedlead(null);
        setSelectedleadval(null);
        setSelectedassign(null);
        setAssignTo(null);
        setSelectedfallow(null);
        setFollowUp(null);
        setdropopen(!dropopen);
      })
      .catch((error) => {
        console.log("Error updating lead status:", error);
      });
  };

  useEffect(() => {
    getDetails(params.id);
  }, []);

  const back = () => {
    Navigate(`/leads`);
  };

  const handleclick = () => {
    setOpenD(!openD);
  };

  const handelDelete = async (index) => {
    if (index) {
      try {
        const res = await axios.delete(
          `http://localhost:7000/api/v1/lead/updateLead/${params.id}/${index}`
        );
        getDetails(params.id);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    // e.preventdefault()
    const payload = {
      ...lead,
      ...formData,
    };
    // console.log("Deals details>>", payload);
    const res = axios
      .post(`http://localhost:7000/api/v1/deal/createdeal`, payload)
      .then((res) => {
        // console.log("deal", res);
        if (res) {
          setFormData({
            amount: 0,
            advance: 0,
            balanceamount: 0,
            projectName: "",
            deadline: "",
            dealclosedby: "",
            paymentstatus: "",
          });
          setSelectedStage("");
          Navigate(`/deals`);
        }
      })
      .catch((err) => console.log(err));

    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };
  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
    setFormData({
      amount: 0,
      advance: 0,
      balanceamount: 0,
      projectName: "",
      deadline: "",
      dealclosedby: "",
      paymentstatus: "",
    });
    setSelectedStage("");
  };

  return (
    <div className="main">
      <div className="p-3">
        <div className="pt-3 pb-3 m-3 d-flex justify-content-between">
          <button className="ps-3 btn btn-outline-secondary" onClick={back}>
            {" "}
            <MdKeyboardBackspace /> Lead Information
          </button>
          <div className="d-flex">
            <button className="btn btn-outline-primary me-2">
              Assign Project Manager
            </button>
            <button className="btn btn-primary me-2" onClick={showModal}>
              Convert
            </button>
          </div>
        </div>
        <div className="row m-3 justify-content-between">
          <div className="col-3 g-3">
            <div className="p-3 bgwhite">
              <div className="d-flex flex-column">
                {/* <button className="btn btn-primary m-1">ALL Information</button> */}
                <ScrollLink
                  to="allInformation"
                  smooth={true}
                  // activeClass="active"
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
                  // activeClass="active"
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
                  // activeClass="active"
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
                  // activeClass="active"
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
                  // activeClass="active"
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
            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                <Element name="allInformation">
                  <div>
                    <div>
                      <div className="ms-3">
                        <div className="d-flex p-3">
                          <h5> Business Name * {businessname}</h5>
                        </div>
                        <div class="mb-3 row">
                          <label class="col-sm-2 col-form-label">Title</label>
                          <div class="col-md-6">
                            <input
                              type="text"
                              value={lead.leadname}
                              readonly
                              class="form-control"
                              placeholder="N/A"
                            />
                          </div>
                        </div>

                        {!dropopen && (
                          <>
                            <div class="mb-3 row d-flex align-items-center">
                              <label class="col-sm-2 col-form-label">
                                Lead Stage
                              </label>
                              <div class="col-md-6">
                                <input
                                  type="text"
                                  value={lead.leadstage}
                                  readonly
                                  class="form-control"
                                  placeholder="Not Contacted"
                                />
                              </div>
                              <div className="col">
                                <span className="p-3" onClick={handeldropopen}>
                                  <FiEdit />
                                </span>
                              </div>
                            </div>
                            <div class="mb-3 row d-flex align-items-center">
                              <label class="col-sm-2 col-form-label">
                                Lead Status
                              </label>
                              <div class="col-md-6 ">
                                <input
                                  type="text"
                                  value={status}
                                  readonly
                                  class="form-control"
                                  placeholder="lead status"
                                />
                              </div>
                              {/* <div className="col">
                            <span className="p-3" onClick={handeldropopen}>
                              <FiEdit />
                            </span>
                          </div> */}
                            </div>
                          </>
                        )}

                        {dropopen ? (
                          <div className="">
                            <div class="mb-3 row">
                              <label class="col-sm-2 col-form-label">
                                Lead Stage
                              </label>
                              <div class="col-md-6">
                                <Select
                                  defaultValue={selectedleadstage}
                                  onChange={leadstageselect}
                                  options={leadstageoptions}
                                  className="reactselect"
                                />
                              </div>
                            </div>
                            <div class="mb-3 row">
                              <label class="col-sm-2 col-form-label">
                                Lead Status
                              </label>
                              <div class="col-md-6">
                                <Select
                                  // value={selectedlead}
                                  onChange={handelleadselect}
                                  options={leadstatus}
                                  className="reactselect"
                                  defaultValue={selectedlead}
                                />
                              </div>
                            </div>
                            <div class="mb-3 row">
                              <label class="col-sm-2 col-form-label">
                                Follow Up
                              </label>
                              <div class="col-md-6">
                                <Select
                                  value={selectedfallow}
                                  onChange={handelefallowselect}
                                  options={followup}
                                  className="reactselect"
                                />
                              </div>
                            </div>
                            <div class="mb-3 row">
                              <label class="col-sm-2 col-form-label">
                                Assain To
                              </label>
                              <div class="col-md-6">
                                <Select
                                  defaultValue={selectedassign}
                                  onChange={handelassignselect}
                                  options={employeelist}
                                  className="reactselect"
                                />
                              </div>
                            </div>

                            <div className="row mb-3">
                              <div className="col-8">
                                <div className="d-flex justify-content-end">
                                  <button
                                    className="btn btn-primary me-3"
                                    onClick={handleUpdateStatus}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="btn btn-warning"
                                    onClick={canceledit}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {assaignstatus.length > 0 ? (
                          <div className="row">
                            <div className="col-2"></div>
                            <div className="col-6">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Task</th>
                                    <th>Assigned To</th>
                                    <th>Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {assaignstatus.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{item.fallowUp}</td>
                                        <td>{item.assignTo}</td>
                                        <td>
                                          {moment(item.timestamp).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <button
                          className="btn text-primary"
                          onClick={handleclick}
                        >
                          More Details{" "}
                          <span className="ps-3">
                            {!openD ? (
                              <BsChevronDown style={{ color: "black" }} />
                            ) : (
                              <BsChevronUp style={{ color: "black" }} />
                            )}
                          </span>
                        </button>
                        {openD && <MoreDetails lead={lead} />}
                      </div>
                      <div className="row">
                        <Modal
                          title="Creating a new Deal for this account"
                          open={open}
                          onOk={handleOk}
                          confirmLoading={confirmLoading}
                          onCancel={handleCancel}
                          okText="Convert"
                        >
                          <div>
                            <div className="row p-2">
                              <div className="col-3">
                                <p>Amount</p>
                              </div>
                              <div className="col-9">
                                <Input
                                  type="number"
                                  placeholder="default size"
                                  value={
                                    formData.amount === 0 ? "" : formData.amount
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, "amount")
                                  }
                                  prefix={<TbCurrencyRupee />}
                                />
                              </div>
                            </div>
                            <div className="row p-2">
                              <div className="col-3">
                                <p>Advance</p>
                              </div>
                              <div className="col-9">
                                <Input
                                  placeholder="default size"
                                  value={
                                    formData.advance === 0
                                      ? ""
                                      : formData.advance
                                  }
                                  onChange={(e) =>
                                    handleInputChange(e, "advance")
                                  }
                                  prefix={<TbCurrencyRupee />}
                                />
                              </div>
                            </div>

                            <div className="row p-2">
                              <div className="col-3">
                                <p>Balance</p>
                              </div>
                              <div className="col-9">
                                <Input
                                  placeholder="default size"
                                  value={
                                    formData.balanceamount === 0
                                      ? ""
                                      : formData.balanceamount
                                  }
                                  readOnly
                                  prefix={<TbCurrencyRupee />}
                                />
                                <span className="snall">
                                  Note: Balance Including 18% gst
                                </span>
                              </div>
                            </div>

                            <div className="row p-2">
                              <div className="col-3">
                                <p>Project Name</p>
                              </div>
                              <div className="col-9">
                                <Input
                                  placeholder="default size"
                                  type="text"
                                  value={formData.projectName}
                                  onChange={(e) =>
                                    handleInputChange(e, "projectName")
                                  }
                                />
                              </div>
                            </div>
                            <div className="row p-2">
                              <div className="col-3">
                                <p>Deadline</p>
                              </div>
                              <div className="col-9">
                                <Input
                                  placeholder="default size"
                                  type="date"
                                  value={formData.deadline}
                                  onChange={(e) =>
                                    handleInputChange(e, "deadline")
                                  }
                                />
                              </div>
                            </div>
                            <div className="row p-2">
                              <div className="col-3">
                                <p>Deal Colsed By</p>
                              </div>
                              <div className="col-9">
                                <Input
                                  placeholder="default size"
                                  type="text"
                                  value={formData.dealclosedby}
                                  onChange={(e) =>
                                    handleInputChange(e, "dealclosedby")
                                  }
                                />
                              </div>
                            </div>
                            <div className="row p-2">
                              <div className="col-3">
                                <p>Payment Stage</p>
                              </div>
                              <div className="col-9">
                                <Select
                                  defaultValue="lucy"
                                  style={{ width: 120 }}
                                  value={selectedStage}
                                  options={stageOpt}
                                  onChange={(value) => setSelectedStage(value)}
                                />
                              </div>
                            </div>
                          </div>
                        </Modal>
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
                        <button
                          className="btn btn-primary"
                          onClick={handelnotes}
                        >
                          Add Notes
                        </button>
                      </div>
                    </div>

                    <div className="container">
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
                                      {moment(item.timestamp).format(
                                        "DD/MM/YYYY"
                                      )}
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
                    </div>
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
                            accept="image/jpeg,image/png,application/pdf"
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
                      {selectedFile.length > 0 ? (
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
                                      {moment(file.timestamp).format(
                                        "DD/MM/YYYY"
                                      )}
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
                      )}
                    </div>
                  </div>
                </Element>

                <Element name="emails">
                  <div className="row card">
                    <div className="col-12 p-3">
                      <div className="d-flex justify-content-between">
                        <h4>Emails</h4>
                        <button
                          className="btn btn-primary"
                          onClick={toggleModal}
                        >
                          Compose Email
                        </button>
                      </div>
                      <Email
                        visible={modalVisible}
                        toggleModal={toggleModal}
                        id={params.id}
                        getDetails={getDetails}
                      />

                      <div className="container">
                        {lead.emails?.length > 0 ? (
                          <div className="p-5">
                            <Table>
                              <thead className="thead-success">
                                <tr>
                                  <th>No</th>
                                  <th>Send By</th>
                                  <th>date</th>
                                  <th>Content</th>
                                </tr>
                              </thead>
                              <tbody>
                                {lead?.emails.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item?.sentby}</td>
                                      <td>
                                        {moment(item?.timestamp).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </td>
                                      <td>{item?.content}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>{" "}
                          </div>
                        ) : (
                          <p className="py-2">No Emails Sent</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Element>

                <Element name="invitedMeetings">
                  <div className="row">
                    <div className="col-12 p-3">
                      <div className="d-flex justify-content-between">
                        <h4>Invited Meetings</h4>
                        <button className="btn btn-primary">
                          Shedule Meet
                        </button>
                      </div>
                      <p>No Attachments</p>
                    </div>
                  </div>
                </Element>

                <Element name="invitedMeetings"></Element>
              </TabPane>
              <TabPane tab="History" key="2">
                <History history={lead.history} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
