const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// export { getInventoryData, getStoreList };

export async function getInventoryData(store_id) {

    let URL = SERVER_URL + "/Inventory?store_id=" + store_id;

    const response = await fetch(URL);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
    
}

export async function getStoreList() {

    let URL = SERVER_URL + "/store/storeList";
    console.log(URL);

    const response = await fetch(URL);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
    
}


export async function getStoreData(store_id) {
    let URL = SERVER_URL + "/Store?store_id=" + store_id;

    const response = await fetch(URL);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
    
}


export async function getMenuItemList(store_id) {

    let URL = SERVER_URL + "/menu?store_id=" + store_id;
    console.log(URL);

    const response = await fetch(URL);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response);
    
}


// export async function deleteInventoryItem(store_id, item_name) {
//     let URL = SERVER_URL + "/menu/deleteItem"
//     console.log(URL);

//     const body = {
//         store_id: store_id,
//         item_name: item_name
//     }    

//     const fetchData = {
//         method: 'DELETE',
//         body: JSON.stringify(body),
//         headers: new Headers({
//             'Content-Type': 'application/json; charset=UTF-8'
//           })
//     }

//     const response = await fetch(URL, fetchData);
//     if (response.ok) {
//         return response.json();
//     }
//     return Promise.reject(response);
// };