// const API_KEY = "";
// const API_KEY = "413ebebdfb2443e1aa5a426a2af6f439";
// const url = "https://newsapi.org/v2/everything?q=";


// const API_KEY = "";
const API_KEY = "pub_41374058451432a24eb77e3552c8fb2010e7d";
const url = "https://newsdata.io/api/1/news?apikey=" + API_KEY + "&q=";

window.addEventListener("load", () => fetchNews("India"));


async function fetchNews(query) {

	console.log("fetching news with query : " + query);

	const res = await fetch(`${url}${query}`);
	const data = await res.json();
	console.log(data);
	console.log("Logging from the fetchNews function");
	console.log(data.articles);

	// showContentInCard(data.articles);
}



function showContentInCard(articles) {

	document.getElementById('container-news-card').innerHTML = "";
	console.log("Logging from the bindData function");
	console.log(articles);

	var articleFiltered = [];

	articles.forEach(article => {

		if (!article.urlToImage) {
			console.log("Image is null for article : " + article.title);
			return;
		}
		console.log("Image is not null for article : " + article.title);

		articleFiltered.push(article);

		if (articleFiltered.length == 4) {
			fillNewsCard(articleFiltered);
			articleFiltered = [];
		}

		console.log("Successfully appended is not null for article : " + article.title);
	});

}


// Function to fill the template with article and append it to the DOM
function fillNewsCard(article) {
	// Get the template
	const template = document.querySelector('#template-news-card');

	// Clone the template content
	const clone = document.importNode(template.content, true);

	for (let i = 0; i < 4; i++) {
		fillNthCard(article[i], clone, i);
	}

	document.getElementById('container-news-card').appendChild(clone);
}

// Function to fill the Nth Card with article and append it to the DOM
function fillNthCard(article, clone, i) {

	console.log("The article is ");
	console.log(article);
	// Fill in the data
	const img = clone.querySelector('#news-img-' + i);
	img.src = article.urlToImage;
	img.alt = article.title;

	const title = clone.querySelector('#news-title-' + i + ' a');
	title.textContent = article.title;
	title.href = article.url;

	const desc = clone.querySelector('#news-desc-' + i + ' a');
	desc.textContent = article.description;
	desc.href = article.url;


	const dateNews = new Date(article.publishedAt).toLocaleString("en-US", {
		timeZone: "Asia/Jakarta",
	});

	const date = clone.querySelector('#news-source-' + i);
	date.textContent = `${article.source.name} · ${dateNews}`;
}



function searchViaKeyWord(keyword) {

	if (!keyword)
		return;

	// closeSideCanvas();
	fetchNews(keyword);
}

const searchKeyWord = document.getElementById('search-keyword');
const searchButton = document.getElementById('search-button');



searchButton.addEventListener("click", () => {
	const keyword = searchKeyWord.value;
	console.log("submitted with keyword : " + keyword);
	if (!keyword) return;
	fetchNews(keyword);
	// curSelectedNav?.classList.remove("active");
	// curSelectedNav = null;
});


const canvasWindow = document.getElementById('fh5co-offcanvas');
function closeSideCanvas() {
	console.log("closing side canvas");
	canvasWindow.style.display = 'none';
}


function openSideCanvas() {
	canvasWindow.style.display = 'block';
}
