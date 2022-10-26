const createModalEl = document.getElementById("create-modal");
const createModalBtn = document.getElementById("create-modal-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
const formCardEl = document.getElementById("form-card");
const newTagInput = document.getElementById("new-tag");
const newTagBtn = document.getElementById("new-tag-btn");
const newTagWrapper = document.getElementById("new-tag-wrapper");
const cancelEditTagBtn = document.getElementById("cancel-edit-tags");

createModalEl.addEventListener("click", toggleCreateModal);
createModalBtn.addEventListener("click", toggleCreateModal);
modalCloseBtn.addEventListener("click", toggleCreateModal);

formCardEl.onclick = function (e) {
  e.stopPropagation();
};

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
    newTagInput.focus();
  } else {
    newTagBtn.textContent = "Edit tags";
    cancelEditTagBtn.classList.add("hidden");
  }
}
