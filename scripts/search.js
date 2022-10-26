import { LESSONS } from "./assets.js";

const searchCtrlBoard = document.getElementById("search-ctrl");
const matchedCharsCountEl = document.getElementById("matched-chars-count");
const matchedCharNthElem = document.getElementById("matched-char-nth");
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search-input");

const searchCloseBtn = document.getElementById("search-close-btn");
const showPrevSearchResultBtn = document.getElementById("showPrevSearchResult");
const showNextSearchResultBtn = document.getElementById("showNextSearchResult");

let currentMatchIndex = 0;
let prevMatchIndex = null;
const matchedLessonsIndices = [];

searchInput.addEventListener("keydown", (e) => searchByLesson(e));
function searchByLesson(e) {
  const searchTxt = searchInput.value.toLowerCase();

  if (e.key === "Enter") {
    // remove highlights for pervious search result
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

searchCloseBtn.addEventListener("click", closeSearchResult);
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
