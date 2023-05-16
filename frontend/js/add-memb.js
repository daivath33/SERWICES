const membershipsLink = document.querySelector(".memberships-link");
membershipsLink.classList.add("blue-text");
membershipsLink.addEventListener("click", (e) => {
  window.location.href = "./../index.html";
});

const usersLink = document.querySelector(".users-link");
usersLink.addEventListener("click", (e) => {
  window.location.href = "./../html/users.html";
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValue = document.querySelector("#name").value;
  const priceValue = +document.querySelector("#price").value;
  const descriptionValue = document.querySelector("#description").value;

  fetch("http://localhost:3000/memberships", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue,
      price: priceValue,
      description: descriptionValue,
    }),
  }).then(() => {
    location.reload();
    window.location.href = "./../index.html";
  });
});

const cancelBtn = document.querySelector("#cancel");
cancelBtn.addEventListener("click", (e) => {
  window.location.href = "./../index.html";
});
