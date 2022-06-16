// Variables globales au script
let rootURL = "http://localhost:8000/api/v1/titles"
let urlStarFilm = rootURL + "?sort_by=-imdb_score&page_size=1"
let urlBestFilm = rootURL + "?sort_by=-imdb_score&page_size=8"
let urlCategory1 = "http://localhost:8000/api/v1/titles?genre=thriller&sort_by=-imdb_score&page_size=7"
let urlCategory2 = "http://localhost:8000/api/v1/titles?genre=animation&sort_by=-imdb_score&page_size=7"
let urlCategory3 = "http://localhost:8000/api/v1/titles?genre=music&sort_by=-imdb_score&page_size=7"
let bestFilmTitle = document.getElementById('best-film-title')
let bestFilmImage = document.getElementById('film-image')
let bestFilmDescription = document.getElementById('film-description')
let bestFilms = document.getElementsByClassName('best-films')
let playButton = document.getElementsByClassName('play-button')
let filmThumbnail = document.getElementsByClassName('film-thumbnail')
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
let modal = document.getElementById('modal')
let closeModalButton = document.getElementById('modal-close-button')
let remainingMovie = null




// Gestionnaires d'événements
playButton[0].addEventListener('click', async (event) => {
    await pushModal(event)
})

closeModalButton.addEventListener('click', (event) => {
    modal.style.display = "none"
})

previousBestFilms.addEventListener('click', async (event) => {
    response = await getPage(urlBestFilm)
    if (response.previous != null) {
        urlBestFilm = response.previous
        response = await getPage(urlBestFilm)
        refreshFilmsScreen(response, bestFilms, 1)
    }
    remainingMovie = response.results[7]
})

nextBestFilms.addEventListener('click', async (event) => {
    response = await getPage(urlBestFilm)
    if (response.next != null) {
        urlBestFilm = response.next
        response = await getPage(urlBestFilm)
        refreshFilmsScreen(response, bestFilms, 0)
    }
    remainingMovie = response.results[7]
})

previousCategory1Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory1)
    if (response.previous != null) {
        urlCategory1= response.previous
        response = await getPage(urlCategory1)
        refreshFilmsScreen(response, category1Films, 0)
    }
})

nextCategory1Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory1)
    if (response.next != null) {
        urlCategory1= response.next
        response = await getPage(urlCategory1)
        refreshFilmsScreen(response, category1Films, 0)
    }
})

previousCategory2Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory2)
    if (response.previous != null) {
        urlCategory2 = response.previous
        response = await getPage(urlCategory2)
        refreshFilmsScreen(response, category2Films, 0)
    }
})

nextCategory2Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory2)
    if (response.next != null) {
        urlCategory2 = response.next
        response = await getPage(urlCategory2)
        refreshFilmsScreen(response, category2Films, 0)
    }
})

previousCategory3Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory3)
    if (response.previous != null) {
        urlCategory3 = response.previous
        response = await getPage(urlCategory3)
        refreshFilmsScreen(response, category3Films, 0)
    }
})

nextCategory3Films.addEventListener('click', async (event) => {
    response = await getPage(urlCategory3)
    if (response.next != null) {
        urlCategory3 = response.next
        response = await getPage(urlCategory3)
        refreshFilmsScreen(response, category3Films, 0)
    }
})




// Fonctions utilitaires
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

async function refreshFilmsScreen(response, components, begin) {
    i = 0

    if ((response.length == 8) && (response.previous != null)) {
        components[i].id = remainingMovie.id
        components[i].src = remainingMovie.image_url
        components[i].alt = remainingMovie.title
        i = 1
    }

    while (i < 7) {
        components[i].id = response.results[begin].id
        components[i].src = response.results[begin].image_url
        components[i].alt = response.results[begin].title
        i++
        begin++
    }
}

