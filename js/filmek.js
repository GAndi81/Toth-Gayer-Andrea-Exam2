//JSON content elkérése és tartalom megjelenítése

function done(textData) {
    let json = JSON.parse(textData);
    console.log(textData);
    sortByTitle();
    showMovies();
    showCharacters();
    getStatisticData();

}

function xhr(method, url, callWhenReady) {
    let xmlHTTP = new XMLHttpRequest();
    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            callWhenReady(xmlHTTP.responseText)
        }
    }
    xmlHTTP.open(method, url);
    xmlHTTP.send();
}

xhr('GET', '/json/movies.json', done);

// rendezés a filmek Címe alapján

function sortByTitle(textData) {
    textData.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    })
    return textData;
}

//Kategória nevének átalakítása úgy, hogy az első nagybetűs a második kisbetűs

// A title tulajdonság kitiztázása:

function trimCharacterName(str) {
    const changeChars = {
        á: 'a',
        é: 'e',
        í: 'i',
        ó: 'o',
        ú: 'u',
        ö: 'o',
        ő: 'o',
        ü: 'u',
        ű: 'u',
    }
    str = str.toLocaleLowerCase()
        .replace(/[áéíóöőüű]/g, c => changeChars[c])
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/[ -]+/g, '-');
    return str;
}

// Összes film megjelenítése 

function showMovies(textData) {
    for (let i = 0; i < textData.length; i++) {
        const movie = textData[i];
        showMovieMini(movieObject);
    }
}

//egy film div megjelenítése

function showMovieMini(movieObject) {
    let newDiv = document.createElement('div');
    newDiv.class = 'mini-movie';
    document.getElementById('movie').appendChild(newDiv);

    let newImg = document.createElement('img');
    newImg.class = "cover";
    document.getElementById('mini-movie').appendChild(newImg);

    let newTitle = document.createElement('div');
    newTitleDiv.class = 'title';
    document.getElementById('mini-movie').appendChild(newTitleDiv);

    let newTimeInMinutes = document.createElement('div');
    newTimeInMinutes.class = ('timeInMinutes' + 'perc');
    document.getElementById('mini-movie').appendChild(newTimeInMinutes);


    let newPremierYear = document.createElement('div');
    newTimeInMinutes.class = 'premierYear';
    document.getElementById('mini-movie').appendChild(newPremierYear);

    let newCategory = document.createElement('div');
    newCategory.class = 'categories';
    document.getElementById('mini-movie').appendChild(newCategory);

    let newDirectors = document.createElement('div');
    newDirectors.class = (', ' + 'directors' + ', ');
    document.getElementById('mini-movie').appendChild(newDirectors);

    let newCast = document.createElement('div');
    newCast.class = 'cast';
    document.getElementById('mini-movie').appendChild(newCast);
}

// Összes színész adat megjelenítése

function showCharacters(textData) {
    for (let i = 0; i < textData.length; i++) {
        const char = textData[i];
        showCharMini(charObject);
    }
}

// egy színész és adatainak megjelenítése

function showCharMini(charObject) {
    let newcharDiv = document.createElement('div');
    newcharDiv.class = 'characters';
    document.getElementById('movie').appendChild(newcharDiv);

    let newCharImg = document.createElement('img');
    newCharImg.class = "actors";
    document.getElementById('characters').appendChild(newCharImg);

    let newName = document.createElement('div');
    newName.class = 'name';
    document.getElementById('characters').appendChild(newName);

    let birthYear = document.createElement('div');
    birthYear.class = 'birthYear';
    document.getElementById('characters').appendChild(birthYear);

    let birthCountry = document.createElement('div');
    birthCountry.class = 'birthCountry';
    document.getElementById('characters').appendChild(birthCountry);

    let birthCity = document.createElement('div');
    birthCity.class = 'birthCity';
    document.getElementById('characters').appendChild(birthCity);

    // keresések cím, rendező, szereplő szerint

    function searchByTitle() {
        let inputTitle = document.getElementById('search');
        let searchValue = inputTitle.value.toLowerCase();

        for (let i = 0; i < textData.length; i++) {
            if (searchValue && (textData[i].title).toLowerCase().indexOf(searchValue) > -1) {
                showMovieMini(textData, i);
                inputTitle.value = textData[i].title;
                i = textData.length;
            } else {
                let newTitle = document.querySelector('Title');
                newTitle.textContent = 'Nincs ilyen film.';
            }
        }
    }

    function searchByDirector() {
        let inputDir = document.getElementById('search');
        let searchValue = inputDir.value.toLowerCase();

        for (let i = 0; i < textData.length; i++) {
            if (searchValue && (textData[i].directors).toLowerCase().indexOf(searchValue) > -1) {
                showMovieMini(textData, i);
                inputDir.value = textData[i].directors;
                i = textData.length;
            } else {
                let newDir = document.querySelector('Director');
                newDir.textContent = 'Nincs ilyen nevű rendező.';
            }
        }
    }

    function searchByName() {
        let inputName = document.getElementById('Name');
        let searchValue = inputName.value.toLowerCase();

        for (let i = 0; i < textData.length; i++) {
            if (searchValue && (textData[i].name).toLowerCase().indexOf(searchValue) > -1) {
                showCharMini(textData, i);
                inputName.value = textData[i].name;
                i = textData.length;
            } else {
                let newName = document.querySelector('Name');
                newName.textContent = 'Nem szerepel a filmben.';
            }
        }
    }

    //statisztikai adatok megjelenítése

    function getStatisticData(textData) {
        let stat = statistic(textData);
        for (let i in stat) {
            let p = document.createElement('p');
            p.textContent = `${i} : ${stat[i]}`;
            document.body.appendChild(p);
        }
    }


    // Sum függvény  - összes film hossza   
    function sumFilms(textData) {
        let Sum = 0;
        for (let i = 0; i < textData.length; i++) {
            if (textData[i].timeInMinutes) {
                Sum += parseFloat(textData[i].timeInMinutes);
            }
        }
        return Sum.toFixed(2);
    }


    //Avg függvény - összes film hosszának az átlaga

    function AvgFilm(textData) {
        let db = 0;
        let avg;
        for (let i = 0; i < textData.length; i++) {
            if (textData[i].timeInMinutes) {
                timeInMinutes++;
            }
        }
        avg = parseFloat(sumFilms(textData) / timeInMinutes);
        return avg.toFixed(2);
    }

    // az összes színész neve és mellette, hogy hány kategóriában szerepel

    function sumActors(textData) {
        let Sum = 0;
        for (let i = 0; i < textData.length; i++) {
            if (textData[i].name) {
                Sum += parseFloat(textData[i].name);
            }
        }
        return Sum;
    }


    // a filmkategória neve és mellette, hogy hány film tartozik az adott kategóriába


    // az 1990 előttiek törlése és a maradék megjelenítése:
    