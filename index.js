'use strict';

const tasks = {
  minutes05: [
    'Meditate for 5 minutes',
    'Do 25 push-ups',
    'Plank for 3 minutes',
    'Read a bookmarked article',
    'Drop a message to your parents',
    'Do a sun-bath',
    'Read one unread email',
    'Prune 1 file out of your Downloads folder',
    'Prune 1 file from your Desktop',
    'Backup saved games',
    'Do a little dance',
    'Ensure the ice-tray is filled',
    'Trim your nails',
    'Wash your face',
  ],
  minutes10: [
    'Meditate for 10 minutes',
    'Do 50 push-ups',
    'Do 25 sit-ups',
    'Journal for 10 minutes',
    'Organize a messy folder on your computer',
    'Clean the dishes',
    'Do a sun-bath',
    'Do 25 squats',
    'Read a bookmarked article',
    'Prune 2 files out of your Downloads folder',
    'Prune 2 files from your Desktop',
    'Take a nice photo',
    'Ensure plants are watered appropriately',
    'Read from a fiction book',
    'Read one unread email',
    'Ensure the electronic gadgets are charged',
    'Clean your camera-roll/screenshots folder',
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
    'Write a letter to your future self',
    'Write a letter to your partner/parents',
    'Write a blog entry',
    'Take a nap',
    'Work on the very-next-action for 1 of the side-projects',
    'Work on an overdue task from your to-do list',
    'Plan for your next date-night',
    'Go for a cycle ride',
    'Ensure all projects are backed-up to git',
    'Take the bike out for some outdoor work',
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

const buttonRoll = document.getElementById('button-roll');
buttonRoll.addEventListener('click', roll);
buttonRoll.addEventListener('mouseup', () => { buttonRoll.blur(); });
