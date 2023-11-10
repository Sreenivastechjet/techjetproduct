const Meeting = require("../model/meetingModel");

const meetingController = {
  createMeeting: async (req, res) => {
    try {
      const newEvent = new Meeting(req.body);
      const savedEvent = await newEvent.save();
      res.status(200).json({ msg: "even created successfuly" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getAllMeetings: async (req, res) => {
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    const assigneeValue = req.params.email;

    try {
      const events = await Meeting.find({
        "participents.value": assigneeValue,
      });
      // const events = await Meeting.find({ date: { $gte: today } });
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ error: "Could not retrieve events." });
    }
  },
  getAllMeetingsFromToday: async (req, res) => {
    const assigneeValue = req.params.email;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const meetings = await Meeting.find({ start: { $gte: today }, "participents.value": assigneeValue, }).sort(
        { start: -1 }
      );

      res.status(200).json(meetings);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve meetings." });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: "Could not retrieve the event." });
    }
  },
  updatemeeting: async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        req.body,
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json({ msg: "Event Updated" });
    } catch (error) {
      res.status(400).json({ error: "Could not update the event." });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndRemove(req.params.eventId);
      if (!deletedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(204).send({ msg: "Successfully deleted Event" });
    } catch (error) {
      res.status(400).json({ error: "Could not delete the event." });
    }
  },
};
module.exports = meetingController;
