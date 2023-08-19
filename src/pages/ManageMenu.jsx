import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as fetch from "../components/backend.js";
import axios from "axios";

import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsPlusCircleDotted,
} from "react-icons/bs";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ManageMenu = () => {
  const params = useParams();
  const [store, setStore] = useState([
    {
      Store_name: "",
    },
  ]);

  const [menuData, setMenuData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("current");
  const [filteredMenu, setFilteredMenu] = useState([]);

  //New item form useStates
  const [itemOpen, setItemOpen] = useState(false);
  const [formState, setFormState] = useState({
    Item_name: "",
    Description: "",
    Price: "",
  });
  const [errors, setErrors] = useState("");

  //Edit item row useStates
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isEdit, setEdit] = useState(false);

  // const [showConfirm, setShowConfirm] = useState(false); //TODO: Confirm prompt?

  const updateItem = (item) => {
    const store_id = params.store_id;
    const item_id = item.Item_id;

    console.log("SENDING UPDATE");

    let URL = SERVER_URL + "/Menu/updateMenuItem";
    const body = {
      store_id: store_id,
      item_id: item_id,
    };
    //Add optional fields to body
    if (item.Item_name !== formState.Item_name) {
      body.item_name = formState.Item_name;
    }
    if (item.Description !== formState.Description) {
      body.item_description = formState.Description;
    }
    if (item.Price !== formState.Price) {
      body.item_price = formState.Price;
      body.item_name = formState.Item_name;
      body.item_description = formState.Description;
      handleDeleteItem(item);
    }

    console.log(body);

    axios
      .put(URL, body)
      .then((response) => {
        console.log(response.data);
        //Fetch data again (refresh menu)
        axios(SERVER_URL + "/Menu?store_id=" + params.store_id)
          .then((response) => {
            console.log(response.data);
            setMenuData(response.data["data"]);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.data);
          });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  };

  function handleDeleteItem(item) {
    console.log("Deleting item: " + item.Item_name);

    let URL = SERVER_URL + "/menu/deleteItem";
    const body = {
      store_id: params.store_id,
      item_id: item.Item_id,
    };
    //Delete item from menu
    axios
      .put(URL, body)
      .then((response) => {
        console.log(response.data);
        //Fetch data again (refresh menu)
        axios(SERVER_URL + "/Menu?store_id=" + params.store_id)
          .then((response) => {
            console.log(response.data);
            setMenuData(response.data["data"]);
          })
          .catch((error) => {
            console.log("Error fetching: \n" + error);
            console.log(response);
          });
      })
      .catch((error) => {
        console.log("Error fetching: \n" + error);
        console.log(error.response);
      });
  }

  function handleReviveItem(item) {
    let URL = SERVER_URL + "/menu/reviveItem";
    const body = {
      store_id: params.store_id,
      item_id: item.Item_id,
    };
    //Delete item from menu
    axios
      .put(URL, body)
      .then((response) => {
        console.log(response.data);
        //Fetch data again (refresh menu)
        axios(SERVER_URL + "/Menu?store_id=" + params.store_id)
          .then((response) => {
            console.log(response.data);
            setMenuData(response.data["data"]);
          })
          .catch((error) => {
            console.log("Error fetching: \n" + error);
            console.log(response);
          });
      })
      .catch((error) => {
        console.log("Error fetching: \n" + error);
        console.log(error.response);
      });
  }

  const handleItemSubmit = (e) => {
    e.preventDefault();

    if (rowToEdit === null) {
      if (!validateForm()) return;

      //Add item to menu DB
      let URL = SERVER_URL + "/menu/addMenuItem";
      const body = {
        store_id: params.store_id,
        item_name: formState.Item_name,
        item_price: formState.Price,
        item_description: formState.Description,
      };

      axios
        .post(URL, body)
        .then((response) => {
          console.log(response.data);

          //Fetch data again (refresh menu)
          axios(SERVER_URL + "/Menu?store_id=" + params.store_id)
            .then((response) => {
              console.log(response.data);
              setMenuData(response.data["data"]);
            })
            .catch((error) => {
              console.log("Error fetching:" + error);
            });
        })
        .catch((error) => {
          console.log("Error fetching: \n" + error);
        });

      setItemOpen(false); //Close form
    } else {
      menuData.map((currRow, index) => {
        if (currRow === rowToEdit) {
          console.log(currRow);
          if (validateForm(currRow)) {
            //Update item in menu DB
            updateItem(currRow);
            setItemOpen(false);
          }
        }
      });
    }
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);
    setEdit(true);
    setFormState({
      Item_name: index.Item_name,
      Description: index.Description,
      Price: index.Price,
    });
    setItemOpen(true);
  };

  const validateForm = (item = null) => {
    console.log(item);
    console.log(isEdit);
    console.log(formState);

    //Check if all fields are filled
    if (!formState.Item_name || !formState.Description || !formState.Price) {
      setErrors("Please fill out all fields");
      return false;
    }

    //Check if quantity and threshold are numbers
    if (isNaN(formState.Price)) {
      setErrors("Price needs to be a number");
      return false;
    }
    //Check if price is positive
    if (formState.Price < 0) {
      setErrors("Price cannot be negative.");
      return false;
    }
    //Check if item_name is under 50 characters
    if (formState.Item_name.length > 50) {
      setErrors("Item name must be under 50 characters");
      return false;
    }

    setErrors("");
    return true;
  };

  //Handling form changes
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const listItems = (item) => {
    return (
      <tr key={item.Item_id}>
        <td>{item.Item_name}</td>
        <td>{item.Description}</td>
        <td>{item.Price}</td>
        <td>
          {item.Status === 1 && (
            <span className="actions">
              <BsFillTrashFill onClick={() => handleDeleteItem(item)} />
              <BsFillPencilFill onClick={() => handleEditRow(item)} />
            </span>
          )}
          {item.Status === 0 && (
            <span className="actions">
              <BsPlusCircleDotted onClick={() => handleReviveItem(item)} />
              <BsFillPencilFill onClick={() => handleEditRow(item)} />
            </span>
          )}
        </td>
      </tr>
    );
  };

  /* FETCH THE DATA */
  useEffect(() => {
    //Get menu data
    let URL = SERVER_URL + "/Menu?store_id=" + params.store_id;
    axios(URL)
      .then((response) => {
        //console.log(response.data);
        setMenuData(response.data["data"]);
      })
      .catch((error) => {
        console.log("Error fetching:" + error);
      });

    //Get current store data
    let STORE_URL = SERVER_URL + "/Store?store_id=" + params.store_id;
    axios(STORE_URL)
      .then((response) => {
        //console.log(response.data);
        setStore(response.data["data"]);
        //console.log(store)
      })
      .catch((error) => {
        console.log("Error fetching:" + error);
      });
  }, []);

  /* FILTER THE DATA */
  useEffect(() => {
    // Filter menu based on search query and category
    const searchField = searchQuery;
    const filteredItems = menuData.filter((item) => {
      const matchesQuery = item.Item_name.toLowerCase().includes(
        searchField.toLowerCase()
      );

      if (categoryFilter === "current") {
        return matchesQuery && item.Status === 1;
      } else if (categoryFilter === "old") {
        return matchesQuery && item.Status === 0;
      }

      return false;
    });

    setFilteredMenu(filteredItems);
  }, [searchQuery, categoryFilter, menuData]);

  return (
    <div>
      <div className="inventory-container">
        <section className="store-section">
          <h1>{store[0].Store_name}</h1>
          <h2>Menu</h2>
          <div className="search-container">
            <span>Search Menu: </span>
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filter">
            <span>Category: </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="current">Current Menu items</option>
              <option value="old">Old Menu items</option>
            </select>
          </div>

          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{filteredMenu.map((item) => listItems(item))}</tbody>
          </table>
        </section>
        <button
          className="btn"
          onClick={() => {
            setItemOpen(true);
            setEdit(false);
            setRowToEdit(null);
            setFormState({
              Item_name: "",
              Description: "",
              Price: "",
            });
          }}
        >
          Add
        </button>
      </div>
      {itemOpen && (
        <div
          className="new-item-container"
          onClick={(e) => {
            if (e.target.className === "new-item-container") setItemOpen(false);
          }}
        >
          <div className="new-item">
            <form>
              <div className="form-group">
                <label htmlFor="Item_name">Item Name</label>
                <input
                  name="Item_name"
                  value={formState.Item_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description</label>
                <input
                  name="Description"
                  value={formState.Description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Price</label>
                <input
                  name="Price"
                  value={formState.Price}
                  onChange={handleChange}
                />
              </div>
              {errors && <div className="error">{errors}</div>}
              <button type="submit" className="btn" onClick={handleItemSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
