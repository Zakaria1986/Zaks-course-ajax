(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

// once the seach button gets sumbitted/click, everything within the fuction will run.
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        //searchedForText = 'hippos'; // Difault value set to hippos


        // Setting up the NMLHttpRequest and gets fired off to fetch image from unsplash and article from new york time
		const unsplashRequest = new XMLHttpRequest();
		unsplashRequest.onload = addImage; // onlaod will call the function addimage
		unsplashRequest.onerror = function(err){
			requestError(err, 'image');
		}
		unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
		unsplashRequest.setRequestHeader('Authorization', 'Client-ID 2f8dd55983a8084e313a47fbbdee8bb04204c717818973b423e09ac7786083b4');
		unsplashRequest.send();

		const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=88a17275c8a0462d8bc49274c6063134`);
        articleRequest.send();
        // Get your own developers key from here:  https://developer.nytimes.com/


// Add image function which get the data from unsplash xmlhttprequest and gets called onload success
 function addImage(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);
          // data as being check to they exist
          if(data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `
              <figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}" />
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
              </figure>
            `;
          } else { // if there is error the following message will show
            htmlContent = `<div class="erorr-no-image">No images found</div>`
          }

          responseContainer.insertAdjacentHTML('afterbegin', htmlContent); // image will show before article
        }


		function addArticles() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            console.log(data);
            if (data && data.response.docs && data.response.docs[0]) {
                htmlContent = '<ul>' + data.response.docs.map(article =>
                    `<li class="article">
                     <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                     <p>${article.snippet}</p>
                     </li>`
                     ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No article available</div>';
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

    });

})();




