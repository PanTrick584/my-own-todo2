const taskContainer = document.getElementById('task-container');
const submit = document.getElementById('submit');
const listElement = document.getElementById('list-element')
const p = document.getElementById('to-do-task')
const listHandler = document.querySelector('.list-handler')

const invisibleHandler = document.getElementById('invisible-handler')

// Functions
function addTask() {

    if(taskContainer.value.length > 25){
        taskContainer.value = "TASK TOO LONG!!!"
        setTimeout(()=>{
            taskContainer.value = ""
        }, 3000)
    }else{
        let newListElement = document.createElement('li');
        let newCheckbox = document.createElement('input');
        let newP = document.createElement('p');

        newListElement.className = 'list-element'

        listHandler.insertBefore(newListElement, invisibleHandler)

        newCheckbox.setAttribute('type', 'checkbox');
        newListElement.appendChild(newCheckbox);
        newListElement.appendChild(newP);

        newP.innerText = taskContainer.value;

        taskContainer.value = '';

        const checkbox = document.querySelectorAll('input[type=checkbox]')
        console.log(checkbox);
        checkbox.forEach(el => {
           el.addEventListener('click', ()=> {
               el.parentElement.remove()
           })
        })
    }

}
// Events

submit.addEventListener('click', addTask);

// DATA for tasks
function getTask(){

    fetch('task.json')
    .then(res => res.json())
    .then((data) => data.forEach(el => {
        
        let newListElement = document.createElement('li');
        let newCheckbox = document.createElement('input');
        let newP = document.createElement('p');

        newListElement.className = 'list-element'

        listHandler.insertBefore(newListElement, invisibleHandler)

        newCheckbox.setAttribute('type', 'checkbox');
        newListElement.appendChild(newCheckbox);
        newListElement.appendChild(newP);

        newP.innerText = el.task;

        taskContainer.value = '';

        const checkbox = document.querySelectorAll('input[type=checkbox]')
        console.log(checkbox);
        checkbox.forEach(el => {
           el.addEventListener('click', ()=> {
               el.parentElement.remove()
           })
        })
    }
        ))

}

getTask()

// function postTask(task){


//     const sending = (task) => {
//         fetch('http://localhost:3000/tasks',{
//         method: 'POST',
//         headers:{
//             'Content-type': "application/json"
//         },
//         body: JSON.stringify({
//             task: task
//         }),
//         }
//     )
//     .then(res => console.log(res.text))
//     .then(data => {
//         getTask();
//         console.log(data)})
//     }
//     sending(task)
// }
// postTask()