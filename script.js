const api_key = '2c46288716a18fb7aadcc2a801f3fc6b';
const baseUrl = 'https://api.themoviedb.org';
const urlDetailsMovie = 'https://api.themoviedb.org/3/movie/';
const moviesEl = document.querySelector(".movies");
const modalEl = document.querySelector(".modal");
const imgPath = "https://image.tmdb.org/t/p/w500";
const popularMovies = document.getElementById("popular");
const currentMovies = document.getElementById("current");
const favMovies = document.getElementById("fav");

popularMovies.addEventListener("click", fetchPopularMovies);
currentMovies.addEventListener("click", fetchNowPlayingMovies);

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};
fetch(`${baseUrl}/3/movie/popular?api_key=${api_key}&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {
        console.log(results)
        createMovies(results);

    })
    .catch(err => console.error(err))

function fetchNowPlayingMovies() {
    fetch(`${baseUrl}/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(data => data.results)
        .then(results => {
            console.log(results)
            createMovies(results);

        })
        .catch(err => console.error(err))
}

function fetchPopularMovies() {
    fetch(`${baseUrl}/3/movie/popular?api_key=${api_key}&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(data => data.results)
        .then(results => {
            console.log(results)
            createMovies(results);

        })
        .catch(err => console.error(err))
}


function createMovies(movie) {
    document.querySelector(".movies").innerHTML = "";
    movie.forEach((movie) => {
        const {poster_path, title, vote_average} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
<img
src="${imgPath + poster_path}"
alt="${title}"
/>
<div class="movie-info">
<h3>${title}</h3>
<span class="${getClassByRate(
            vote_average
        )}">${vote_average}</span>
</div>
`;
        movieEl.addEventListener("click", () => openModal(movie.id));
        moviesEl.appendChild(movieEl);
    });


    function getClassByRate(vote) {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 5) {
            return "orange";
        } else {
            return "red";
        }
    }
}

//Modal

function closeModal() {
    modalEl.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
}

async function openModal(id) {
    console.log(id)
    modalEl.classList.add("modal--show");
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };
    fetch(`${urlDetailsMovie}${id}?api_key=${api_key}&language=en-US`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            createOverview(data)
        })
        .catch(err => console.error(err))


    window.addEventListener("click", (e) => {
        if (e.target === modalEl) {
            closeModal();
        }
    })
    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
            closeModal();
        }
    })
}

function createOverview(details) {
    modalEl.innerHTML = `
     <div class="modal__card">
      <img class="modal__movie-backdrop" src="${imgPath + details.poster_path}"alt="${details.title}"/>
      <h2>
        <span class="modal__movie-title">${details.title}</span>
        <span class="modal__movie-release-year"> - ${details.release_date}</span>
      </h2>
      <p>
      ${details.overview}
      </p>
      <button type="button" class="modal__button-close">Close</button>
    </div>`
    const btnClose = document.querySelector(".modal__button-close");
    btnClose.addEventListener("click", () => closeModal());
}





