const API_KEY = "72ddc290";

async function fetchData(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
        const data = await response.json();
        if (data.Response === "False") {
            alert("Фильм не найден: " + data.Error);
            return null;
        }
        return data;
    } catch (error) {
        console.error("Ошибка при запросе данных:", error);
        alert("Произошла ошибка при запросе данных.");
        return null;
    }
}

document.getElementById('movie-search-button').addEventListener('click', async () => {
    const movieTitleValue = document.getElementById('movie-search-input').value.trim();
    if (!movieTitleValue) {
        alert("Пожалуйста, введите название фильма.");
        return;
    }

    const movie = await fetchData(movieTitleValue);
    if (!movie) return;

    const cardElementTemplate = `
        <div class="card" style="width: 18rem;">
            <img
                src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}"
                class="card-img-top"
                alt="${movie.Title} movie poster"
            />
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Plot}</p>
                
                <button
                    class="btn btn-primary"
                    data-movie-title="${movie.Title}"
                    data-movie-poster="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}"
                    data-movie-plot="${movie.Plot.replace(/'/g, "\\'")}"
                    data-movie-year="${movie.Year}"
                    data-movie-genre="${movie.Genre}"
                    data-movie-actors="${movie.Actors.replace(/'/g, "\\'")}"
                >
                    Подробнее
                </button>
            </div>
        </div>`;

    document.querySelector('.search-results').innerHTML = cardElementTemplate;

    document.querySelector('.btn-primary').addEventListener('click', function () {
        const title = this.getAttribute('data-movie-title');
        const poster = this.getAttribute('data-movie-poster');
        const plot = this.getAttribute('data-movie-plot');
        const year = this.getAttribute('data-movie-year');
        const genre = this.getAttribute('data-movie-genre');
        const actors = this.getAttribute('data-movie-actors');
        showModal(title, poster, plot, year, genre, actors);
    });
});


function showModal(title, poster, plot, year, genre, actors) {
    document.querySelector('#exampleModalLabel').textContent = title;
    document.querySelector('#modalMoviePoster').src = poster;
    document.querySelector('#modalMoviePoster').alt = `${title} movie poster`;
    document.querySelector('#modalMovieYear').textContent = year;
    document.querySelector('#modalMovieGenre').textContent = genre;
    document.querySelector('#modalMovieActors').textContent = actors;
    document.querySelector('#modalMovieDescription').textContent = plot;

    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}