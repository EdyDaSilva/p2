// Select the form, input, and ul elements using CSS selectors
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// Load the list from localStorage if it exists
let list = JSON.parse(localStorage.getItem("list")) || [];

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
    toDoList({ name: newTask, checked: false }); // Call the toDoList function to add a new task
    inputEl.value = ""; // Clear the input field after submitting
  } else {
    alert("Please enter a task!"); // Provide feedback if the field is empty
  }
});

// Define the toDoList function for adding tasks
function toDoList(task) {
  const { name, checked } = task;

  // Create a new list item (li) element
  const liEl = document.createElement("li");

  // Check if the task is already checked (completed)
  if (checked) {
    liEl.classList.add("checked"); // Add the "checked" class for styling
  }

  // Set the text of the list item to the new task text
  liEl.innerText = name;

  // Create a check button element and add it to the list item
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  liEl.appendChild(checkBtnEl);

  // Create a trash button element and add it to the list item
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.appendChild(trashBtnEl);

  // Append the list item to the unordered list (ul)
  ulEl.appendChild(liEl);

  // Add a click event listener to the check button
  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked"); // Toggle the "checked" class
    updateLocalStorage(); // Update the local storage with the new task status
  });

  // Add a click event listener to the trash button
  trashBtnEl.addEventListener("click", () => {
    const customConfirm = document.getElementById('custom-confirm');
    const confirmOk = document.getElementById('confirm-ok');
    const confirmCancel = document.getElementById('confirm-cancel');
    
    customConfirm.style.display = 'block';

    confirmOk.onclick = function() {
      customConfirm.style.display = 'none';
      liEl.remove(); // Remove the task from the list
      updateLocalStorage(); // Update the local storage after removal
      alert('Task deleted'); // Replace with actual delete logic
    };

    confirmCancel.onclick = function() {
      customConfirm.style.display = 'none';
    };
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
      name: liEl.childNodes[0].textContent,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}

// Ensure the custom confirmation dialog works correctly
document.addEventListener("DOMContentLoaded", function() {
  const customConfirm = document.getElementById('custom-confirm');
  const confirmOk = document.getElementById('confirm-ok');
  const confirmCancel = document.getElementById('confirm-cancel');
  
  document.querySelectorAll('.fa-trash').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const liEl = this.closest('li'); // Find the closest li element
      customConfirm.style.display = 'block';

      confirmOk.onclick = function() {
        customConfirm.style.display = 'none';
        liEl.remove(); // Remove the task from the list
        updateLocalStorage(); // Update the local storage after removal
        alert('Task deleted'); // Replace with actual delete logic
      };

      confirmCancel.onclick = function() {
        customConfirm.style.display = 'none';
      };
    });
  });
});
