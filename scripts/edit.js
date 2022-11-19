
    const id = localStorage.getItem('taskToEdit');

    const getData = async () => {
        try {
            let res = await fetch(`http://localhost:3000/all_tasks/${id}`)
            let data = await res.json();
             console.log(id,data)
             document.getElementById('taskName').value = data.title ;
             document.getElementById('taskStatus').checked = data.status ;

        } catch (error) {
            console.log(error)
        }
    }
    getData();

    document.querySelector("#editTask").addEventListener("click", async () => {
        
        let newTask = document.getElementById('taskName').value;
        let newStatus = document.getElementById('taskStatus').checked;

        let newDetails = {
            title: newTask,
            status: newStatus
        }
        console.log(newDetails)
        try {
            let updates = await fetch(`http://localhost:3000/all_tasks/${id}`, {
                method: 'PUT',
                body: JSON.stringify(newDetails),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.href ="./index.html"
        } catch (error) {
            console.log(error)
        }
      });

      document.querySelector("#delTask").addEventListener("click", async () => {

        try {
            let response = await fetch(`http://localhost:3000/all_tasks/${id}`, {
              method: "DELETE",
            });
            window.location.href ="./index.html"
          } catch (error) {
            console.log(error);
          }
      });


   