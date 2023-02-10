const Task = require("../models/Task");
const { asyncWrapper } = require("../middlewares/async");
const { createCustomError } = require("../middlewares/errorHandler");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: true,
    tasks,
  });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: true,
    task,
  });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const singleTask = await Task.findOne({ _id: taskID });

  if (!singleTask) {
    return next(createCustomError("No task found with the given ID", 404));
  }

  res.status(200).json({
    status: true,
    task: singleTask,
  });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const deletedTask = await Task.findByIdAndDelete({ _id: taskID });

  if (!deletedTask) {
    return next(createCustomError("No task found with the given ID", 404));
  }

  res.status(200).json({
    status: true,
    task: deletedTask,
  });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    { _id: id },
    {
      name,
      completed,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedTask) {
    return next(createCustomError("No task found with the given ID", 404));
  }

  res.status(200).json({
    status: true,
    task: updatedTask,
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
