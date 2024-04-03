// const API_KEY = "";
const API_KEY = "cf0cc64a6b974c66b085a31411e45786";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("DOMContentLoaded", () => fetchNews("India"));


async function fetchNews(query) {

	const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
	const data = await res.json();
	console.log(data);
	console.log("Logging from the fetchNews function");
	console.log(data.articles);

	showContentInCard(data.articles);
}



function showContentInCardOld(articles) {


	console.log("Logging from the bindData function");
	console.log(articles);

	articles.forEach(article => {

		if (!article.urlToImage) {
			console.log("Image is null for article : " + article.title);
			return;
		}

		console.log("Image is not null for article : " + article.title);
		fillNewsCardOld(article);

		console.log("Successfully appended is not null for article : " + article.title);
	});

}



// Function to fill the template with article and append it to the DOM
function fillNewsCardOld(article) {
	// Get the template
	const template = document.querySelector('#template-news-card-new');

	// Clone the template content
	const clone = document.importNode(template.content, true);

	// Fill in the data
	const img = clone.querySelector('#news-img-new');
	img.src = article.urlToImage;
	img.alt = article.title;

	const title = clone.querySelector('#news-title-new a');
	title.textContent = article.title;
	title.href = article.url;

	const desc = clone.querySelector('#news-desc-new a');
	desc.textContent = article.description;
	desc.href = article.url;


	const dateNews = new Date(article.publishedAt).toLocaleString("en-US", {
		timeZone: "Asia/Jakarta",
	});

	const date = clone.querySelector('.fh5co-date');
	date.textContent = `${article.source.name} · ${dateNews}`;;

	document.getElementById('container-news-card').appendChild(clone)


}


function showContentInCard(articles) {


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