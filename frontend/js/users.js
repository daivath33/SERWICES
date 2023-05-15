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
      showUsers(data);
    })
    .catch((error) => console.log(error));
});

fetch(`http://localhost:3000/users/${order}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    showUsers(data);
  })
  .catch((error) => console.log(error));

function showUsers(users) {
  const container = document.querySelector(".container");
  if (document.querySelector(".cards-box")) {
    document.querySelector(".cards-box").remove();
  }
  const usersBox = document.createElement("div");
  usersBox.classList.add("cards-box");
  for (let user of users) {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    const userName = document.createElement("h3");
    userName.textContent = `${user.name} ${user.surname}`;

    const emailBox = document.createElement("div");
    emailBox.classList.add("user-email");
    const emailHeading = document.createElement("p");
    emailHeading.textContent = "Email Address:";
    const userEmail = document.createElement("p");
    userEmail.classList.add("blue-text");
    userEmail.textContent = `${user.email}`;
    emailBox.append(emailHeading, userEmail);

    const membBox = document.createElement("p");
    membBox.classList.add("memb-name");
    const membHeading = document.createElement("p");
    membHeading.textContent = "Membership:";
    const userMemb = document.createElement("p");
    userMemb.classList.add("blue-text");
    userMemb.textContent = `${user.membership.name}`;
    membBox.append(membHeading, userMemb);

    const ipBox = document.createElement("p");
    ipBox.classList.add("user-ip");
    const ipHeading = document.createElement("p");
    ipHeading.textContent = "IP Address:";
    const userIP = document.createElement("p");
    userIP.textContent = `${user.ip}`;
    ipBox.append(ipHeading, userIP);

    userCard.append(userName, emailBox, membBox, ipBox);

    usersBox.append(userCard);
    container.append(usersBox);
  }
}
