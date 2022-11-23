import { LESSONS } from "./assets.js";

const cardTemplate = document.getElementById("card-template");
const cardsContainer = document.getElementById("cards-container");
const $searchBoard = document.getElementById("search-board");
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
  const cardTag = cardElement.querySelector(".tag-pill");
  const $lastSeenAt = cardElement.querySelector("#last-seen-date");

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
  $lastSeenAt.innerHTML = lesson.lastSeenAt;

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

let scrollPos = 0;
window.onscroll = handleBodyScroll;
function handleBodyScroll() {
  if (window.scrollY >= 129) {
    // hide the element
    $searchBoard.style.setProperty(
      "--transformBy",
      `-${$searchBoard.offsetHeight}px`
    );
    $searchBoard.style.boxShadow =
      "0 0.1rem 3rem rgb(0 0 0 / 40%), 0 0 5rem rgb(0 0 0 / 50%)";

    // when page scrolls up
    if (document.body.getBoundingClientRect().top > scrollPos) {
      $searchBoard.style.setProperty("--transformBy", "0px");
    }

    scrollPos = document.body.getBoundingClientRect().top;
  } else {
    $searchBoard.style.boxShadow = "";
  }

  scrollTopBtn.classList.toggle("hidden", window.scrollY < 400);
}

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
