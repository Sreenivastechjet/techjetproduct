import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import { Pagination, Input } from "antd";
import LeadBoardview from "./LeadBoardview";
import { CiBoxList } from "react-icons/ci";
import { PiSquaresFourLight } from "react-icons/pi";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { upperFirst } from "../utils/common";
import { IconButton, Tooltip } from "@mui/material";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const headerValidationRules = {
  "Lead Name": (value) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(value);
  },
  Email: (value) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(value);
  },
  Number: (value) => {
    const numberRegex = /^[6789]\d{9}$/;
    // return !isNaN(value);
    return numberRegex.test(value);
  },
};

// Function to validate a row of data based on header mapping
function validateRow(row, headerMapping) {
  let errors = [];

  Object.entries(headerMapping).forEach(([header, validateFn]) => {
    const cellValue = row[header];

    if (!cellValue) {
      errors.push(`Empty value in ${header} column.`);
    } else if (validateFn && !validateFn(cellValue)) {
      errors.push(`Invalid ${header} value: ${cellValue}`);
    }
  });

  return errors;
}

function Leads() {
  const { Search } = Input;
  const [leads, setLeads] = useState([]);
  const [length, setLength] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [openList, setOpenList] = useState(true);
  const [openBoard, setOpenBoard] = useState(false);
  // console.log("leads", leads);

  const openBoardView = () => {
    setOpenBoard(true);
    setOpenList(false);
  };
  const openListView = () => {
    setOpenBoard(false);
    setOpenList(true);
  };

  const handleSearchChange = (e) => {
    setPage(1);
    // console.log(e, "handleSearchChange");
    setSearchKey(e.target.value);
  };

  //read products
  const getLeads = async () => {
    const res = await axios
      .post(
        `http://localhost:7000/api/v1/lead/getallleads?page=${page}&pageSize=${pageSize}&search=${searchKey}`
      )
      .then((res) => {
        // console.log("response", res);
        setLeads(res.data.leads);
        setLength(res.data.totalLeads);
      })
      .catch((error) => console.log(error));
  };

  const exportToExcel = async () => {
    await axios
      .get("http://localhost:7000/api/v1/lead/exporttoexcel", {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "leads.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getLeads();
  }, [page]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = event.target.result;
      const workbook = XLSX.read(fileData, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Define your header mapping (example headers)
      const headerMapping = {
        "Business Name": null,
        "Lead Name": headerValidationRules["Lead Name"],
        Number: headerValidationRules.Number,
        Email: headerValidationRules.Email,
      };

      let errors = [];

      for (const row of sheet) {
        const validationErrors = validateRow(row, headerMapping);

        if (validationErrors.length > 0) {
          errors.push(validationErrors.join("\n"));
        }
      }

      if (errors.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Validation Errors",
          html: `<pre>${errors.join("\n")}</pre>`,
        });
      } else {
        UploadExcelData(sheet);
      }
      e.target.value = null;
    };

    reader.readAsArrayBuffer(file);
  };

  const UploadExcelData = async (data) => {
    const uploadData = data?.map((row) => ({
      leadname: row["Lead Name"],
      businessdetails: row["Business Name"],
      email: row["Email"],
      number: row["Number"],
    }));
    console.log("first", uploadData);
    await axios
      .post("http://localhost:7000/api/v1/lead/bulkuploadleads", {
        data: uploadData,
      })
      .then((response) => {
        console.log(response?.data.msg);
        if (response) {
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: response?.data.msg,
            });
          }, 2000);

          getLeads();
        }
      })
      .catch((error) => {
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: error?.response?.data.msg,
          });
        }, 1000);
      });
  };
  return (
    <div className="main">
      <div className="d-flex justify-content-end">
        <div className="mt-5 d-flex" style={{ marginRight: "100px" }}>
          <h1
            className="border bg-light m-1 px-2 d-flex align-items-center"
            onClick={openListView}
          >
            <Tooltip title="List View">
              <IconButton>
                <CiBoxList />
              </IconButton>
            </Tooltip>
          </h1>
          <h1
            className="border bg-light m-1 px-2 d-flex align-items-center"
            onClick={openBoardView}
          >
            <Tooltip title="Board View">
              <IconButton>
                <PiSquaresFourLight />
              </IconButton>
            </Tooltip>
          </h1>
          <h1
            className="border bg-light m-1 px-2 d-flex align-items-center "
            onClick={exportToExcel}
          >
            <Tooltip title="Import to Excel">
              <IconButton>
                <HiOutlineDocumentArrowDown />
                <span className="text-primary">Import</span>
              </IconButton>
            </Tooltip>
          </h1>

          <h1 className="border bg-light m-1 px-2 d-flex align-items-center">
            <IconButton>
              <Tooltip title="Bulk upload from Excel">
                <label htmlFor="excelupload" style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <HiOutlineDocumentArrowDown />
                    <span className="text-primary">Upload</span>
                  </div>
                  <input
                    type="file"
                    id="excelupload"
                    onChange={handleFileUpload}
                    hidden
                  />
                </label>
              </Tooltip>
            </IconButton>
          </h1>
        </div>
      </div>
      {openList && (
        <div className="p-4">
          <div className="d-flex">
            <Search
              style={{ width: "500px", padding: "10px 20px 10px 0px" }}
              size="large"
              className="serach_customerswithId"
              placeholder="Search by Name / Email"
              enterButton
              onSearch={getLeads}
              value={searchKey.trimStart()}
              onChange={handleSearchChange}
            />
          </div>
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Lead Name</th>
                <th>Date</th>
                <th>Business Category</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Lead Stage</th>
                <th>Lead Status</th>
              </tr>
            </thead>
            <tbody>
              {leads?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <NavLink
                        to={`/leaddetails/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {upperFirst(item.leadname)}
                      </NavLink>
                    </td>

                    <td>{item.contacteddate}</td>
                    <td>{item.businesscategory}</td>
                    <td> {item.number}</td>
                    <td>{item.email}</td>
                    <td>{item.leadstage}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {length == 0 ? (
            <div className="text-center mt-5">"No data found"</div>
          ) : (
            <div className="d-flex justify-content-between p-3 bgwhite">
              <p>
                Showing {(page - 1) * pageSize + 1} to{" "}
                {Math.min(page * pageSize, length)} of {length} Leads
              </p>
              <Pagination
                hideOnSinglePage={true}
                showSizeChanger={false}
                current={page}
                total={length}
                pageSize={pageSize}
                onChange={(pageNo, pageSize) => {
                  setPage(pageNo);
                }}
                size="default"
              />
            </div>
          )}
        </div>
      )}

      {openBoard && <LeadBoardview />}
    </div>
  );
}

export default Leads;
