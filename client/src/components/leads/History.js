import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckIcon from "@mui/icons-material/Check";
import note from "../images/note.png";
import mail from "../images/mail.png";
import tag from "../images/tag.png";
import prof from "../images/prof.png";
import moment from "moment";

function History({ history }) {
  const fieldToIcon = {
    notes: <img src={note} className="img-fluid" />,
    "file attached": <img src={tag} className="img-fluid" />,
    status: <img src={prof} className="img-fluid" />,
    email: <img src={mail} className="img-fluid" />,
    "Lead Created": <img src={prof} className="img-fluid" />
  };
  const fieldToDisplayName = {
    notes: "Notes",
    "file attached": "File Attached",
    status: "Status",
    email: "Email Sent",
    "Lead Created": "Lead Created",
  };
  return (
    <div className="container mt-3" style={{ padding: "0px 50px 50px 120px", minHeight:"60vh" }}>
      <Stepper activeStep={history.length - 1} orientation="vertical">
        {history.map((step, index) => (
          <Step key={index}>
            <StepLabel
              icon={
                fieldToIcon[step.changes[0].field] || (
                  <CheckIcon color="primary" />
                )
              }
            >
              <div style={{ marginLeft: "-140px", paddingTop: "20px" }}>
                {moment(step.timestamp).format("DD/MM/YYYY ")} <br />
                {moment(step.timestamp).format('LT')}
              </div>
              <ul>
                {step.changes.map((change, changeIndex) => (
                  <>
                    <p
                      key={changeIndex}
                      style={{ marginTop: "-40px", position: "absolute" }}
                    >
                      <strong>{fieldToDisplayName[change.field] || change.field} </strong> 
                      <br />
                      <strong>By:</strong> {change.newValue}
                    </p>
                  </>
                ))}
              </ul>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default History;
