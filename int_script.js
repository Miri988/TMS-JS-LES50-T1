/* Сверстать форму с полями пользователя (title, description) и кнопкой “submit”.
При нажатии на submit, данные в виде объекта попадают в массив data и отрисовываются в туду листе.
Сверстать туду лист для отображения данных из массива с данными

При нажатии удалить - удаляете элемент туду листа из массива и перерисовываете туду лист 

При нажатии, должно открываться модальное окно там будут поля title и description со значениями в инпутах.
В инпутах меняешь значения и нажимаешь в модальном окне сохранить, данные сохраняются в массив data, 
модальное окно закрывается и туду лист перересовывается с уже обновлёнными данными.
*/

'use strict';

let data = [];
let editItem = null;

const todoList = document.querySelector('.todos');
const todoItem = document.querySelector('.todo-item');

const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal .button');

const newTitle = document.querySelector('.modal input[name=new-title]');
const newDescription = document.querySelector('.modal input[name=new-description]');

const title = document.querySelector('input[name=title]');
const description = document.querySelector('input[name=description]');

const submitBtn = document.querySelector('button[name=submit]');

const showTodo = () => {
  todoList.innerHTML = "";
  data.forEach((item) => {
    todoList.innerHTML += `
    <div id=${item.id} class="todo-item">
    <p>Title: <span> ${item.title} </span></p>
    <p>Description: <span> ${item.description} </span></p>
    <button class="button edit" name="edit">Edit</button>
    <button class="button delete" name="remove">Delete</button>
    </div>`;
  });
};

const addTodo = () => { 
  const todo = {
    id: Date.now(),
    title: title.value,
    description: description.value,
  };
  data.push(todo);
  showTodo();
};

const removeTodo = (e) => {
  if (e.target.classList.contains('delete')) {
    const delTodoId = e.target.closest(".todo-item").id;
    const delIndex = data.findIndex(el => el.id === +delTodoId);
    data.splice(delIndex, 1)
    showTodo();
  }
};

const editTodo = (e) => {
  if (e.target.textContent === "Edit") {
    const edTodoId = e.target.closest(".todo-item").id;
    editItem = data.find(el => el.id === +edTodoId);
    newTitle.value = editItem.title;
    newDescription.value = editItem.description;
    modal.classList.add('visible');
  }
}

const closeModal = (e) => {
  e.preventDefault();
  editItem.title = newTitle.value;
  editItem.description = newDescription.value;
  modal.classList.remove('visible');
  showTodo(); 
}

submitBtn.addEventListener('click', addTodo);
todoList.addEventListener("click", removeTodo);
todoList.addEventListener("click", editTodo);
modalBtn.addEventListener('click', closeModal);