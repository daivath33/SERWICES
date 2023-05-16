export default function getUsers(users) {
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
  }
  container.append(usersBox);
}
