const { Task } = require('../../models');

const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      due_date,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error getting tasks', error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error getting task', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const [updated] = await Task.update({ title, description, status, due_date }, {
      where: { id, userId: req.user.id },
    });
    if (updated) {
      const updatedTask = await Task.findOne({ where: { id, userId: req.user.id } });
      return res.status(200).json(updatedTask);
    }
    throw new Error('Task not found');
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id, userId: req.user.id },
    });
    if (deleted) {
      return res.status(204).send(); // No Content
    }
    throw new Error('Task not found');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
