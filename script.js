import { MONTHS, LESSONS } from "./assets.js";

const bodyElement = document.body;
const cardTemplate = document.getElementById("card-template");
const cardsContainer = document.getElementById("cards-container");
const searchBoardEl = document.getElementById("search-board");
const searchInput = document.getElementById("search-input");
const searchCtrlBoard = document.getElementById("search-ctrl");
const matchedCharsCountEl = document.getElementById("matched-chars-count");
const matchedCharNthElem = document.getElementById("matched-char-nth");
const createModalEl = document.getElementById("create-modal");
const formCardEl = document.getElementById("form-card");
const newTagInput = document.getElementById("new-tag");

// ------- Buttons ------
const createModalBtn = document.getElementById("create-modal-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
const searchCloseBtn = document.getElementById("search-close-btn");
const showPrevSearchResultBtn = document.getElementById("showPrevSearchResult");
const showNextSearchResultBtn = document.getElementById("showNextSearchResult");
const scrollTopBtn = document.getElementById("scroll-top-btn");
const newTagBtn = document.getElementById("new-tag-btn");
const newTagWrapper = document.getElementById("new-tag-wrapper");
const cancelEditTagBtn = document.getElementById("cancel-edit-tags");

let currentMatchIndex = 0;
let prevMatchIndex = null;
const matchedLessonsIndices = [];

// selectRandomCard();

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

function selectRandomCard() {
  const currentRandomNum = JSON.parse(localStorage.getItem("currentRandomNum"));

  do {
    var randomNum = Math.trunc(Math.random() * lessons.length);
  } while (randomNum === currentRandomNum);

  LESSONS[randomNum].isSelected = true;
  localStorage.setItem("currentRandomNum", JSON.stringify(randomNum));
}

renderCards();

function renderCards() {
  let selectedCard;
  LESSONS.forEach((lesson) => {
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardElement = cardClone.querySelector(".card");

    const titleAnchor = cardElement.querySelector(".card__title--anchor");

    const cardContent = cardElement.querySelector(".card__content");
    const cardLink = cardElement.querySelector(".card__link");
    const cardTag = cardElement.querySelector(".card__tag");
    const lastSeenDate = cardElement.querySelector("#lastSeenDate");

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

    cardsContainer.append(cardElement);
  });

  selectedCard?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

searchInput.addEventListener("keydown", (e) => searchByLesson(e));
function searchByLesson(e) {
  const searchTxt = searchInput.value.toLowerCase();

  if (e.key === "Enter") {
    // remove highlights from pervious search result
    if (matchedLessonsIndices.length) {
      // Remove highlights for prev. search matches
      const lastMatchedEl = cardsContainer.children[
        matchedLessonsIndices[currentMatchIndex]
      ].querySelector(".card__title--anchor");
      lastMatchedEl.classList.remove("highlighted");
    }

    matchedLessonsIndices.length = 0;
    if (searchTxt) {
      LESSONS.forEach((lesson, index) => {
        if (lesson.lessonName.toLowerCase().includes(searchTxt)) {
          matchedLessonsIndices.push(index);
        }
      });

      searchCtrlBoard.classList.remove("hidden");
    }

    showMatchedLesson();
  }
}

function showMatchedLesson() {
  if (prevMatchIndex !== null && matchedLessonsIndices.length) {
    const prevMatch = cardsContainer.children[
      matchedLessonsIndices[prevMatchIndex]
    ].querySelector(".card__title--anchor");
    prevMatch.classList.remove("highlighted");
  }

  if (matchedLessonsIndices.length) {
    const anchorTitle = cardsContainer.children[
      matchedLessonsIndices[currentMatchIndex]
    ].querySelector(".card__title--anchor");

    anchorTitle.classList.add("highlighted");
    anchorTitle.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  matchedCharsCountEl.innerHTML = matchedLessonsIndices.length;
  matchedCharNthElem.innerHTML = matchedLessonsIndices.length
    ? currentMatchIndex + 1
    : 0;
}

formCardEl.onclick = function (e) {
  e.stopPropagation();
};

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----- Button events -----
searchCloseBtn.onclick = closeSearchResult;

function closeSearchResult() {
  searchCtrlBoard.classList.add("hidden");
  searchInput.value = "";
  const currentMatch = cardsContainer.children[
    matchedLessonsIndices[currentMatchIndex]
  ].querySelector(".card__title--anchor");
  currentMatch.classList.remove("highlighted");
}

showPrevSearchResultBtn.addEventListener("click", () => {
  showPrevMatch();
});

function showPrevMatch() {
  prevMatchIndex = currentMatchIndex;

  if (currentMatchIndex === 0) {
    currentMatchIndex = matchedLessonsIndices.length - 1;
  } else {
    currentMatchIndex--;
  }

  showMatchedLesson();
}

showNextSearchResultBtn.addEventListener("click", () => {
  showNextMatch();
});

function showNextMatch() {
  prevMatchIndex = currentMatchIndex;

  if (currentMatchIndex === matchedLessonsIndices.length - 1) {
    currentMatchIndex = 0;
  } else {
    currentMatchIndex++;
  }
  showMatchedLesson();
}

createModalEl.addEventListener("click", toggleCreateModal);
createModalBtn.addEventListener("click", toggleCreateModal);
modalCloseBtn.addEventListener("click", toggleCreateModal);

function toggleCreateModal() {
  createModalEl.classList.toggle("visible");
}

newTagInput.addEventListener("click", (e) => {
  e.stopPropagation();
});


cancelEditTagBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  newTagWrapper.classList.remove("edit-tags");
  renderTagsContainer();
});

newTagBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  newTagWrapper.classList.add("edit-tags");
  renderTagsContainer();
});

function renderTagsContainer() {
  if (newTagWrapper.classList.contains("edit-tags")) {
    cancelEditTagBtn.classList.remove("hidden");
    newTagBtn.innerHTML = "<span>&#65291;</span>Add";
  } else {
    newTagBtn.textContent = "Edit tags";
    cancelEditTagBtn.classList.add("hidden");
  }
}
