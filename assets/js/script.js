document.addEventListener("DOMContentLoaded", () => {
    const accessKey = "6q2_FGcEsAKclvBSSJH8_8JWubkZTGFQoISV_uUD4yg";

    const searchInputEl = document.getElementById("search-input");
    const searchResultsEl = document.querySelector(".search-results");
    const showMoreButtonEl = document.getElementById("show-more-button");
    const searchButtonEl = document.getElementById("search-button");
    const searchFormEl = document.getElementById("image-search-form"); // Get form

    let inputData = "";
    let page = 1;

    async function searchImages() {
        inputData = searchInputEl.value.trim();
        if (!inputData) return; // Prevent empty searches

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(inputData)}&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResultsEl.innerHTML = "";
        }

        const results = data.results;
        if (results.length === 0) {
            searchResultsEl.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResultsEl.appendChild(imageWrapper);
        });

        page++;

        if (page > 1) {
            showMoreButtonEl.style.display = "block";
        }
    }

    // Handle both button click and Enter key (form submission)
    searchButtonEl.addEventListener("click", () => {
        page = 1;
        searchImages();
    });

    searchFormEl.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from reloading
        page = 1;
        searchImages();
    });

    showMoreButtonEl.addEventListener("click", () => {
        searchImages();
    });
});
