const api_key = "1eb650d9dd204edba0e8a861f2f158f4";
let newsList = [];
const apiUrls = [
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`,
  `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`,
  `https://newsapijerrykim.netlify.app/top-headlines`,
];
const apiUrl = apiUrls[2];

const menus = document.querySelectorAll(".menus button");
console.log(menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getNews = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      if (data.articles.length < 1) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;

      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  const url = new URL(apiUrl);

  getNews(url);
};
const getNewsByKeyWord = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log(keyword);
  const url = new URL(`${apiUrl}?q=${keyword}`);

  getNews(url);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(`${apiUrl}?category=${category}`);

  getNews(url);
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

getLatestNews();
