(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;




        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        	{
        		headers:{'Authorization': 'Client-ID 2f8dd55983a8084e313a47fbbdee8bb04204c717818973b423e09ac7786083b4'
        }
    }).then(response => response.json())
        .then(addImage)
        .catch(e => requestError(e, 'image'));

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=88a17275c8a0462d8bc49274c6063134`)
        .then(response => response.json())
        .then(addArticles)
        .catch(e => requestError(e,'image'));

function addImage(data) {
	console.log(data);
    let htmlContent = '';
    const firstImage = data.results[0];

    if (firstImage) {
        htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
    } else {
        htmlContent = 'Unfortunately, no image was returned for your search.'
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}


function addArticles(articles) {
	const data = articles;
	console.log(articles);
      responseContainer.insertAdjacentHTML('beforeend', '<ul>' + data.response.docs.map(article =>
                    `<li class="article">
                     <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                     <p>${article.snippet}</p>
                     </li>`
                     ).join('') + '</ul>');
}


function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}

    });
})();
