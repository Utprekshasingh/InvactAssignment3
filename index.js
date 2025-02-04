const express = require('express');
const { resolve } = require('path');
const app = express();

let cors = require('cors');
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

//Endpoint 1
function addToTask(tasks, taskId, text, priority){
  let newTask ={
    taskId: taskId,
    text: text,
    priority: priority
  }
  tasks.push(newTask)
  return tasks
}

app.get("/tasks/add", (req, res) => {
  let taskId= parseInt(req.query.taskId);
  let text= req.query.text;
  let priority= parseInt(req.query.priority);
  let result = addToTask(tasks, taskId, text, priority);
  res.json(result)
})

//Endpoint 2
app.get("/tasks", (req, res) => {
  res.json(tasks)
})

//Endpoint 3
function sortAscendingOrder(task1, task2){
  return task1.priority-task2.priority;
}

app.get("/tasks/sort-by-priority", (req, res) => {
    let tasksCopy = tasks.slice();
    tasksCopy.sort(sortAscendingOrder)
    res.json(tasksCopy)
})

//Endpint 4
function editTaskPriorityById(taskId, priority){
 for(let i=0; i<tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].priority = priority;
    }
 }
 return tasks
}

app.get("/tasks/edit-priority", (req, res) => {
  let taskId= parseInt(req.query.taskId);
  let priority= parseInt(req.query.priority);
  let result = editTaskPriorityById(taskId, priority);
  res.json(result)
})

//Endpoint 5
function editTaskTextById(taskId, text){
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].text = text;
    }
  }
  return tasks
}

app.get("/tasks/edit-text", (req, res) => {
  let taskId= parseInt(req.query.taskId);
  let text= req.query.text;
  let result = editTaskTextById(taskId, text);
  res.json(result)
})

//Endpoint 6
function deleteTaskById(task, taskId){
  return task.taskId!= taskId
}

app.get("/tasks/delete", (req, res) => {
  let taskId= parseInt(req.query.taskId);
  let result = tasks.filter(task => deleteTaskById(task, taskId));
  res.json(result)
})

//Endpoint 7
function filterTaskByPriority(task, priority){
  return task.priority === priority
}

app.get("/tasks/filter-by-priority", (req, res) => {
  let priority= parseInt(req.query.priority);
  let result = tasks.filter(task => filterTaskByPriority(task, priority));
  res.json(result)
})

const port = 3010;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
