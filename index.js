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
        // let newCheckbox = document.createElement('input')
        // let newP = document.createElement('p')
        // newListElement.parentNode(newCheckbox)
        // p.innerHTML = taskContainer.value;
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

function removeTask(){


}

// Events

submit.addEventListener('click', addTask);

