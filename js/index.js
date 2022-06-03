// Variables globales au script
let rootURL = "http://localhost:8000/api/v1/titles"
let urlBestFilm = rootURL + "?sort_by=imdb_score"
let urlCategory1 = "http://localhost:8000/api/v1/titles?genre=thriller&sort_by=imdb_score"
let urlCategory2 = "http://localhost:8000/api/v1/titles?genre=animation&sort_by=imdb_score"
let urlCategory3 = "http://localhost:8000/api/v1/titles?genre=music&sort_by=imdb_score"
let bestFilmTitle = document.getElementById('best-film-title')
let bestFilmImage = document.getElementById('film-image')
let bestFilmDescription = document.getElementById('film-description')
let playButton = document.getElementById('play-button')
let filmThumbnail = document.getElementsByClassName('film-thumbnail')
let bestFilms = document.getElementsByClassName('best-films')
let previousBestFilms = document.getElementById('previous-best-films')
let nextBestFilms = document.getElementById('next-best-films')
let category1Films = document.getElementsByClassName('category1-films')
let previousCategory1Films = document.getElementById('previous-category1-films')
let nextCategory1Films = document.getElementById('next-category1-films')
let category2Films = document.getElementsByClassName('category2-films')
let previousCategory2Films = document.getElementById('previous-category2-films')
let nextCategory2Films = document.getElementById('next-category2-films')
let category3Films = document.getElementsByClassName('category3-films')
let previousCategory3Films = document.getElementById('previous-category3-films')
let nextCategory3Films = document.getElementById('next-category3-films')

// Gestionnaires d'événements
previousBestFilms.addEventListener('click', async (event) => {
    response = await getPage(urlBestFilm)
    if (response.previous != null) {
        urlBestFilm = response.previous
        response = await getPage(urlBestFilm)
        refreshFilmsScreen(response, bestFilms)
    }
})

nextBestFilms.addEventListener('click', async (event) => {
    response = await getPage(urlBestFilm)
    if (response.next != null) {
        urlBestFilm = response.next
        response = await getPage(urlBestFilm)
        refreshFilmsScreen(response, bestFilms)
    }
})

previousCategory1Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory1)
    if (response.previous != null) {
        urlCategory1= response.previous
        response = await getPage(urlCategory1)
        refreshFilmsScreen(response, category1Films)
    }
})

nextCategory1Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory1)
    if (response.next != null) {
        urlCategory1= response.next
        response = await getPage(urlCategory1)
        refreshFilmsScreen(response, category1Films)
    }
})

previousCategory2Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory2)
    if (response.previous != null) {
        urlCategory2 = response.previous
        response = await getPage(urlCategory2)
        refreshFilmsScreen(response, category2Films)
    }
})

nextCategory2Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory2)
    if (response.next != null) {
        urlCategory2 = response.next
        response = await getPage(urlCategory2)
        refreshFilmsScreen(response, category2Films)
    }
})

previousCategory3Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory3)
    if (response.previous != null) {
        urlCategory3 = response.previous
        response = await getPage(urlCategory3)
        refreshFilmsScreen(response, category3Films)
    }
})

nextCategory3Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory3)
    if (response.next != null) {
        urlCategory3 = response.next
        response = await getPage(urlCategory3)
        refreshFilmsScreen(response, category3Films)
    }
})


async function getPage(url) {
    let results = await fetch(url)
    .then((res) => {
        return res.json()
        .then((value) => {
            return value
        })
    })
    return results
}


async function refreshFilmsScreen(response, components) {
    i = 0
    while (i < 5) {
        components[i].src = response.results[i].image_url
        components[i].alt = response.results[i].title
        i++
    }
}


async function main() {
    // On récupère la première page des films les mieux notés
    listFilms = await getPage(urlBestFilm)

    // On récupère la première page des films de la catégorie 1
    listCategory1Films = await getPage(urlCategory1)

    // On récupère la première page des films de la catégorie 2
    listCategory2Films = await getPage(urlCategory2)

    // On récupère la première page des films de la catégorie 3
    listCategory3Films = await getPage(urlCategory3)

    // On récupère les détail du film le mieux noté
    let urlFilmDetails = rootURL + "/" + listFilms.results[0].id
    details = await getPage(urlFilmDetails)

    // On remplit les composants HTML avec les informations du film le mieux noté
    bestFilmTitle.innerHTML = details.title
    bestFilmDescription.innerHTML = details.description
    bestFilmImage.src = details.image_url
    bestFilmImage.alt = "Image du film " + details.title

    // On actualise la section des films les mieux notés
    await refreshFilmsScreen(listFilms, bestFilms)

    // On actualise la section des films de la catégorie 1
    await refreshFilmsScreen(listCategory1Films, category1Films)

    // On actualise la section des films de la catégorie 2
    await refreshFilmsScreen(listCategory2Films, category2Films)

    // On actualise la section des films de la catégorie 3
    await refreshFilmsScreen(listCategory3Films, category3Films)
}

main()
