let taskInput = document.querySelector('.task-input');
const allTasksDiv = document.querySelector('.tasks');

let doneTasks;  // this is a sort of boolean mask array for keep track of tasks that are marked as done 0 means not done, 1 means done
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

document.querySelector('.add-task').addEventListener('click', addTask);
document.querySelector('.task-input').addEventListener('keypress', checkEnterPress);
window.addEventListener('beforeunload', function () {
    localStorage.setItem('allTasks', JSON.stringify(allTasksArray));
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
})

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
    let taskIndex = this.parentNode.id;
    allTasksArray.splice(taskIndex, 1);
    doneTasks.splice(taskIndex, 1);
    loadTaskList();
}

function ckeckDoneTask() { /// mark a task as done
    this.parentNode.classList.toggle('done-task');
    let doneTaskId = this.parentNode.id;
    doneTasks[doneTaskId] = 1;
}

function loadTaskList() {
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

        allTasksDiv.appendChild(pElement);

        if (doneTasks[i] === 1){
            pElement.classList.add('done-task');
        }

    }
}
