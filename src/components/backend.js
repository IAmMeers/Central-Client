const SERVER_URL = process.env.REACT_APP_SERVER_URL;

async function getInventoryData(store_id) {

    let URL = SERVER_URL + "/Inventory?store_id=" + store_id;

    const response = await fetch(URL);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
    
}

export default getInventoryData;