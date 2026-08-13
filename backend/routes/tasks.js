const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, updateTask, deleteTask } = require('../db/db');

// GET /api/tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks();
    return res.json({ success: true, tasks, total: tasks.length });
  } catch (err) {
    console.error('Get Tasks Error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching tasks.' });
  }
});

// POST /api/tasks
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, priority, campaign, assigneeName, dueDate, subtasks } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Task title is required.' });
    }

    const task = await createTask({
      title,
      description,
      status,
      priority,
      campaign,
      assigneeName,
      dueDate,
      subtasks,
    });

    if (req.io) {
      req.io.emit('task_created', {
        id: task.id,
        title: task.title,
        status: task.status,
        assignee: task.assignee_name || task.assigneeName,
        task,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Sprint task created successfully.',
      task,
    });
  } catch (err) {
    console.error('Create Task Error:', err);
    return res.status(500).json({ success: false, message: 'Server error creating task.' });
  }
});

// PUT /api/tasks/:id
router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateTask(id, req.body);

    if (req.io && updated) {
      req.io.emit('task_updated', {
        id: updated.id,
        status: updated.status,
        task: updated,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.json({
      success: true,
      message: 'Task updated successfully.',
      task: updated,
    });
  } catch (err) {
    console.error('Update Task Error:', err);
    return res.status(500).json({ success: false, message: 'Server error updating task.' });
  }
});

// DELETE /api/tasks/:id
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteTask(id);

    if (req.io && success) {
      req.io.emit('task_deleted', {
        id,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.json({
      success,
      message: success ? 'Task deleted successfully.' : 'Task not found.',
      id,
    });
  } catch (err) {
    console.error('Delete Task Error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting task.' });
  }
});

module.exports = router;

