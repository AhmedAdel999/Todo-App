document.addEventListener("DOMContentLoaded", () => {
  const toggleDarkMode = document.querySelector("#dark-mode-toggle");
  const body = document.querySelector('body');
  const todosElement = document.querySelector('.todos');
  const form = document.querySelector('.add-todo');
  const input = document.querySelector('.input');
  const filterElement = document.querySelector('.filter'); 
  const active = document.querySelector('.active');
  const all = document.querySelector('.all');
  const completed = document.querySelector('.completed');
  const itemsLeft = document.querySelector('.items-left');
  const clearCompletedElement = document.querySelector('.clear-completed')
  let theme = localStorage.getItem("theme");
  let itemsLeftCount = 0;
  let todos = [
    {
      content: "Todo 1",
      completed: false
    },
    {
      content: "Todo 2",
      completed: false
    },
  ];
  
  function disableDarkMode() {
    localStorage.setItem("theme", "light");
    body.classList.remove("dark-mode");
    toggleDarkMode.setAttribute("src", "./images/icon-moon.svg");
  }

  function enableDarkMode() {
    localStorage.setItem("theme", "dark");
    body.classList.add("dark-mode");
    toggleDarkMode.setAttribute("src", "./images/icon-sun.svg");
  }
  
  function appendTodo(todo, completed) {
    todosElement.innerHTML += `
    <li class="card-item ${completed ? 'completed-todo' : ''}">
    <div class="icon">
      <div></div>
    </div>
    ${todo}
    </li>
    `;
  }

  function filter(value) {
    todosElement.innerText = '';
    if (value === 'completed') {
      todos.forEach((todo) => {
        if (todo.completed) {
          appendTodo(todo.content, todo.completed);
        }
      });
    } else {
      todos.forEach((todo) => {
        if (!todo.completed) {
          appendTodo(todo.content, todo.completed);
        }
      });
    }
  }

  function showTodos() {
    itemsLeftCount = 0;
    todosElement.innerText = '';
    todos.forEach((todo) => {
      if (!todo.completed) {
        itemsLeftCount++;
      }
      appendTodo(todo.content, todo.completed);
    });
  }

  function showItemsLeft() {
    let string = '';
    if (itemsLeftCount <= 1) {
      string = itemsLeftCount + ' Item left';
    } else {
      string = itemsLeftCount + ' Items left';
    }
    itemsLeft.innerText = string;
  }

  function clearCompleted() {
    let newTodos = [];
    todos.forEach((todo, index) => {
      if (!todo.completed) {
        newTodos.push(todo);
      }
    });
    todos = newTodos;
  }
  
  showTodos();
  showItemsLeft();

  filterElement.addEventListener('click', (e) => {
    if (e.target.innerText === 'All') {
      active.classList.remove('active-filter');
      completed.classList.remove('active-filter');
      showTodos();
    } else if (e.target.innerText === 'Completed') {
      all.classList.remove('active-filter');
      active.classList.remove('active-filter');
      filter('completed');
    } else if (e.target.innerText === 'Active') {
      all.classList.remove('active-filter');
      completed.classList.remove('active-filter');
      filter('active');
    }
    e.target.classList.add('active-filter');
  });

   form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === '') return;
    todos.push({
      content: input.value,
      completed: false
    });
    appendTodo(input.value, false);
    itemsLeftCount++;
    showItemsLeft();
    input.value = '';
  });

  todosElement.addEventListener('click', (e) => {
    e.target.classList.toggle('completed-todo');
    todos.forEach((todo) => {
      if (todo.content === e.target.innerText) {
        if (todo.completed) {
          itemsLeftCount++;
          showItemsLeft();
        } else {
          itemsLeftCount--;
          showItemsLeft();
        }
        todo.completed = !todo.completed;
      }
    });
  });
  if (theme == "dark") {
    enableDarkMode();
  }

  clearCompletedElement.addEventListener('click', () => {
    clearCompleted();
    showTodos();
  })

  toggleDarkMode.addEventListener("click", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      disableDarkMode();
    } else {
      localStorage.setItem("theme", "dark");
      enableDarkMode();
    }
  });
});
