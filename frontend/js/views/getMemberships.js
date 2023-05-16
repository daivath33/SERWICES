export default function getMemberships(services) {
  const membershipsBox = document.querySelector(".memberships");
  for (let service of services) {
    const membershipCard = document.createElement("div");
    membershipCard.classList.add("card");
    membershipCard.classList.add("membership");

    const cardHeading = document.createElement("div");
    cardHeading.classList.add("card-heading");

    const membershipInfo = document.createElement("div");
    membershipInfo.classList.add("membership-info");

    const membershipPrice = document.createElement("h3");
    membershipPrice.classList.add("membership-price");
    membershipPrice.textContent = `$${service.price}`;

    const membershipName = document.createElement("h3");
    membershipName.classList.add("membership-name");
    membershipName.textContent = `${service.name}`;
    membershipInfo.append(membershipPrice, membershipName);

    const membershipDescription = document.createElement("p");
    membershipDescription.classList.add("membership-description");
    membershipDescription.textContent = `${service.description}`;
    cardHeading.append(membershipInfo, membershipDescription);

    const cardFoot = document.createElement("div");
    cardFoot.classList.add("card-foot");
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid");
    trashIcon.classList.add("fa-trash");
    trashBtn.append(trashIcon);

    trashBtn.addEventListener("click", function () {
      fetch(`http://localhost:3000/memberships/${service._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        location.reload();
      });
    });
    cardFoot.append(trashBtn);
    membershipCard.append(cardHeading, cardFoot);
    membershipsBox.append(membershipCard);
  }
}
