window.addEventListener("load", () => {
  fetch("http://localhost:3000/memberships")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getMemberships(data);
    })
    .catch((err) => console.log(err));
});

const membershipsLink = document.querySelector(".memberships-link");
const usersLink = document.querySelector(".users-link");
usersLink.classList.add("blue-text");
membershipsLink.addEventListener("click", (e) => {
  window.location.href = "./../index.html";
});
usersLink.addEventListener("click", (e) => {
  window.location.href = "./../html/users.html";
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#firstName").value;
  const surnameInput = document.querySelector("#surname").value;

  const emailInput = document.querySelector("#email").value;

  const ipInput = document.querySelector("#ip").value;
  const membInput = document.querySelector("option").value;
  console.log(nameInput, membInput);
  fetch(`http://localhost:3000/users/${membInput}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput,
      surname: surnameInput,
      email: emailInput,
      ip: ipInput,
    }),
  }).then(() => {
    location.reload();
    window.location.href = "./../html/users.html";
  });
});

function getMemberships(memberships) {
  const select = document.querySelector("select");
  for (let membership of memberships) {
    const option = document.createElement("option");
    option.textContent = `${membership.name}`;
    option.value = `${membership._id}`;
    select.append(option);
  }
}
