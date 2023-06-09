const form = document.querySelector('.todo_form');
const input = document.querySelector('.todo_input');
const todo_container=document.querySelector(".todo_container");
let deleteBtns;
let checkboxes;
let editBtns;

const addHTML=(todo)=>{
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    const todoLeft=document.createElement("div");
    todoLeft.classList.add("todo_left");

    const todoCb=document.createElement("input");
    todoCb.type="checkbox";
    todoCb.checked=todo.isCompleted;
    todoCb.classList.add("todo_cb");

    const todoTextSpan =document.createElement("span");
    todoTextSpan.classList.add("todoText");
    todoTextSpan.textContent=todo.text;

    todoLeft.appendChild(todoCb);
    todoLeft.appendChild(todoTextSpan);
    todo.todoLeft = todoLeft;

    const todoRight=document.createElement("div");
    todoRight.classList.add("todo_right");

    const deleteBtn=document.createElement("button");
    deleteBtn.classList.add("todo_delete");
    deleteBtn.textContent="Delete";

    const editBtn=document.createElement("button");
    editBtn.classList.add("todo_edit");
    editBtn.textContent="Edit";

    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);
    todo.todoRight = todoRight;

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);
    
    todo_container.appendChild(todoDiv);

}

const startConf = () => {
    // başlangıç ayarları
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (!todos) {
        localStorage.setItem('todos', JSON.stringify([]));
    }else{
todos.forEach(todo=>{
    addHTML(todo);
});
deleteBtns=document.querySelectorAll(".todo_delete");
checkboxes=document.querySelectorAll(".todo_cb");
editBtns=document.querySelectorAll(".todo_edit");

    }
};

startConf();

const addTodo = (e) => {
    e.preventDefault();
    const todoText = input.value;
    const todo = {
        text: todoText,
        isCompleted: false,
        todoLeft: null,
        todoRight: null
    };
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    addHTML(todo);
    form.reset();
};

const deleteTodo=(e)=>{

 const todo =  e.target.parentElement.parentElement;
 const text = todo.firstChild.children[1].textContent;

 let todos=JSON.parse(localStorage.getItem("todos"));
 todos=todos.filter(td => td.text !=text);
 localStorage.setItem("todos",JSON.stringify(todos));

 todo.remove();

}
const completeTodo=(e)=>{

    const todo =  e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
   
    let todos=JSON.parse(localStorage.getItem("todos"));
    todos.forEach(td=>{
if(td.text===text) td.isCompleted =! td.isCompleted
    });
    localStorage.setItem("todos",JSON.stringify(todos));
   }

   const editTodo=(e)=>{
    const todo =  e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
   
    let todos=JSON.parse(localStorage.getItem("todos"));
    todos=todos.filter(td => td.text !=text);
    localStorage.setItem("todos",JSON.stringify(todos));
   
    todo.remove();
    input.value=text;
   
   }
   
   



form.addEventListener('submit', addTodo);
deleteBtns.forEach(btn=>btn.addEventListener("click",deleteTodo));
checkboxes.forEach(btn=>btn.addEventListener("click",completeTodo));
editBtns.forEach(btn=>btn.addEventListener("click",editTodo));