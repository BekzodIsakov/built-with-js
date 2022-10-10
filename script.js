const cardTemplate = document.getElementById("card-template");
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search-input");
const searchCtrlBoard = document.getElementById("search-ctrl");
const matchedCharsTotalElem = document.getElementById("matchedCharsTotal");
const matchedCharNthElem = document.getElementById("matched-char-nth");
const searchCloseBtn = document.getElementById("search-close-btn");

let matchedCharsCount = 0;
let matchedCharNth = 0;

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
  matchedCharsCount = 0;

  if (e.key === "Enter") {
    if (searchTxt) {
      lessons.forEach((lesson) => {
        if (lesson.lessonName.toLowerCase().includes(searchTxt)) {
          matchedCharsCount++;
        }
      });

      searchCtrlBoard.classList.remove("hidden");
    }

    matchedCharsTotalElem.innerHTML = matchedCharsCount;
    matchedCharNth = matchedCharsCount ? 1 : 0;
    matchedCharNthElem.innerHTML = matchedCharNth;
  }
}

searchCloseBtn.onclick = closeSearchResult;

function closeSearchResult() {
  searchCtrlBoard.classList.add("hidden");
  searchInput.value = "";
}
