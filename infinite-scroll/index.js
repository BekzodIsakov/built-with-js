const container = document.getElementById("container");
const postCountElem = document.getElementById("posts-count");
const postTotalElem = document.getElementById("posts-total");
const loader = document.getElementById("loader");

const TOTAL_POSTS = 21;
const FETCH_LIMIT = 7;
const pageCount = Math.ceil(TOTAL_POSTS / FETCH_LIMIT);
let currentPage = 1;

let throttlePause = false;

const throttle = (cb, time) => {
  if (throttlePause) return;

  throttlePause = true;

  setTimeout(() => {
    cb();
    throttlePause = false;
  }, time);
};

const fetchPosts = (start, limit) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
  )
    .then((response) => response.json())
    .then((json) => json);
};

const appendPosts = async () => {
  const start = (currentPage - 1) * FETCH_LIMIT;
  const posts = await fetchPosts(start, FETCH_LIMIT);

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "card";

    const titleElement = document.createElement("div");
    titleElement.className = "card-title";
    titleElement.innerHTML = post.title;

    const contentElement = document.createElement("div");
    contentElement.className = "card-content";
    contentElement.innerHTML = post.body;

    card.append(titleElement);
    card.append(contentElement);

    container.append(card);
    postCountElem.innerHTML = FETCH_LIMIT * currentPage;
  });
};

const removeHandlePageScroll = () => {
  loader.remove();
  window.removeEventListener("scroll", handlePageScroll);
};

const handlePageScroll = () => {
  throttle(() => {
    if (currentPage === pageCount) {
      removeHandlePageScroll();
    } else {
      const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

      if (endOfPage) {
        currentPage++;
        appendPosts();
      }
    }
  }, 1000);
};

const render = () => {
  postTotalElem.innerHTML = TOTAL_POSTS;
  postCountElem.innerHTML = 0;

  appendPosts();

  window.addEventListener("scroll", handlePageScroll);
};

window.onload = () => render();
