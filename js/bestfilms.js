// Variables globales au script
let rootURL = "http://localhost:8000/api/v1/titles"
let urlBestFilm = rootURL + "?sort_by=imdb_score"
let bestFilmTitle = document.getElementById('best-film-title')
let bestFilmImage = document.getElementById('film-image')
let bestFilmDescription = document.getElementById('film-description')
let playButton = document.getElementById('play-button')
let filmThumbnail = document.getElementsByClassName('film-thumbnail')
let bestFilms = document.getElementsByClassName('best-films')
let previousBestFilms = document.getElementById('previous-best-films')
let nextBestFilms = document.getElementById('next-best-films')


// Gestionnaires d'événements
previousBestFilms.addEventListener('click', async (event) => {
    response = await getFilms(urlBestFilm)
    if (response.previous != null) {
        urlBestFilm = response.previous
        response = await getFilms(urlBestFilm)
        refreshBestFilms(response)
    }
})


nextBestFilms.addEventListener('click', async (event) => {
    response = await getFilms(urlBestFilm)
    if (response.next != null) {
        urlBestFilm = response.next
        response = await getFilms(urlBestFilm)
        refreshBestFilms(response)
    }
})


async function getFilms(url) {
    let results = await fetch(url)
    .then((res) => {
        return res.json()
        .then((value) => {
            return value
        })
    })
    return results
}


async function refreshBestFilms(response) {
    i = 0
    while (i < 5) {
        bestFilms[i].src = response.results[i].image_url
        bestFilms[i].alt = response.results[i].title
        i++
    }
}


async function main() {
    // On récupère la première page des films les mieux notés
    listFilms = await getFilms(urlBestFilm)

    // On récupère les détail du film le mieux noté
    let urlFilmDetails = rootURL + "/" + listFilms.results[0].id
    details = await getFilms(urlFilmDetails)

    // On remplit les composants HTML avec les informations du film le mieux noté
    bestFilmTitle.innerHTML = details.title
    bestFilmDescription.innerHTML = details.description
    bestFilmImage.src = details.image_url
    bestFilmImage.alt = "Image du film " + details.title

    await refreshBestFilms(listFilms)
}

main()
