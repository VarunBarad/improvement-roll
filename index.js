'use strict';

const STORAGE_KEY = 'improvementRollCustomTasks';

const defaultTasks = {
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
    'Organize 1 file from NAS Inbox',
    'Do 5 squats',
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
    'Make your bed',
  ],
  minutes30: [
    'Go for a short walk',
    'Clean the area around you',
    'Read a chapter of a book',
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

const loadCustomTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing custom tasks from localStorage:', e);
      return { minutes05: [], minutes10: [], minutes30: [] };
    }
  }
  return { minutes05: [], minutes10: [], minutes30: [] };
};

const getMergedTasks = (category) => {
  const customTasks = loadCustomTasks();
  const defaultCategoryTasks = defaultTasks[category] || [];
  const customCategoryTasks = customTasks[category] || [];
  return [...defaultCategoryTasks, ...customCategoryTasks];
};

const randomlySelectTask = (tasks) => {
  if (tasks.length === 0) {
    return 'No tasks available for this category.';
  }
  const index = Math.floor(Math.random() * tasks.length);
  return tasks[index];
};

const saveCustomTasks = (customTasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customTasks));
  } catch (e) {
    console.error('Error saving custom tasks to localStorage:', e);
    showCustomizeMessage('Error saving tasks. Please try again.', true);
  }
};

const showCustomizeMessage = (text, isError = false) => {
  const messageEl = document.getElementById('customize-message');
  messageEl.innerText = text;
  messageEl.style.color = isError ? '#f05454' : 'inherit';
  setTimeout(() => {
    messageEl.innerText = '';
  }, 3000);
};

const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

const renderCustomTasks = (category) => {
  const customTasks = loadCustomTasks();
  const tasks = customTasks[category] || [];
  const listEl = document.getElementById('custom-tasks-list');
  
  if (tasks.length === 0) {
    listEl.innerHTML = '<p style="text-align: center; margin-top: 16px;">No custom tasks for this category yet.</p>';
    return;
  }

  let html = '<ul style="list-style: none; padding: 0; margin-top: 16px;">';
  tasks.forEach((task, index) => {
    html += `
      <li style="display: flex; align-items: center; justify-content: space-between; padding: 8px; margin: 8px 0; border: 1px solid currentColor; border-radius: 4px;">
        <span style="flex: 1; margin-right: 8px;">${escapeHtml(task)}</span>
        <button class="edit-task-btn" data-category="${category}" data-index="${index}" style="margin-right: 4px; padding: 4px 8px; font-size: 0.8rem; width: fit-content;">Edit</button>
        <button class="delete-task-btn" data-category="${category}" data-index="${index}" style="padding: 4px 8px; font-size: 0.8rem; width: fit-content;">Delete</button>
      </li>
    `;
  });
  html += '</ul>';
  listEl.innerHTML = html;

  // Attach event listeners
  document.querySelectorAll('.edit-task-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.target.dataset.category;
      const index = parseInt(e.target.dataset.index);
      editTask(category, index);
    });
  });

  document.querySelectorAll('.delete-task-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.target.dataset.category;
      const index = parseInt(e.target.dataset.index);
      deleteTask(category, index);
    });
  });
};

const addTask = (category, taskText) => {
  if (!taskText || taskText.trim() === '') {
    showCustomizeMessage('Please enter a task.', true);
    return;
  }

  const customTasks = loadCustomTasks();
  if (!customTasks[category]) {
    customTasks[category] = [];
  }
  customTasks[category].push(taskText.trim());
  saveCustomTasks(customTasks);
  renderCustomTasks(category);
  document.getElementById('customize-input-task').value = '';
  showCustomizeMessage('Task added successfully!');
};

const editTask = (category, index) => {
  const customTasks = loadCustomTasks();
  const currentTask = customTasks[category][index];
  const newTask = prompt('Edit task:', currentTask);
  
  if (newTask !== null && newTask.trim() !== '') {
    customTasks[category][index] = newTask.trim();
    saveCustomTasks(customTasks);
    renderCustomTasks(category);
    showCustomizeMessage('Task updated successfully!');
  } else if (newTask !== null && newTask.trim() === '') {
    showCustomizeMessage('Task cannot be empty.', true);
  }
};

const deleteTask = (category, index) => {
  if (confirm('Are you sure you want to delete this task?')) {
    const customTasks = loadCustomTasks();
    customTasks[category].splice(index, 1);
    saveCustomTasks(customTasks);
    renderCustomTasks(category);
    showCustomizeMessage('Task deleted successfully!');
  }
};

// Main roll functionality
const timeSelector = document.getElementById('select-time');
const buttonRoll = document.getElementById('button-roll');
const rolledTask = document.getElementById('rolled-task');

const roll = () => {
  const availableTasks = getMergedTasks(timeSelector.value);
  const selectedTask = randomlySelectTask(availableTasks);

  rolledTask.innerText = selectedTask;
};

buttonRoll.addEventListener('click', roll);
buttonRoll.addEventListener('mouseup', () => { buttonRoll.blur(); });

// Customize functionality
const customizeSection = document.getElementById('customize-section');
const buttonCustomize = document.getElementById('button-customize');
const customizeTimeSelector = document.getElementById('customize-select-time');
const customizeInputTask = document.getElementById('customize-input-task');
const customizeButtonAdd = document.getElementById('customize-button-add');

// Toggle customize section
buttonCustomize.addEventListener('click', () => {
  const isVisible = customizeSection.style.display !== 'none';
  customizeSection.style.display = isVisible ? 'none' : 'block';
  buttonCustomize.innerText = isVisible ? 'Customize Tasks' : 'Hide Customization';
  
  if (!isVisible) {
    // Render tasks when opening
    renderCustomTasks(customizeTimeSelector.value);
  }
});

// Handle category change in customize section
customizeTimeSelector.addEventListener('change', () => {
  renderCustomTasks(customizeTimeSelector.value);
});

// Handle add task
customizeButtonAdd.addEventListener('click', () => {
  addTask(customizeTimeSelector.value, customizeInputTask.value);
});

// Handle Enter key in input field
customizeInputTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask(customizeTimeSelector.value, customizeInputTask.value);
  }
});

customizeButtonAdd.addEventListener('mouseup', () => { customizeButtonAdd.blur(); });
buttonCustomize.addEventListener('mouseup', () => { buttonCustomize.blur(); });
