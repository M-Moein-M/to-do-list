let taskInput = document.querySelector('.task-input');

document.querySelector('.add-task').addEventListener('click', addTask);


function addTask() {
    let task = taskInput.value;
    taskInput.value = '';
    if (task === '')
        console.log("no task written to the input");
    else
        console.log(task);
}