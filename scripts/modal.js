import { TAGS } from "./assets.js";

const createModalEl = document.getElementById("create-modal");
const createModalBtn = document.getElementById("create-modal-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
const formWrapperEl = document.getElementById("form-wrapper");
const newTagInput = document.getElementById("new-tag");
const editTagsBtn = document.getElementById("edit-tags-btn");
const newTagWrapper = document.getElementById("new-tag-wrapper");

const cancelEditTagBtn = document.getElementById("cancel-edit-tags");
const tagsSelect = document.getElementById("tags-select");
const tagsContainer = document.getElementById("tags-container");

insertSelectTags();
function insertSelectTags() {
  tagsSelect.innerHTML = null;

  TAGS.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagsSelect.append(option);
  });
}

formWrapperEl.onclick = function (e) {
  e.stopPropagation();
};

createModalEl.addEventListener("click", toggleCreateModal);
createModalBtn.addEventListener("click", toggleCreateModal);
modalCloseBtn.addEventListener("click", toggleCreateModal);

function toggleCreateModal() {
  editTagsBtn.style.transitionDuration = "0ms";
  cancelEditTagBtn.style.transitionDuration = "0ms";
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

editTagsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  newTagWrapper.classList.add("edit-tags");
  renderTagsContainer();
});

function renderTagsContainer() {
  if (newTagWrapper.classList.contains("edit-tags")) {
    cancelEditTagBtn.classList.remove("hidden");
    editTagsBtn.innerHTML = "<span>&#65291;</span>Add";
    newTagInput.focus();

    tagsContainer.classList.remove("hidden");
    appendTags();
  } else {
    editTagsBtn.textContent = "Edit tags";
    cancelEditTagBtn.classList.add("hidden");
    tagsContainer.classList.add("hidden");
  }
}

function appendTags() {
  tagsContainer.innerHTML = null;

  TAGS.forEach((tag) => {
    const button = document.createElement("button");
    button.innerHTML = "&#10005;";
    button.addEventListener("click", (e) => deleteTag(e, tag));

    const div = document.createElement("div");
    div.classList.add("tag-pill");
    div.textContent = tag;
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
