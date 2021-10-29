'use strict';

const tasks = {
  minutes05: [
    'Meditate for 5 minutes',
    'Do 25 push-ups',
    'Plank for 3 minutes',
    'Read a bookmarked article',
  ],
  minutes10: [
    'Meditate for 10 minutes',
    'Do 50 push-ups',
    'Do 25 sit-ups',
    'Journal for 10 minutes',
    'Organize a messy folder on your computer',
  ],
  minutes30: [
    'Go for a short walk',
    'Clean the area around you',
    'Read a chapter of a book',
    'Practice a musical instrument for 20 minutes',
    'Do a calisthenics workout',
    'Groom yourself',
    'Write a short story',
    'Call a friend/family-member',
  ],
};

const randomlySelectTask = (tasks) => {
  const index = Math.floor(Math.random() * tasks.length);
  return tasks[index];
};

const roll = () => {
  const timeSelector = document.getElementById('select-time');
  const availableTasks = tasks[timeSelector.value];
  const selectedTask = randomlySelectTask(availableTasks);
  
  document.getElementById('rolled-task').innerText = selectedTask;
};

document.getElementById('button-roll').addEventListener('click', roll);
