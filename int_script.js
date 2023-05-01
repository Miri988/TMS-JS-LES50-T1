/* Сверстать форму с полями пользователя (title, description) и кнопкой “submit”.
При нажатии на submit, данные в виде объекта попадают в массив data и отрисовываются в туду листе.
Сверстать туду лист для отображения данных из массива с данными

При нажатии удалить - удаляете элемент туду листа из массива и перерисовываете туду лист 

При нажатии, должно открываться модальное окно там будут поля title и description со значениями в инпутах.
В инпутах меняешь значения и нажимаешь в модальном окне сохранить, данные сохраняются в массив data, 
модальное окно закрывается и туду лист перересовывается с уже обновлёнными данными.
*/

'use strict';

const todoList = document.querySelector('.todos');
const todoItem = document.querySelector('.todo-item');

let data = [];

const title = document.querySelector('input[name=title]');
const description = document.querySelector('input[name=description]');

const submitBtn = document.querySelector('button[name=submit]');

const showTodo = () => {
  event.preventDefault(); 
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
  event.preventDefault(); 
  
  const todo = {
    id: Date.now(),
    title: title.value,
    description: description.value,
  };

  data.push(todo);

  showTodo();

};

submitBtn.addEventListener('click', addTodo);

const editBtn = document.querySelector('button[name=edit]');

const removeBtn = document.querySelector('button[name=remove]');



const removeTodo = () => {
  event.preventDefault(); 
  if (event.target.classList.contains('delete')) {
    const delTodoId = event.target.closest(".todo-item").id;
    const delIndex = data.findIndex(el => el.id === +delTodoId);
    data.splice(delIndex, 1)
    showTodo();
  }
};

todoList.addEventListener("click", removeTodo);

const editTodo = () => {
  event.preventDefault(); 
  if (event.target.textContent === "Edit") {
    const edTodoId = event.target.closest(".todo-item").id;
    const edIndex = data.findIndex(el => el.id === +edTodoId);

    const modal = document.querySelector('.modal');
    const visMod = modal.classList.add('visible');

    const modalMes = document.querySelector('.message');

    const newTitle = modalMes.querySelector('input[name=new-title]');
    const newDescription = modalMes.querySelector('input[name=new-description]');

    newTitle.value = data[edIndex].title;
    newDescription.value = data[edIndex].description;

    const closeModal = () => {
      const remMod = modal.classList.remove('visible');  

      data.splice(edIndex,1,{'id': +edTodoId, 'title': newTitle.value, 'description': newDescription.value});

      showTodo();
      
    }
    
    const modalBtn = document.querySelector('.modal .button');
    const closeMod = modalBtn.addEventListener('click', closeModal, {once: true});

  }
  
}

todoList.addEventListener("click", editTodo);