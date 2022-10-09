const cardTemplate = document.getElementById("card-template");
const cardsContainer = document.getElementById("cards-container");

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

const randomNumber = Math.trunc(Math.random() * lessons.length);
lessons[randomNumber].isSelected = true;

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
    titleAnchor.name = "#" + lesson.lessonName.replace(/\s/g, "-");

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

  selectedCard.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start",
  });
}

renderCards();
