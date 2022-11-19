document.querySelector("#addNewTask").addEventListener("click", async () => {
  event.preventDefault();

  let title = document.getElementById("newTask").value;
  let status = document.getElementById("checkBox").checked;

  let newTaskDetails = {
    title,
    status,
  };

  try {
    let post = await fetch(`http://localhost:3000/all_tasks`, {
      method: "POST",
      body: JSON.stringify(newTaskDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.log(error);
  }

});


const displayTasks = async () => {

  try {
    let res = await fetch(`http://localhost:3000/all_tasks`);
    let data = await res.json();

    data.forEach((e) => {
      let id = e.id;
      let taskDiv = document.createElement("div");
      taskDiv.innerHTML = e.title;

      if (e.status) {
        taskDiv.setAttribute("style", "color:green");
      } else {
        taskDiv.setAttribute("style", "color:red");
      }
       
      taskDiv.style.cursor = "pointer"

      taskDiv.onclick = async function () {
        try {
          let response = await fetch(`http://localhost:3000/all_tasks/${id}`);
          let data = response.json();

          localStorage.setItem("taskToEdit", JSON.stringify(id));

          window.location.href = "./edit.html";
        } catch (error) {
          console.log(error);
        }
      };
      document.getElementById("toDoList").append(taskDiv);
    });
  } catch (error) {
    console.log(error);
  }
};

displayTasks();
