document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const calendarGrid = document.getElementById('calendar-grid');
  const selectedDateTitle = document.getElementById('selected-date-title');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  // Setup selected date (defaults to today)
  const today = new Date();
  const todayStr = formatYYYYMMDD(today);
  let selectedDate = todayStr;

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  function formatYYYYMMDD(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getDisplayDate(dateStr) {
    if (dateStr === todayStr) return "Today";
    const d = new Date(dateStr + "T00:00:00"); // Append time to avoid timezone offset issues
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Get task intensity for github coloring (0 to 4)
  function getIntensity(count) {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  }

  // Render the GitHub-style Calendar
  function renderCalendar() {
    calendarGrid.innerHTML = '';
    
    // Calculate how many tasks per date
    const taskCounts = {};
    tasks.forEach(t => {
      taskCounts[t.date] = (taskCounts[t.date] || 0) + 1;
    });

    // Generate last 52 weeks of dates
    const daysToRender = 52 * 7;
    const startDate = new Date();
    startDate.setDate(today.getDate() - daysToRender + 1);
    
    // Ensure the calendar starts on a Sunday for proper grid alignment
    while(startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const endDate = new Date(today);

    // Build squares
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = formatYYYYMMDD(currentDate);
      const count = taskCounts[dateStr] || 0;
      const intensity = getIntensity(count);

      const square = document.createElement('div');
      square.className = `calendar-square level-${intensity} ${dateStr === selectedDate ? 'selected' : ''}`;
      square.title = `${dateStr}: ${count} task(s)`;
      square.dataset.date = dateStr;

      square.addEventListener('click', () => {
        selectedDate = dateStr;
        renderCalendar(); // Re-render to update selected border
        renderTodoList();
      });

      calendarGrid.appendChild(square);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // After rendering, ensure the calendar is scrolled to the very right (most recent)
    setTimeout(() => {
      const wrapper = document.querySelector('.calendar-wrapper');
      if (wrapper) {
        wrapper.scrollLeft = wrapper.scrollWidth;
      }
    }, 10);
  }

  function renderTodoList() {
    list.innerHTML = '';
    selectedDateTitle.textContent = getDisplayDate(selectedDate);
    
    const dayTasks = tasks.filter(t => t.date === selectedDate);
    
    if (dayTasks.length === 0) {
      list.innerHTML = '<li style="text-align: center; color: #8c959f; margin-top: 20px;">No tasks for this date.</li>';
      return;
    }

    dayTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `todo-item ${task.completed ? 'completed' : ''}`;
      
      li.innerHTML = `
        <div class="task-content">
          <div class="checkbox"></div>
          <span class="task-text">${escapeHtml(task.text)}</span>
        </div>
        <button class="delete-btn" aria-label="Delete">✕</button>
      `;

      // Toggle completion
      const taskContent = li.querySelector('.task-content');
      taskContent.addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTodoList(); // update strike-through
      });

      // Delete task
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderCalendar(); // update heatmap color
        renderTodoList();
      });

      list.appendChild(li);
    });
  }

  // Initial render
  renderCalendar();
  renderTodoList();

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      tasks.push({
        id: Date.now().toString(),
        text,
        date: selectedDate, // Add task to currently selected date
        completed: false
      });
      saveTasks();
      input.value = '';
      renderCalendar();
      renderTodoList();
    }
  });

  function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }
});
