'use strict';

const tasks = {
  minutes05: [],
  minutes10: [],
  minutes30: [],
};

const randomlySelectTask = (tasks) => {
  const index = Math.floor(Math.random() * tasks.length);
  return tasks[index];
};

const checkBoxKeepInbuilt = document.getElementById('checkbox-keep-inbuilt');
const timeSelector = document.getElementById('select-time');
const buttonAdd = document.getElementById('button-add');
const rolledTask = document.getElementById('rolled-task');

const roll = () => {
  const availableTasks = tasks[timeSelector.value];
  const selectedTask = randomlySelectTask(availableTasks);

  rolledTask.innerText = selectedTask;
};

buttonRoll.addEventListener('click', roll);
buttonRoll.addEventListener('mouseup', () => { buttonRoll.blur(); });
