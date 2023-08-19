import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Store = () => {
  const params = useParams();

  const [storeData, setStoreData] = useState([]);
  const [staffInformation, setStaffInformation] = useState([]);

  /* FETCH THE DATA */
  useEffect(() => {
    //Get current store data
    let STORE_URL = SERVER_URL + "/Store?store_id=" + params.store_id;
    axios(STORE_URL)
      .then((response) => {
        //console.log(response.data);
        setStoreData(response.data["data"]);
        //console.log(store)
      })
      .catch((error) => {
        console.log("Error fetching:" + error);
      });

    //Get staff information for store
    //Get current store data
    let StaffList_URL =
      SERVER_URL + "/Store/staffList?store_id=" + params.store_id;
    axios(StaffList_URL)
      .then((response) => {
        //console.log(response.data);
        setStaffInformation(response.data["data"]);
        //console.log(store)
      })
      .catch((error) => {
        console.log("Error fetching:" + error);
      });

    //console.log(storeData);
  }, [params]);

  console.log(storeData);

  return (
    <div className="store-body">
      {storeData.map((store) => (
        <h1 key={store.Store_ID}>{store.Store_name}</h1>
      ))}

      <div className="store-columns">
        <div className="left-column">
          <section className="store-section">
            <h2>Store Location </h2>
            <ul>
              {storeData.map((store) => (
                <li key={store.Store_ID}>
                  {store.Street_num} {store.Street}, {store.City} {store.Province} {store.Postal}
                </li>
              ))}
            </ul>
          </section>

          <section className="store-section">
            <h2>Staff Information</h2>
            <ul>
              {staffInformation.map((staff) => (
                <li key={staff.Employee_ID}>
                  {staff.Fname} {staff.Lname} - {staff.Job_title}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="right-column">
          <section className="store-section">
            <h2>Store Menu</h2>
            <Link to={"/menu/" + params.store_id} className="link">
              {" "}
              View Menu{" "}
            </Link>
            <br></br>
            <Link to={"/ManageMenu/" + params.store_id} className="link">
              {" "}
              Manage Menu{" "}
            </Link>
          </section>

          <section className="store-section">
            <h2>Inventory</h2>
            <Link to={"/inventory/" + params.store_id} className="link">
              {" "}
              View Inventory{" "}
            </Link>
          </section>
        </div>
      </div>

      <section className="store-section">
        <Link to="/Central-Client" className="link">
          {" "}
          Return Home{" "}
        </Link>
      </section>
    </div>
  );
};

export default Store;
