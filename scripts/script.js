import { LESSONS } from "./assets.js";

const bodyElement = document.body;
const cardTemplate = document.getElementById("card-template");
const cardsContainer = document.getElementById("cards-container");
const searchBoardEl = document.getElementById("search-board");
const scrollTopBtn = document.getElementById("scroll-top-btn");

renderCards();
function renderCards() {
  let selectedCard;
  LESSONS.forEach((lesson) => {
    const card = createCard(lesson);

    cardsContainer.append(card);
  });

  selectedCard?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function createCard(lesson) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardElement = cardClone.querySelector(".card");

  const titleAnchor = cardElement.querySelector(".card__title--anchor");

  const cardContent = cardElement.querySelector(".card__content");
  const cardLink = cardElement.querySelector(".card__link");
  const cardTag = cardElement.querySelector(".card__tag");
  const lastSeenDate = cardElement.querySelector("#lastSeenDate");

  const accordion = cardElement.querySelector("#accordion");
  accordion.querySelectorAll(".accordion__btn").forEach((btn) => {
    btn.onclick = handleAccordion;
  });

  function handleAccordion() {
    const accordionContent = this.closest(".accordion__item").querySelector(
      ".accordion__content"
    );

    if (this.ariaExpanded === "true") {
      this.setAttribute("aria-expanded", false);
      accordionContent.style.maxHeight = "";
    } else {
      this.setAttribute("aria-expanded", true);
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    }
  }

  titleAnchor.innerHTML = lesson.lessonName;
  titleAnchor.href = "#" + lesson.lessonName.replace(/\s/g, "-");

  cardContent.innerHTML = lesson.content;
  cardLink.href = lesson.linkUrl;
  cardTag.innerHTML = lesson.tag;
  lastSeenDate.innerHTML = lesson.lastSeenAt;

  if (lesson.isSelected) {
    cardElement.classList.add("selected");
    selectedCard = cardElement;
  } else if (cardElement.classList.contains("selected")) {
    cardElement.classList.remove("selected");
  }

  return cardElement;
}

// selectRandomCard();
function selectRandomCard() {
  const currentRandomNum = JSON.parse(localStorage.getItem("currentRandomNum"));

  do {
    var randomNum = Math.trunc(Math.random() * LESSONS.length);
  } while (randomNum === currentRandomNum);

  LESSONS[randomNum].isSelected = true;
  localStorage.setItem("currentRandomNum", JSON.stringify(randomNum));
}

bodyElement.onscroll = handleBodyScroll;
function handleBodyScroll() {
  if (window.scrollY > 65) {
    searchBoardEl.style.boxShadow =
      "0 0.1rem 3rem rgb(0 0 0 / 40%), 0 0 5rem rgb(0 0 0 / 50%)";
  } else {
    searchBoardEl.style.boxShadow = "none";
    searchBoardEl.style.transitionDuration = "0ms";
  }

  scrollTopBtn.classList.toggle("hidden", window.scrollY < 400);
}

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
