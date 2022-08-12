//variables - AC
const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTarea();

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

function crearTarea(value){
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(2),
        title: value,
        completed: false,
    };
    
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

    const startButtons = document.querySelectorAll(".task .start-button");

    startButtons.forEach(button =>{
        button.addEventListener("click", e=>{
            if (!timer) {
                const id = button.getAttribute("data-id");
                startButtonHandler(id);
                button.textContent = "En progreso...";
            }
        });
    });
}

function startButtonHandler(id){
    time = 25*60;
    current = id;
    const taskId = tasks.findIndex((task) => task.id === id);
    document.querySelector("#time #taskName").textContent = tasks[taskId].title;
    renderTime();

    timer = setInterval(()=>{
        timeHandler(id);
    },1000);
}

function timeHandler(id){
    time--;
    renderTime();

    if (time === 0) {
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTarea();
        startBreak();
    }
}

function renderTime(){
    const timeDiv = document.querySelector("#time #value");
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? "0": "" }${minutes}:${seconds < 10 ? "0": "" }${seconds}`;
}

function markCompleted(id){
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}

function startBreak(){
    time = 5*60;
    taskName.textContent = "Break";
    renderTime();

    timerBreak = setInterval(()=>{
        timerBreakHandler();
    },1000)
}

function timerBreakHandler(){
    time--;
    renderTime();

    if (time === 0) {
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = "";
        renderTarea();
    }
}