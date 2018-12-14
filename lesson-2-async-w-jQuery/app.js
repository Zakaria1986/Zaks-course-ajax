/* eslint-env jquery */

/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

// add image function which gets rendered in html page once returned succesfull
      function addImage(thiscanbenamedanything) {
    const firstImage = thiscanbenamedanything.results[0];
    console.log(firstImage);
    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`
    );
}

function addArticles(articles) {

            const data = articles;
            console.log(data);

               responseContainer.insertAdjacentHTML('beforeend', '<ul>' + data.response.docs.map(article =>
                    `<li class="article">
                     <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                     <p>${article.snippet}</p>
                     </li>`
                     ).join('') + '</ul>');
        }

// makeing jquery ajax request
        $.ajax({
        	url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        	headers:
        	{'Authorization': 'Client-ID 2f8dd55983a8084e313a47fbbdee8bb04204c717818973b423e09ac7786083b4'
        }
        }).done(addImage);

        // Article ajax call

        $.ajax({
        	url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=88a17275c8a0462d8bc49274c6063134`,
        }).done(addArticles)



    });
})();
