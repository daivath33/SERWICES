import getMemberships from "./js/views/getMemberships.js";

window.addEventListener("load", () => {
  fetch("http://localhost:3000/memberships")
    .then((res) => res.json())
    .then((data) => getMemberships(data))
    .catch((err) => console.log(err));
});

const membershipsLink = document.querySelector(".memberships-link");
membershipsLink.classList.add("blue-text");

const usersLink = document.querySelector(".users-link");
usersLink.addEventListener("click", (e) => {
  window.location.href = "./html/users.html";
});

const addMembBtn = document.querySelector(".create-membership");
addMembBtn.addEventListener("click", (e) => {
  window.location.href = "./html/add-membership.html";
});
