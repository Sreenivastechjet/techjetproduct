import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./meeting.css";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Modal, Input } from "antd";
import Select from "react-select";

const employeelist = [
  { value: "arun", label: "Arun" },
  { value: "kiran", label: "Kiran" },
  { value: "nithin", label: "Nithin" },
  { value: "megha", label: "Megha" },
  { value: "mahima", label: "Mahima" },
];
const typeMeeting = [
  { value: "General", label: "General" },
  { value: "Stand up", label: "Stand up" },
  { value: "Team Meeting", label: "Team Meeting" },
  { value: "Others", label: "Others" },
];

function Meeting() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [cardView, setCardView] = useState([]);
  const [showEventModal, setShowModal] = useState(false);
  const [typemeetOption, setTypemeetOption] = useState(null);
  const [peopleOption, setPeopleOption] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    people: [],
    start: "",
    end: "",
    date: "",
    description: "",
  });

  console.log("cardView", cardView);

  const modelClose = () => {
    setShowModal(false);
    setNewEvent({
      title: "",
      people: [],
      start: "",
      end: "",
      date: "",
      description: "",
    });
    setTypemeetOption(null);
    setPeopleOption([]);
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };
  const handlePeopleChange = (selectedOptions) => {
    const people = selectedOptions.map((option) => option.value);
    setNewEvent({
      ...newEvent,
      people,
    });
  };
  const handlMeetingChange = (selectedOptions) => {
    const title = selectedOptions.value;
    setTypemeetOption(selectedOptions);
    setNewEvent({
      ...newEvent,
      title,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const startTime = new Date(`${newEvent.date}T${newEvent.start}:00`);
    const endTime = new Date(`${newEvent.date}T${newEvent.end}:00`);
    const data = {
      title: newEvent.title,
      start: startTime,
      end: endTime,
      people: newEvent.people,
      description: newEvent.description,
    };
    console.log("meeting", data);
    const res = await axios
      .post("http://localhost:7000/api/v1/event/cratemeeting", data)
      .then((res) => {
        console.log(res);
        setNewEvent({
          title: "",
          people: [],
          start: "",
          end: "",
          description: "",
        });
        geteventdata();
        setShowModal(false);
        setTypemeetOption(null);
        setPeopleOption([]);
      })
      .catch((err) => console.log(err));
  };

  const geteventdata = async () => {
    const res = await axios
      .post("http://localhost:7000/api/v1/event/getallmeetings")
      .then((response) => {
        setCardView(response.data);
        const eventsData = response.data.map((event) => ({
          id: event._id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          allDay: event.allDay,
          description: event.description,
        }));

        setEvents(eventsData);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    geteventdata();
  }, []);

  return (
    <div className="main">
      <div className="container" style={{ height: "90vh" }}>
        <div className="row">
          <div className="col-8 container">
            <div className="mt-5 p-5 bgwhite">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </div>
          </div>
          <div className="col-4 pt-5">
            <div className="d-flex justify-content-between p-2 bgwhite">
              <h6 className="">Meeting</h6>
              <p>View All</p>
            </div>
            <div
              className="container  bgwhite position-relative"
              style={{
                maxHeight: "72vh",
                minHeight: "72vh",
                overflowY: "auto",
              }}
            >
              <div className="">
                {cardView.map((item, index) => {
                  return (
                    <div className="d-flex justify-content-center" key={index}>
                      {console.log("first", item)}

                      <div class="card mb-2" style={{ width: "20rem" }}>
                        <div class="card-body">
                          <h5 class="card-title"> Title : {item.title}</h5>
                          <p>Timings : {moment(item.start).format('LT')} to {moment(item.end).format('LT')}</p>
                          <p class="card-text d-flex ">Team : &nbsp;
                            {item.people.map((person, i) => (
                              <p key={i} className="">
                                {person}, &nbsp;
                              </p>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="addmeeting">
                <button className="addbtn" onClick={() => setShowModal(true)}>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Create Event"
        open={showEventModal}
        onOk={handleSubmit}
        onCancel={modelClose}
        okText="Create"
      >
        <div>
          <div className="row p-2">
            <div className="col-3">
              <p>Meeting Type</p>
            </div>
            <div className="col-9">
              <Select
                placeholder="Select Type"
                options={typeMeeting}
                onChange={handlMeetingChange}
                defaultValue={typemeetOption}
              />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-3">
              <p>Add Peoples</p>
            </div>
            <div className="col-9">
              <Select
                defaultValue={peopleOption}
                isMulti
                name="colors"
                options={employeelist}
                className="basic-multi-select"
                onChange={handlePeopleChange}
                classNamePrefix="select"
              />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-3">
              <p>Date</p>
            </div>
            <div className="col-9">
              <Input
                placeholder="End"
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleNewEventChange}
              />
            </div>
          </div>

          <div className="row p-2">
            <div className="col-3">
              <p>Start Time</p>
            </div>
            <div className="col-9">
              <Input
                placeholder="Start"
                type="time"
                name="start"
                format="HH:mm"
                value={newEvent.start}
                onChange={handleNewEventChange}
              />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-3">
              <p>End Time</p>
            </div>
            <div className="col-9">
              <Input
                placeholder="End"
                type="time"
                name="end"
                format="HH:mm"
                value={newEvent.end}
                onChange={handleNewEventChange}
              />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-3">
              <p>Description</p>
            </div>
            <div className="col-9">
              <Input
                placeholder="Description...."
                type="text"
                name="description"
                value={newEvent.description}
                onChange={handleNewEventChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Meeting;
