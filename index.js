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
        // Removing element afther click, should remove either JSON element somehow
        const checkbox = document.querySelectorAll('input[type=checkbox]')
        Array.from(checkbox, (el, id) => {
            el.setAttribute('id', id+1);
            console.log(el.id)
    })

        // console.log(checkbox)
        Array.from(checkbox, el=> {
            el.addEventListener('click', (e)=> {
                e.preventDefault()
                el.parentElement.remove() 
                deleteTask(el.id)
            })
            
        });

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
            task: taskContainer.value,
        }),   
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            getTask();

    })
}

function deleteTask(id){

    fetch("http://localhost:3000/tasks/"+id, {
        method:'DELETE',
        headers:{
               'Content-type': "application/json"
        }
        })
         .then((response) => {
            return response.json()
        })
         .then((data) => {
             console.log(data) 
     }).catch(err => console.log(err))
}

// Events

submit.addEventListener('click', addTask);

// GEt task on start of functionality
getTask();
