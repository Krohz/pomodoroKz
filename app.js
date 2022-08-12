//variables
const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

//Eventos
Eventlistener();
function Eventlistener(){
    form.addEventListener("submit", validarForm);
}


//Funciones
function validarForm(e){
    e.preventDefault();
    if (itTask.value !== "") {
        crearTarea(itTask.value);
        itTask.value = "";
        renderTarea();
    }
}

function crearTarea(valor){
    const newTask = {
        id: Date.now(),
        title : valor,
        completed : false,
    }
    tasks.unshift(newTask);
}

function renderTarea(){
    const html = tasks.map(task =>{
        return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Terminado</span>`: `<button class="start-button" data-id="${task.id}">Iniciar</button>` }</div>
                <div class="title">${task.title}</div>
            </div>
        `;
    });

    const taskContainer = document.querySelector("#tasks");
    taskContainer.innerHTML = html.join("");
}