const searchForm = document.querySelector("#search-form");
const searchResult = document.querySelector(".search__result");
const searchList = document.querySelector(".main__repositories-list");

function getData(searchText) {
  return fetch(
    `https://api.github.com/search/repositories?q=${searchText}&per_page=5`
  )
    .then((response) => response.json())
    .then((data) => {
      searchResult.innerHTML = "";
      const fragment = document.createDocumentFragment();
      data.items.forEach((item) => {
        const varios = createItemList(item);
        varios.addEventListener("click", (e) => {
          searchForm.value = "";
          searchResult.innerHTML = "";
          repositoriesAdd(item);
        });
        fragment.appendChild(varios);
        searchResult.appendChild(fragment);
      });
    });
}
function repositoriesAdd(obj) {
  const repoBlock = document.createElement("div");
  const repoName = document.createElement("p");
  const repoOwner = document.createElement("p");
  const repoStars = document.createElement("p");
  repoName.innerHTML = `Repository - ${obj.name}`;
  repoOwner.innerHTML = `Name - ${obj.owner.login}`;
  repoStars.innerHTML = `Stars - ${obj.stargazers_count}`;
  searchList.appendChild(repoBlock);
  repoBlock.classList.add("main__repositories-item");
  repoBlock.appendChild(repoName);
  repoBlock.appendChild(repoOwner);
  repoBlock.appendChild(repoStars);
  repoBlock.addEventListener("click", (e) => {
    repoBlock.remove();
  });
}
function createItemList(a) {
  const dataItem = document.createElement("li");
  dataItem.innerText = a.name;
  dataItem.classList.add("selected");
  return dataItem;
}
const debounce = (fn, debounceTime) => {
  let permission;
  return function () {
    clearTimeout(permission);
    permission = setTimeout(() => fn.apply(this, arguments), debounceTime);
  };
};

const debounce1 = debounce(getData, 300);

searchForm.addEventListener("keyup", (e) => {
  if (e.target.value && e.key != "Backspace") {
    debounce1(e.target.value);
  } else {
    searchResult.textContent = "";
  }
});
