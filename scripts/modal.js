import { TAGS } from "./assets.js";

const $newCardModal = document.getElementById("new-card-modal");
const $newCardBtn = document.getElementById("new-card-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
const formWrapperEl = document.getElementById("form-wrapper");
const $editTagsBtn = document.getElementById("edit-tags-btn");
const newTagWrapper = document.getElementById("new-tag-wrapper");
const createCardBtn = document.getElementById("create-card-btn");

const cancelEditTagBtn = document.getElementById("cancel-edit-tags");
const tagsSelect = document.getElementById("tags-select");
const tagsContainer = document.getElementById("tags-container");

const newTagInput = document.getElementById("new-tag-input");

function addNewTag() {
  const newTagValue = newTagInput.value;
  if (!newTagValue) return;
  if (TAGS.some((tag) => tag.name === newTagValue)) return;

  TAGS.push({ name: newTagValue });
  newTagInput.value = "";
  insertSelectTags();
  renderTagsContainer();
}

insertSelectTags();
function insertSelectTags() {
  tagsSelect.innerHTML = null;

  TAGS.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag.name;
    option.textContent = tag.name;
    tagsSelect.append(option);
  });
}

formWrapperEl.onclick = function (e) {
  e.stopPropagation();
};

$newCardBtn.addEventListener("click", openModal);
$newCardModal.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);

function openModal() {
  $newCardModal.classList.add("visible");
  $newCardModal.focus();
}

function closeModal() {
  $editTagsBtn.style.transitionDuration = "0ms";
  cancelEditTagBtn.style.transitionDuration = "0ms";
  createCardBtn.style.transitionDuration = "0ms";

  $newCardModal.classList.remove("visible");
  $newCardBtn.focus();
}

newTagInput.addEventListener("click", (e) => {
  e.stopPropagation();
});

cancelEditTagBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newTagWrapper.classList.remove("edit-tags");
  renderTagsContainer();
});

$editTagsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (newTagWrapper.classList.contains("edit-tags")) {
    addNewTag();
  } else {
    newTagWrapper.classList.add("edit-tags");
    renderTagsContainer();
  }
});

function renderTagsContainer() {
  if (newTagWrapper.classList.contains("edit-tags")) {
    cancelEditTagBtn.classList.remove("hidden");
    $editTagsBtn.innerHTML = "<span>&#65291;</span>Add";
    newTagInput.focus();

    tagsContainer.classList.remove("hidden");
    appendTags();
  } else {
    $editTagsBtn.textContent = "Edit tags";
    cancelEditTagBtn.classList.add("hidden");
    tagsContainer.classList.add("hidden");
  }
}

function appendTags() {
  tagsContainer.innerHTML = null;

  TAGS.forEach((tag) => {
    const button = document.createElement("button");
    button.innerHTML = "&#10005;";
    button.title = "delete";
    button.addEventListener("click", (e) => deleteTag(e, tag));

    const div = document.createElement("div");
    div.classList.add("tag-pill");
    div.textContent = tag.name;
    div.prepend(button);

    tagsContainer.append(div);
  });
}

function deleteTag(event, tagId) {
  event.preventDefault();

  const filteredTags = TAGS.filter((tag) => tagId !== tag);

  TAGS.length = 0;
  filteredTags.forEach((tag) => {
    TAGS.push(tag);
  });

  insertSelectTags();
  appendTags();
}
