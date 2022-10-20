const cardTemplate = document.getElementById("card-template");
const cardsContainer = document.getElementById("cards-container");
// const searchBoardEl = document.getElementById("search-board");
const searchInput = document.getElementById("search-input");
const searchCtrlBoard = document.getElementById("search-ctrl");
const matchedCharsCountEl = document.getElementById("matched-chars-count");
const matchedCharNthElem = document.getElementById("matched-char-nth");
const searchCloseBtn = document.getElementById("search-close-btn");
const createModalEl = document.getElementById("create-modal");
const createModalBtn = document.getElementById("create-modal-btn");
const formCardEl = document.getElementById("form-card");
const modalCloseBtn = document.getElementById("modal-close-btn");

let matchedCharsCount = 0;
let currentMatchIndex = 0;
let prevMatchIndex = null;
let lastMatchedElemIdx;
const matchedLessonsIndices = [];

const MONTHS_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const lessons = [
  {
    tag: "JavaScript",
    lessonName: "Complete Inspections",
    linkUrl: "https://javascript.info/",
    content:
      "Complete muiniciplity and internal inspection (foundation, framing and QC).",
    createdAt: "28 Dec 2022",
    lastSeenAt: "December 28, 2022",
    isSelected: false,
  },
  {
    tag: "React",
    lessonName: "Introduction to JavaScript",
    linkUrl: "https://javascript.info/",
    content:
      "Complete muiniciplity and internal inspection (foundation, framing and QC).",
    createdAt: "28 Dec 2022",
    lastSeenAt: "28 Dec 2022",
    isSelected: false,
  },
  {
    tag: "React",
    lessonName: "What's TDD?",
    linkUrl: "https://javascript.info/",
    content:
      "Complete muiniciplity and internal inspection (foundation, framing and QC).",
    createdAt: "28 Dec 2022",
    lastSeenAt: "28 Dec 2022",
    isSelected: false,
  },
  {
    tag: "Typescript",
    lessonName: "What's type safe language?",
    linkUrl: "https://javascript.info/",
    content:
      "Complete muiniciplity and internal inspection (foundation, framing and QC).",
    createdAt: "28 Dec 2022",
    lastSeenAt: "28 Dec 2022",
    isSelected: false,
  },
  {
    tag: "CSS",
    lessonName: "What's Tailwind?",
    linkUrl: "https://javascript.info/",
    content:
      "Complete muiniciplity and internal inspection (foundation, framing and QC).",
    createdAt: "28 Dec 2022",
    lastSeenAt: "28 Dec 2022",
    isSelected: false,
  },
];

// selectRandomCard();

function selectRandomCard() {
  const currentRandomNum = JSON.parse(localStorage.getItem("currentRandomNum"));

  do {
    var randomNum = Math.trunc(Math.random() * lessons.length);
  } while (randomNum === currentRandomNum);

  lessons[randomNum].isSelected = true;
  localStorage.setItem("currentRandomNum", JSON.stringify(randomNum));
}

renderCards();

function renderCards() {
  let selectedCard;
  lessons.forEach((lesson) => {
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
      // if there were matches for prev search
      const lastMatchedEl = cardsContainer.children[
        matchedLessonsIndices[currentMatchIndex]
      ].querySelector(".card__title--anchor");
      lastMatchedEl.classList.remove("highlighted");
    }

    matchedLessonsIndices.length = 0;
    if (searchTxt) {
      lessons.forEach((lesson, index) => {
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

searchCloseBtn.onclick = closeSearchResult;

function closeSearchResult() {
  searchCtrlBoard.classList.add("hidden");
  searchInput.value = "";
  const currentMatch = cardsContainer.children[
    matchedLessonsIndices[currentMatchIndex]
  ].querySelector(".card__title--anchor");
  currentMatch.classList.remove("highlighted");
}

function showPrevMatch() {
  prevMatchIndex = currentMatchIndex;

  if (currentMatchIndex === 0) {
    currentMatchIndex = matchedLessonsIndices.length - 1;
  } else {
    currentMatchIndex--;
  }

  showMatchedLesson();
}

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
  // console.log((createModalEl.tabIndex = 5));
}

formCardEl.onclick = function (e) {
  e.stopPropagation();
};
