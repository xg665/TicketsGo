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

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${category}&geoPoint=${geohash}&sort=date%2Casc&apikey=Gk4C8GqAKAmgIgioLBtbfttyF9h7Z5HC`,{
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

