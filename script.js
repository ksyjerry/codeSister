const api_key = "1eb650d9dd204edba0e8a861f2f158f4";
let newsList = [];
const apiUrls = [
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`,
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`,
    `https://newsapijerrykim.netlify.app`,
  ];

const getLatestNews = async () => {
  const url = new URL(apiUrls[2]);

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log(newsList);
};

renderApiUrls();
document
  .getElementById("api-url-list")
  .addEventListener("change", handleApiUrlChange);

const render = () => {
  let newsHTML = "";
  newsList.map((news) => {
    newsHTML += `
        <div class="news">
            <img src="${news.urlToImage}" alt="news-image">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>${news.source.name}+${news.publishedAt}</div>
            <a href="${news.url}" target="_blank">Read More</a>
        </div>
        `;
    return newsHTML;
  });

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
// render();
