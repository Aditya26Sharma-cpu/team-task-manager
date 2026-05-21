const API_URL = "http://team-task-manager-production-ac7c.up.railway.app/api";

let token = "";


// REGISTER USER

async function registerUser() {

  const name =
    document.getElementById("registerName").value;

  const email =
    document.getElementById("registerEmail").value;

  const password =
    document.getElementById("registerPassword").value;

  const role =
    document.getElementById("registerRole").value;


  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    }
  );

  const data = await response.json();

  alert(data.message);
}



// LOGIN USER

async function loginUser() {

  const email =
    document.getElementById("loginEmail").value;

  const password =
    document.getElementById("loginPassword").value;


  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  token = data.token;

  alert("Login Successful");

  fetchProjects();

  fetchTasks();
}



// CREATE PROJECT

async function createProject() {

  const name =
    document.getElementById("projectName").value;

  const description =
    document.getElementById("projectDescription").value;


  const response = await fetch(
    `${API_URL}/projects`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        name,
        description,
      }),
    }
  );

  await response.json();

  alert("Project Created");

  fetchProjects();
}



// FETCH PROJECTS

async function fetchProjects() {

  const response = await fetch(
    `${API_URL}/projects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const projects = await response.json();

  const projectList =
    document.getElementById("projectList");

  projectList.innerHTML = "";


  projects.forEach((project) => {

    const li = document.createElement("li");

    li.className = "list-group-item";

    li.innerHTML = `
      <strong>${project.name}</strong>
      <br/>
      ${project.description}
      <br/>
      <small>Project ID: ${project._id}</small>
    `;

    projectList.appendChild(li);
  });
}



// CREATE TASK

async function createTask() {

  const title =
    document.getElementById("taskTitle").value;

  const description =
    document.getElementById("taskDescription").value;

  const project =
    document.getElementById("taskProjectId").value;

  const dueDate =
    document.getElementById("taskDueDate").value;


  const response = await fetch(
    `${API_URL}/tasks`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        description,
        project,
        dueDate,
      }),
    }
  );

  await response.json();

  alert("Task Created");

  fetchTasks();
}



// FETCH TASKS

async function fetchTasks() {

  const response = await fetch(
    `${API_URL}/tasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const tasks = await response.json();

  const taskList =
    document.getElementById("taskList");

  taskList.innerHTML = "";


  tasks.forEach((task) => {

    const li = document.createElement("li");

    li.className = "list-group-item";

    li.innerHTML = `
      <strong>${task.title}</strong>
      <br/>
      ${task.description}
      <br/>
      Status: ${task.status}
      <br/>
      <small>Project: ${task.project.name || task.project}</small>
    `;

    taskList.appendChild(li);
  });
}