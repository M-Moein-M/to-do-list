let taskInput = document.querySelector('.task-input');
const allTasksDiv = document.querySelector('.tasks');

let doneTasks;  // this is a sort of boolean mask array for keeping track of tasks that are marked as done. 0 means not done, 1 means done
let allTasksArray;
if (JSON.parse(localStorage.getItem('allTasks')) === null)
    allTasksArray = [];
else
    allTasksArray = JSON.parse(localStorage.getItem('allTasks'));

if (JSON.parse(localStorage.getItem('doneTasks')) === null)
    doneTasks = [];
else
    doneTasks = JSON.parse(localStorage.getItem('doneTasks'));

loadTaskList();
hideAllTaskButtons();  // hide all the task buttons in the beginning and we show them when user hovers the task

document.querySelector('.add-task').addEventListener('click', addTask);
document.querySelector('.task-input').addEventListener('keypress', checkEnterPress);
window.addEventListener('beforeunload', function () {
    localStorage.setItem('allTasks', JSON.stringify(allTasksArray));
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
})
document.querySelector('#edit-modal-save-changes').addEventListener('click', saveTaskChanges);

function checkEnterPress(event) {
    if (event.code == 'Enter')
        addTask();
}

function addTask() {

    let task = taskInput.value;
    taskInput.value = '';  // we make the input box empty
    if (task === '') {
        // console.log("no task written to the input");
    } else if (allTasksArray.includes(task)) {
        let duplicateIndex = allTasksArray.indexOf(task);
        let duplicaateElement = allTasksDiv.children[duplicateIndex];
        duplicaateElement.style.setProperty('border', '3px red solid');
        setTimeout(function () {
            window.alert('Duplicate Task with taks number ' + (duplicateIndex + 1).toString());
            duplicaateElement.style.setProperty('border', '1px #4b4bff solid');
        }, 100);

    } else {  // adding new task to the list
        allTasksArray.splice(allTasksArray.length, 0, task);
        doneTasks.splice(doneTasks.length, 0, 0);  // add 0 to the end of array as it's a 'not done' task
        loadTaskList();
    }

}

function allTaskDivRemoveAllChild() {
    while (allTasksDiv.firstChild) {
        allTasksDiv.removeChild(allTasksDiv.firstChild);
    }
}

function removeTask() {
    let taskIndex = parseInt(this.parentNode.id);
    allTasksArray.splice(taskIndex, 1);
    doneTasks.splice(taskIndex, 1);
    loadTaskList();
}

function ckeckDoneTask() { /// mark a task as done
    this.parentNode.classList.toggle('done-task');
    let doneTaskId = parseInt(this.parentNode.id);
    if (doneTasks[doneTaskId] === 1)
        doneTasks[doneTaskId] = 0;
    else
        doneTasks[doneTaskId] = 1;

}

function moveTaskUp() {
    let taskIndex = parseInt(this.parentNode.id);  // determines task that user wants to move up
    if (taskIndex <= 0) {
        //do nothing beacause user wants to move up the 1st task
    } else {
        swap(taskIndex, taskIndex - 1, allTasksArray);
        swap(taskIndex, taskIndex - 1, doneTasks);
    }
    loadTaskList();
}

function moveTaskDown() {
    let taskIndex = parseInt(this.parentNode.id);  // determines task that user wants to move down
    if (taskIndex >= allTasksArray.length - 1) {
        //do nothing beacause user wants to move down the last task
    } else {
        swap(taskIndex, taskIndex + 1, allTasksArray);
        swap(taskIndex, taskIndex + 1, doneTasks);
    }
    loadTaskList();

}

function openEditModal() {
    let taskIndex = parseInt(this.parentNode.id);  // determines task that user wants to change or edit
    editedTaskIndex = taskIndex;
    document.querySelector('#edit-modal-input').value = allTasksArray[taskIndex];
}

let editedTaskIndex;  // its value set in openEditModal and we use this to see wich task we change
function saveTaskChanges() {
    allTasksArray[editedTaskIndex] = document.querySelector('#edit-modal-input').value;
    loadTaskList();
}

function swap(i, j, array) {  // swaps values in two index of input array
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function hideAllTaskButtons() {
    let allTaskButtons = document.querySelectorAll('.task-button');
    for (let item of allTaskButtons) {
        item.classList.add('hide');
    }
}

function hideTaskButtons() {
    let allTaskButtons = this.children;
    for (let item of allTaskButtons) {
        item.classList.add('hide');
    }
}

function showTaskButtons() {
    let allTaskButtons = this.children;
    for (let item of allTaskButtons) {
        item.classList.remove('hide');
    }
}

function loadTaskList() {  // rebuilds all the elements in html DOM. Maybe not that efficeint but this is what it is :)
    allTaskDivRemoveAllChild();   // we clear all the children of the main division tag(.task)
    for (let i = 0; i < allTasksArray.length; i++) {
        let pElement = document.createElement('p');
        pElement.classList.add('task');
        pElement.innerHTML = (i + 1).toString() + '. ' + allTasksArray[i];
        pElement.id = i.toString();

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-button');
        removeBtn.classList.add('task-button');
        removeBtn.addEventListener('click', removeTask);
        pElement.appendChild(removeBtn);

        let doneBtn = document.createElement('button');
        doneBtn.classList.add('done-button');
        doneBtn.classList.add('task-button');
        doneBtn.addEventListener('click', ckeckDoneTask);
        pElement.appendChild(doneBtn);

        let upBtn = document.createElement('button');
        upBtn.classList.add('up-button');
        upBtn.classList.add('task-button');
        upBtn.addEventListener('click', moveTaskUp);
        pElement.appendChild(upBtn);

        let downBtn = document.createElement('button');
        downBtn.classList.add('down-button');
        downBtn.classList.add('task-button');
        downBtn.addEventListener('click', moveTaskDown);
        pElement.appendChild(downBtn);

        let editBtn = document.createElement('button');
        editBtn.classList.add('edit-button');
        editBtn.classList.add('task-button');
        editBtn.setAttribute('data-toggle', "modal");
        editBtn.setAttribute('data-target', "#edit-modal");
        editBtn.addEventListener("click", openEditModal);
        pElement.appendChild(editBtn);

        pElement.addEventListener('mouseenter', showTaskButtons);
        pElement.addEventListener('mouseleave', hideTaskButtons);
        allTasksDiv.appendChild(pElement);
        if (doneTasks[i] === 1) {
            pElement.classList.add('done-task');
        }

    }
    hideAllTaskButtons();
}
