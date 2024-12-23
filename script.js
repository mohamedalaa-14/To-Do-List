const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;
// var taskListArray = [];
// var isLocalDataPresent  = localStorage.getItem("todoTaskList");
// if(isLocalDataPresent !== null) {
//     taskListArray = JSON.parse(isLocalDataPresent);
//     displayCount()
// }
const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};
const addTask = () => {
  const taskName = newTaskInput.value.trim();
  localStorage.setItem("Taskname",taskName)
  localStorage.setItem("count",taskCount)
  alert('task saved!');

  // localStorage.setItem("count",taskCount + 1)
//   var todoObject = {
//     taskId: taskListArray.length + 1,
//     taskName:  taskName
// };
// taskListArray.push(todoObject); 
// localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));

  error.style.display = "none";

  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `
<div class="task">
<input type="checkbox" class="task-check">
<span class="taskname">${localStorage.getItem("Taskname")}</span>
<button class="edit"><i class="fas fa-edit"></i></button>
<button class="delete"><i class="far fa-trash-alt"></i></button>
</div>
`;
var isLocalDataPresent  = localStorage.getItem("Taskname");

if(isLocalDataPresent !== null){
  tasksContainer.insertAdjacentHTML("beforeend", task);
}

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);
      alert('Deleted successfully');
      localStorage.removeItem("Taskname")
      localStorage.removeItem("count")
    };
  });
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;
      if (!(e.target.className == "edit")) {
        targetElement = e.target.parentElement;
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText;
      targetElement.parentNode.remove();
      taskCount -= 1;
      displayCount(taskCount);

    };
  });
  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
      if (checkBox.checked) {
        taskCount -= 1;
        console.log("checked");
      } else {
        taskCount += 1;
      }
      displayCount(taskCount);
    };
  });
  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);
window.onload = () => {
  var isLocalDataPresentcount  = localStorage.getItem("count");
  if(isLocalDataPresentcount !== null){
    taskCount += 1
    displayCount(isLocalDataPresentcount);

  }
  else{
    taskCount = 0
    displayCount(taskCount);

  }
  newTaskInput.value = "";
};
