const db = require("../models");
const Task = db.task

exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    return res.status(400).send({
      code: 400,
      message: "Title can not be empty",
    });
  }

  const task = {
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate ? req.body.startDate : null,
    dueDate: req.body.dueDate ? req.body.dueDate : null,
    completeDate: req.body.completeDate ? req.body.completeDate : null,
    createdBy: req.user.userId,
  };

  Task.create(task)
    .then((data) => {
      res.status(200).json({
        code: 200,
        message: "Task created successfully.",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Task.",
        data: null,
      });
    });
};

exports.findAll = (req, res) => {

  const whereCondition = {};

  whereCondition.createdBy = req.user.userId;

  Task.findAll({
    where: whereCondition
  })
    .then((tasks) => {
      res.status(200).json({
        code: 200,
        message: "Task retrieved successfully.",
        data: tasks,
      });
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: err.message || "Some error occurred while retrieving tasks.",
        data: null,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log('req.body',req.body)
  Task.update({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || null,
  }, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          code: 200,
          message: "Task updated successfully.",
          data: req.body,
        });
      } else {
        res.status(200).json({
          code: 200,
          message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: err.message || "Some error occurred while updating the task.",
        data: null,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  Task.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          code: 200,
          message: "Task deleted successfully.",
          data: req.body,
        });
      } else {
        res.status(200).json({
          code: 200,
          message: `Cannot delete task with id=${id}. Maybe task was not found!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        code: 200,
        message: err.message || "Some error occurred while deleting the task.",
        data: null,
      });
    });
};

// Mengambil data sesuai id yang dikirimkan
exports.findOne = (req, res) => {
  Task.findByPk(req.params.id)
    .then((task) => {
      res.status(200).json({
        code: 200,
        message: "Task retrieved successfully.",
        data: task,
      });
    })
    .catch((err) => {
      res.status(500).json({
        code: 500,
        message: err.message || "Some error occurred while retrieving task.",
        data: null,
      });
    });
};
