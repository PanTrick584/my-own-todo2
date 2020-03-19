const taskContainer = document.getElementById('task-container');
const submit = document.getElementById('submit');
const listElement = document.getElementById('list-element')
const p = document.getElementById('to-do-task')
const listHandler = document.querySelector('.list-handler')
const checkbox = document.querySelector('input[type="checkbox"]');

// Functions
function addTask() {

    console.log(p.innerHTML)
    if(p.innerHTML === ''){
        p.innerHTML = taskContainer.value;
    }else {
        let newListElement = listElement.cloneNode(true)
        listHandler.insertBefore(newListElement, listElement)
        p.innerHTML = taskContainer.value;
    }
   taskContainer.value = '';

}

function removeTask(){
    // console.log(this.parentElement)
    // this.parentElement.remove();
    // return
    this.parentElement.style.display = 'none'
    return this
}
// Events

submit.addEventListener('click', addTask);

checkbox.addEventListener('click', removeTask);