async function pushModal(event) {
    let url = "http://localhost:8000/api/v1/titles/" + event.target.id
    let modalTitle = document.getElementById('modal-title')
    let modalImage = document.getElementById('modal-image')
    let modalDuration = document.getElementById('modal-duration')
    let modalDatePublished = document.getElementById('modal-date-published')
    let modalRated = document.getElementById('modal-rated')
    let modalImdbScore = document.getElementById('modal-imdb-score')
    let modalMetascore = document.getElementById('modal-metascore')
    let modalCountries = document.getElementById('modal-countries')
    let modalDescription = document.getElementById('modal-description')
    let modalGenres = document.getElementById('modal-genres')
    let modalDirectors = document.getElementById('modal-directors')
    let modalActors = document.getElementById('modal-actors')

    details = await getPage(url)
    modalTitle.innerHTML = details.title
    modalImage.src = details.image_url
    modalImage.alt = details.title
    modalDatePublished.innerHTML = "Date de sortie : " + details.date_published
    modalDuration.innerHTML = "Durée : " + details.duration + " Minutes"

    if ((details.rated == "Not rated or unkown rating") || (details.rated == null))
        modalRated.innerHTML = "Note : Indisponible"
    else
        modalRated.innerHTML = "Note : " + details.rated
    
    modalImdbScore.innerHTML = "Score IMDB : " + details.imdb_score
    modalCountries.innerHTML = "Pays d'origine : " + details.countries

    if (details.metascore != null)
        modalMetascore.innerHTML = "Score au Box-Office : " + details.metascore
    else
        modalMetascore.innerHTML = "Score au Box-Office : Indisponible"

    if ((details.long_description == null) || (details.long_description == "|"))
        modalDescription.innerHTML = "Résumé Indisponilbe"
    else
        modalDescription.innerHTML = details.long_description    
    
    modalGenres.innerHTML = ""
    for (genre of details.genres) {
        modalGenres.innerHTML += "<li>" + genre + "</li>"
    }

    modalDirectors.innerHTML = ""
    for (director of details.directors) {
        modalDirectors.innerHTML += "<li>" + director + "</li>"
    }

    modalActors.innerHTML = ""
    for (actor of details.actors) {
        modalActors.innerHTML += "<li>" + actor + "</li>"
    }
    modal.style.display = "block"
}


function createEventListeners() {
    for (bestFilm of bestFilms) {
        bestFilm.addEventListener('click', async (event) => {
            pushModal(event)
        })
    }
    for (category1Film of category1Films) {
        category1Film.addEventListener('click', async (event) => {
            pushModal(event)
        })
    }
    for (category2Film of category2Films) {
        category2Film.addEventListener('click', async (event) => {
            pushModal(event)
        })
    }
    for (category3Film of category3Films) {
        category3Film.addEventListener('click', async (event) => {
            pushModal(event)
        })
    }
}




// Point d'entrée du script
(async function main() {
    createEventListeners()

    // On récupère le film le mieux noté
    startFilm = await getPage(urlStarFilm)
    
    // On récupère la première page des films les mieux notés
    listFilms = await getPage(urlBestFilm )

    // On récupère la première page des films de la catégorie 1
    listCategory1Films = await getPage(urlCategory1)

    // On récupère la première page des films de la catégorie 2
    listCategory2Films = await getPage(urlCategory2)

    // On récupère la première page des films de la catégorie 3
    listCategory3Films = await getPage(urlCategory3)

    // On récupère les détail du film le mieux noté
    let urlFilmDetails = rootURL + "/" + startFilm.results[0].id
    details = await getPage(urlFilmDetails)

    // On remplit les composants HTML avec les informations du film le mieux noté
    bestFilmTitle.innerHTML = details.title
    playButton[0].id = details.id
    bestFilmDescription.innerHTML = details.description
    bestFilmImage.src = details.image_url
    bestFilmImage.alt = "Image du film " + details.title

    // On actualise la section des films les mieux notés
    await refreshFilmsScreen(listFilms, bestFilms, 1)
    remainingMovie = listFilms.results[7]

    // On actualise la section des films de la catégorie 1
    await refreshFilmsScreen(listCategory1Films, category1Films, 0)

    // On actualise la section des films de la catégorie 2
    await refreshFilmsScreen(listCategory2Films, category2Films, 0)

    // On actualise la section des films de la catégorie 3
    await refreshFilmsScreen(listCategory3Films, category3Films, 0)
})()
