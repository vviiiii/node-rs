const Task = require('../resources/tasks/task.model');

let tasksDB = [];
const tasksCount = 2;

const createDB = () => {
  tasksDB.push({
    id: '1',
    title: 'Task',
    order: 0,
    description: 'test',
    userId: 'test',
    boardId: 'test1',
    columnId: 'test'
  });

  for (let i = 0; i < tasksCount; i++) {
    tasksDB.push(new Task());
  }
};

createDB();

const getAllTasks = async boardId => {
  const tasks = tasksDB.filter(board => {
    return board.boardId === boardId;
  });
  return JSON.parse(JSON.stringify(tasks));
};

const getTask = async (boardId, taskId) => {
  const task = tasksDB.find(_task => {
    return _task.id === taskId;
  });

  return task;
};

const createTask = async task => {
  tasksDB.push(task);
  return getTask(task.boardId, task.id);
};

const updateTask = async ({
  title,
  order,
  description,
  taskId,
  userId,
  boardId,
  columnId
} = {}) => {
  let task = await getTask(boardId, taskId);
  task = { ...task, title, order, description, userId, boardId, columnId };
  const taskIndex = tasksDB.findIndex(_task => {
    return _task.id === taskId;
  });
  if (taskIndex >= 0) {
    tasksDB.splice(taskIndex, 1, task);
    return getTask(boardId, taskId);
  }
  return false;
};

const removeTask = async (boardId, taskId) => {
  const task = await getTask(boardId, taskId);
  const taskIndex = tasksDB.findIndex(_task => {
    return _task.id === taskId;
  });

  if (taskIndex >= 0) {
    tasksDB.splice(taskIndex, 1);
    return task;
  }
  return false;
};

const unassignUsersFromTask = async userId => {
  tasksDB.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
};

const removeTasksFromBoard = async boardId => {
  tasksDB = tasksDB.filter(board => {
    return board.boardId !== boardId;
  });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  unassignUsersFromTask,
  removeTasksFromBoard
};
