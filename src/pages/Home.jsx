import React, { useState, useEffect } from "react";
import logoImage from "../assets/CentralRestLogo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import * as fetch from "../components/backend.js";

const Home = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [activeTab, setActiveTab] = useState("overview");

  const [selectedStore, setSelectedStore] = useState(undefined);
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState("");

  //New item form useStates
  const [errors, setErrors] = useState("");
  const [itemOpen, setItemOpen] = useState(false);
  const [formState, setFormState] = useState({
    store_name: "",
    street_num: "",
    street: "",
    postal: "",
    country: "",
    province: "",
    city: "",
  });

  /* FETCH THE DATA */
  useEffect(() => {
    let URL = SERVER_URL + "/store/StoreList";
    axios(URL)
      .then((response) => {
        console.log(response.data);
        setStores(response.data["data"]);
      })
      .catch((error) => {
        console.log("Error fetching:" + error);
      });
  }, []);

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleAddStore = (event) => {
    event.preventDefault();

    const body = {
      store_name: formState.store_name,
      street_num: formState.street_num,
      street: formState.street,
      postal: formState.postal,
      country: formState.country,
      province: formState.province,
      city: formState.city,
    };

    if (!validateForm(body)) return;

    const URL = SERVER_URL + "/store/addStore";
    axios
      .post(URL, body)
      .then((response) => {
        console.log(response.data);
        //Fetch data again (update store list)
        let URL = SERVER_URL + "/store/StoreList";
        axios(URL)
          .then((response) => {
            console.log(response.data);
            setStores(response.data["data"]);
          })
          .catch((error) => {
            console.log("Error fetching:" + error);
          });
      })
      .catch((error) => {
        console.log("Error fetching: \n" + error);
      });

    setItemOpen(false);
  };

  const validateForm = (item) => {
    if (item.store_name === "") {
      setErrors("Please enter a store name");
      return false;
    }

    if (item.store_name.length > 50) {
      setErrors("Store name must be no more than 50 characters");
      return false;
    }

    if (item.street_num === "") {
      setErrors("Please enter a street number");
      return false;
    }

    if (item.street_num.length > 6) {
      setErrors("Street number must b no more than 6 characters");
      return false;
    }

    if (isNaN(item.street_num)) {
      setErrors("Street number must be a number");
      return false;
    }

    if (item.street_num < 0) {
      setErrors("Street number cannot be negative");
      return false;
    }

    if (item.street === "") {
      setErrors("Please enter a street");
      return false;
    }

    if (item.street.length > 255) {
      setErrors("Street must be no more than 255 characters");
      return false;
    }

    if (item.postal === "") {
      setErrors("Please enter a postal code");
      return false;
    }

    if (item.postal.length > 20) {
      setErrors("Postal code must be no more than 20 characters");
      return false;
    }

    if (item.country === "") {
      setErrors("Please enter a country");
      return false;
    }

    if (item.country.length > 30) {
      setErrors("Country must be no more than 30 characters");
      return false;
    }

    if (item.province === "") {
      setErrors("Please enter a province");
      return false;
    }

    if (item.province.length > 20) {
      setErrors("Province must be no more than 20 characters");
      return false;
    }

    if (item.city === "") {
      setErrors("Please enter a city");
      return false;
    }

    if (item.city.length > 50) {
      setErrors("City must be no more than 50 characters");
      return false;
    }

    setErrors("");

    return true;
  };

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  //Handling form changes
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const tabContent = {
    overview:
      "We plan on storing data for inventory management that allows owners to create, update, and delete stock in a variety of different units.",
    projectDescription:
      "For this project, we would like to design a centralized restaurant management application that allows business owners to track inventory. The goal of the application is to provide a useful tool that makes inventory and order management easy and streamlined.",
    contactInfo:
      "This project was created by Kenneth Mendoza, Luca Smith, and Evelyn Ramirez",
  };

  return (
    <div className="body-background">
      <header>
        <img src={logoImage} alt="Logo" className="resize-logo" />
      </header>
      <div className="main-content">
        <div className="content-right">
          <div className="store-selection">
            <label htmlFor="stores-dropdown" className="select-label">
              Select a store
            </label>
            <br />
            <br />
            <select
              id="stores-dropdown"
              className="dropdown"
              value={selectedStore}
              onChange={handleStoreChange}
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store.Store_id} value={store.Store_id}>
                  {store.Store_name}
                </option>
              ))}
            </select>
            <br />
            {selectedStore != undefined ? (
              <Link to={`/store/` + selectedStore} className="link">
                Go to Store Page
              </Link>
            ) : (
              <></>
            )}
          </div>
          <button
            className="btn"
            onClick={() => {
              setItemOpen(true);
              setFormState({
                store_name: "",
                street_num: "",
                street: "",
                postal: "",
                country: "",
                provinence: "",
                city: "",
              });
            }}
          >
            Add
          </button>
        </div>
        <div className="content-left">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => handleTabClick("overview")}
            >
              Overview
            </button>
            <button
              className={`tab ${
                activeTab === "projectDescription" ? "active" : ""
              }`}
              onClick={() => handleTabClick("projectDescription")}
            >
              Project Description
            </button>
            <button
              className={`tab ${activeTab === "contactInfo" ? "active" : ""}`}
              onClick={() => handleTabClick("contactInfo")}
            >
              Members’ Contact Information
            </button>
          </div>
          <div className="tab-content">
            {activeTab && (
              <div className={`tab-text ${activeTab ? "active" : ""}`}>
                {activeTab === "overview" && <p>{tabContent.overview}</p>}
                {activeTab === "projectDescription" && (
                  <p>{tabContent.projectDescription}</p>
                )}
                {activeTab === "contactInfo" && <p>{tabContent.contactInfo}</p>}
              </div>
            )}
          </div>
          <p> </p>
        </div>
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
                <label htmlFor="store_name">Store Name</label>
                <input
                  name="store_name"
                  value={formState.store_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street_num">Street Number</label>
                <input
                  name="street_num"
                  value={formState.street_num}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                  name="street"
                  value={formState.street}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postal">Postal</label>
                <input
                  name="postal"
                  value={formState.postal}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  name="country"
                  value={formState.country}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="province">Province</label>
                <input
                  name="province"
                  value={formState.province}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                />
              </div>
              {errors && <div className="error">{errors}</div>}
              <button type="submit" className="btn" onClick={handleAddStore}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
