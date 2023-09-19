// Select the form, input, and ul elements using CSS selectors
const formEl = document.querySelector(".form");

const inputEl = document.querySelector(".input");

const ulEl = document.querySelector(".list");

// Load the list from localStorage if it exists
let list = JSON.parse(localStorage.getItem("list"));
// Iterate through each task in the list and display it
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

// Add a submit event listener to the form
formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page
  const newTask = inputEl.value.trim(); // Get the task text and remove leading/trailing whitespace
  if (newTask !== "") {
  toDoList(); // Call the toDoList function to add a new task
  }
});

// Define the toDoList function for adding tasks
function toDoList(task) {
  let newTask = inputEl.value; // Get the task text from the input element
  if (task) {
    newTask = task.name; // If a task object is provided, use its name
  }

  // Create a new list item (li) element
  const liEl = document.createElement("li");

  // Check if the task is already checked (completed)
  if (task && task.checked) {
    liEl.classList.add("checked");  // Add the "checked" class for styling
  }

  // Set the text of the list item to the new task text
  liEl.innerText = newTask;
  // Append the list item to the unordered list (ul)
  ulEl.appendChild(liEl);

  // Clear the input field
  inputEl.value = "";

   // Create a check button element and add it to the list item
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square">
  `;
  liEl.appendChild(checkBtnEl);

  // Create a trash button element and add it to the list item
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  liEl.appendChild(trashBtnEl);

  // Add a click event listener to the check button
  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked"); // Toggle the "checked" class
    updateLocalStorage(); // Update the local storage with the new task status
  });

   // Add a click event listener to the trash button
  trashBtnEl.addEventListener("click", () => {
    liEl.remove(); // Remove the task from the list
    updateLocalStorage();  // Update the local storage after removal
  });

  // Update the local storage with the current task list
  updateLocalStorage();
}

// Function to update the local storage with the current task list
function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}