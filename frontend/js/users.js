import getUsers from "./views/getUsers.js";
console.log(getUsers);

const membershipsLink = document.querySelector(".memberships-link");
const usersLink = document.querySelector(".users-link");
usersLink.classList.add("blue-text");

membershipsLink.addEventListener("click", (e) => {
  window.location.href = "./../index.html";
});

const addUserBtn = document.querySelector(".create-user");
addUserBtn.addEventListener("click", (e) => {
  window.location.href = "./../html/add-user.html";
});

let order = "desc";
document.querySelector(".togl-order").addEventListener("click", () => {
  order = order === "desc" ? "asc" : "desc";
  console.log(order);

  fetch(`http://localhost:3000/users/${order}`)
    .then((response) => response.json())
    .then((data) => {
      getUsers(data);
    })
    .catch((error) => console.log(error));
});

fetch(`http://localhost:3000/users/${order}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    getUsers(data);
  })
  .catch((error) => console.log(error));
