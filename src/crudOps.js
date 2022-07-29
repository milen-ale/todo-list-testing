export class Store {
  // get todo items from local storage
  static getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];

  // add todo item to local storage
  static addTodo = (todo) => {
    const todos = this.getTodos();
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // update todos in local storage
  static updateTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // update todo index in local storage
  static updateIndex = (todos) => {
    let indexedTodo = [];
    todos.forEach((todo, todoIndex) => {
      todo.index = todoIndex;
      indexedTodo = [...indexedTodo, todo];
    });
    return indexedTodo;
  };

  // remove todo item from local storage
  static deleteTodo = (ind) => {
    const todos = this.getTodos();
    const newTodos = todos.filter((todo) => todo.index !== ind);

    localStorage.setItem('todos', JSON.stringify(this.updateIndex(newTodos)));
  };
}

const displayTodo = () => {
  const listContainer = document.querySelector('.list-container');
  listContainer.innerHTML = '';
  const todos = Store.getTodos();
  todos.forEach(({ description, completed, index }) => {
    const listItem = document.createElement('div');
    listItem.className = `row list-item list-item-${index}`;
    listItem.innerHTML = `
    <button class="check-box" data-ind="${index}">
      <span class="icon-check" data-completed="${completed}"></span>
      <i class="fa-solid fa-check" data-completed="${completed}"></i>
    </button>
    <input class="todo-item" type="text" data-todo="${index}" data-completed="${completed}" value='${description}' />
    <button class="delete" data-del="${index}"<svg class="svg-inline--fa fa-trash-can" 
    aria-hidden="true" focusable="false"
     data-prefix="fas" data-icon="trash-can" role="img" xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"></path></svg></button>
    <svg
      width="25px"
      height="30px"
      class="icon-move"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="#b6b6b8"
      ></path>
    </svg>
  `;
    listContainer.appendChild(listItem);
  });
};

const createTodo = () => {
  // get todo description
  const description = document.querySelector('#new-todo').value;
  if (!description) return;

  // create new todo object
  const todo = {
    description: `${description}`,
    completed: false,
    index: Store.getTodos().length,
  };

  // add new todo to local storage
  Store.addTodo(todo);

  // add new todo to UI
  displayTodo();
};

const editTodos = (todoIndex, description) => {
  const todos = Store.getTodos();
  const todo = todos.find((todo) => todo.index === todoIndex);
  todo.description = description;

  Store.updateTodos(todos);
};

export { displayTodo, createTodo, editTodos };
