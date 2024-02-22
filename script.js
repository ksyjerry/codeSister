const api_key = "1eb650d9dd204edba0e8a861f2f158f4";
let newsList = [];
const apiUrls = [
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`,
  `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`,
  `https://newsapijerrykim.netlify.app/top-headlines`,
];
const apiUrl = apiUrls[2];
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
let url = new URL(apiUrl);

const menus = document.querySelectorAll(".menus button");
console.log(menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getNews = async () => {
  try {
    url.searchParams.set("page",page);
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);

    const data = await response.json();

    if (response.status === 200) {
      if (data.articles.length < 1) {
        throw new Error("No result for this search");
      }

      newsList = data.articles;
      totalResults = data.totalResults;
      console.log("totalResults:" + totalResults);
      console.log(data);

      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(apiUrl);

  getNews();
};
const getNewsByKeyWord = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log(keyword);
  url = new URL(`${apiUrl}?q=${keyword}`);

  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(`${apiUrl}?category=${category}`);

  getNews();
};

const render = () => {
  let newsHTML = "";
  newsList.map((news) => {
    newsHTML += `
        <div class="news">
        <div>

            <img src="${news.urlToImage}" alt="news-image">
            </div>
            <div>

            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>${news.source.name}+${news.publishedAt}</div>
            <a href="${news.url}" target="_blank">Read More</a>
            </div>
        </div>
        `;
    return newsHTML;
  });

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${message}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);
  const totalPages = Math.ceil(totalResults/pageSize);
  let lastPage = pageGroup * groupSize;
  let firstPage = lastPage - (groupSize - 1);
  if (lastPage > totalPages){
    lastPage = totalPages;
    
  }

  if (firstPage<1) {firstPage = 1}  
  

  let paginationHTML = `<li class="page-item ${page===1?'disabled':''}" onClick ="moveToPage(${page-1})"><a class="page-link" >Previous</a></li>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i===page?'active':''}" onClick="moveToPage(${i})"><a class="page-link" >${i}</a></li>`;
  }

  paginationHTML += `<li class="page-item ${page===lastPage?'disabled':''}" onClick ="moveToPage(${page+1})"><a class="page-link" >Next</a></li>`;

  document.querySelector(".pagination").innerHTML = paginationHTML;

};

const moveToPage = (pageNum) => {
console.log(pageNum);
page=pageNum;
getNews();

};

getLatestNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};