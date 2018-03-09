//JSON content elkérése és tartalom megjelenítése

function done(textData) {
    let json = JSON.parse(textData);
    console.log(textData);
    sortByTitle();
    showMovies();

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

/*function categoryNameChange () {}*/


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
    newTimeInMinutes.class = 'timeInMinutes';
    document.getElementById('mini-movie').appendChild(newTimeInMinutes);


    let newPremierYear = document.createElement('div');
    newTimeInMinutes.class = 'premierYear';
    document.getElementById('mini-movie').appendChild(newPremierYear);

    let newCategory = document.createElement('div');
    newCategory.class = 'categories';
    document.getElementById('mini-movie').appendChild(newCategory);

    let newDirectors = document.createElement('div');
    newDirectors.class = 'directors';
    document.getElementById('mini-movie').appendChild(newDirectors);

    let newCast = document.createElement('div');
    newCast.class = 'cast';
    document.getElementById('mini-movie').appendChild(newCast);
}

// kép kitisztázása:

function imageAppear(str) {
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

// kép megjelenítése