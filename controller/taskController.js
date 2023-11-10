const Task = require("../model/taskModel");

const taskController = {
  createtask: async (req, res) => {
    try {
      const newtask = new Task(req.body);
      newtask.status= "To Do"
      const savedEvent = await newtask.save();
      res.status(200).json({ msg: "task created successfuly" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getalltasks: async (req, res) => {
    try {
      // const tasks = await Task.find();
      const assigneeValue = req.params.assigneeValue;

      const tasks = await Task.find({
        'assignees.value': assigneeValue,
      });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: "Could not retrieve events." });
    }
  },
  taskstatus: async (req, res) => {
    try {
        const {id, status} = req.params
      const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
    //   newtask.status= status
      res.status(200).json({msg:"status updated"});
    } catch (error) {
      res.status(400).json({ error: "Could not retrieve events." });
    }
  },
};
module.exports = taskController;
