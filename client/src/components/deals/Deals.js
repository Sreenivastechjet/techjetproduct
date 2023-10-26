import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import { Pagination, Input } from "antd";

function Deals() {
  const { Search } = Input;
  const [deals, setDeals] = useState([]);
  const [length, setLength] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  // console.log("deals", deals);

  const handleSearchChange = (e) => {
    setPage(1);
    setSearchKey(e.target.value);
  };

  //read products
  const getLeads = async () => {
    const res = await axios
      .post(
        `http://localhost:7000/api/v1/deal/getalldeals?page=${page}&pageSize=${pageSize}&search=${searchKey}`
      )
      .then((res) => {
        // console.log("response", res);
        setDeals(res.data.deals);
        setLength(res.data.totalDeals);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getLeads();
  }, [page]);
  return (
    <div className="main" style={{height:"92vh"}}>
      <div className="p-4">
        <div className="pb-3">
          <h4>Deals</h4>
        </div>
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
              <th>Client Name</th>
              <th>Project Name</th>
              <th>Technology</th>
              <th>Amount</th>
              <th>Stage</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((item, index) => {
              return (
                <tr key={item}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      <NavLink
                        to={`/dealdetails/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.businessname}
                      </NavLink>
                    }
                  </td>

                  <td>{item.projectname}</td>
                  <td>{item.technology}</td>
                  <td>{item.amount}</td>
                  <td>{item.stage}</td>
                  <td>{item.deadline}</td>
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
    </div>
  );
}

export default Deals;
