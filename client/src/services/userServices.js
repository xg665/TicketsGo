export async function getAllFavs() {

    const response = await fetch('/findfavorite',{
    	method: 'GET'
    });

    return await response.json();
}

export async function createFav(data) {

    const response = await fetch(`/favorite`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

    return await response.json();
}

export async function getEventsByCategory(category,geohash) {

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${category}&size=15&sort=random&geoPoint=${geohash}&apikey=Gk4C8GqAKAmgIgioLBtbfttyF9h7Z5HC`,{
        method: 'GET'
    });

    return await response.json();
}

export async function getEventsByPref(pref){

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationId=${pref}&sort=random&size=6&apikey=Gk4C8GqAKAmgIgioLBtbfttyF9h7Z5HC`,{
        method: 'GET'
    });

    return await response.json();

}

export async function getEventsByPrefRmd(pref){

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${pref}&sort=random&size=6&apikey=Gk4C8GqAKAmgIgioLBtbfttyF9h7Z5HC`,{
        method: 'GET'
    });

    return await response.json();

}

export async function getPersonal() {

    const response = await fetch(`/personal`,{
        method: 'GET'
    });

    return await response.json();
}


export async function getFavs(){

    const response = await fetch(`/getfavs`,{
        method: 'GET',
        headers:{'Accept': 'application/json'}
    });

    return await response.json();
}

export async function getNearby(geohash){

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geohash}&size=10&sort=name%2Casc&apikey=Gk4C8GqAKAmgIgioLBtbfttyF9h7Z5HC`,{
        method: 'GET'
    });

    return await response.json();

}

export async function getPrefs(){

    const response = await fetch(`/getPrefs`,{method: 'GET',headers:{'Accept': 'application/json'}});

    return await response.json();

}