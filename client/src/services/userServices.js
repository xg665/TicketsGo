export async function getAllFavs() {

    const response = await fetch('/findfavorite',{
    	method: 'GET'
    });

    return await response.json();
}

export async function createFav(data) {

	//data = new FormData(data);

    const response = await fetch(`/favorite`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

    return await response.json();
}