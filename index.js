const taskContainer = document.getElementById('task-container');
const submit = document.getElementById('submit');
const listElement = document.getElementById('list-element')
const p = document.getElementById('to-do-task')
const listHandler = document.querySelector('.list-handler')

const invisibleHandler = document.getElementById('invisible-handler')

// Functions

function appendElement(taskValue) {

        let newListElement = document.createElement('li');
        let newCheckbox = document.createElement('input');
        let newP = document.createElement('p');

        newListElement.className = 'list-element'

        listHandler.insertBefore(newListElement, invisibleHandler)

        newCheckbox.setAttribute('type', 'checkbox');
        newListElement.appendChild(newCheckbox);
        newListElement.appendChild(newP);

        newP.innerText = taskValue;

        taskContainer.value = '';


        const checkbox = document.querySelectorAll('input[type=checkbox]')
        checkbox.forEach(el => {
           el.addEventListener('click', ()=> {
               el.parentElement.remove()
           })
        })

};

function addTask() {

    if(taskContainer.value.length > 25 ){
        taskContainer.value = "TASK TOO LONG!!!"
        setTimeout(()=>{
            taskContainer.value = ""
        }, 2500)
    }else if(taskContainer.value === ''){
        taskContainer.value = "What's the task? Hmm?"
        setTimeout(()=>{
            taskContainer.value = ""
        }, 2500)
    }else{
        postTask()
        appendElement(taskContainer.value)
    }

}


// DATA for tasks
function getTask(){

    fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then((data) => Array.from(data, el => appendElement(el.task)) )

}

function postTask(){

    fetch("http://localhost:3000/tasks", {
        method:'POST',
        headers:{

            'Content-type': "application/json"
        },
        body: JSON.stringify({
            task: taskContainer.value
        }),   
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // console.log(data)
            getTask();

    })
}


// Events

submit.addEventListener('click', addTask);

getTask();
