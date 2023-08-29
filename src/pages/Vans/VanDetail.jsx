import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function VanDetail() {
  // This hook will return an object with id property, which is the same id that we defined as the :id in the VanDetail route
  const params = useParams();
  // Use the useLocation hook to get the state that we passed to the Link component in the Vans.jsx file
  const location = useLocation();

  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, []);

  // Allow user to use the go back button so that any of the set filters are maintained, this way the query parameters are saved and it allows for a better user experience
  const search = location.state?.search || "";
  // Show the proper name on the go back button so that it makes sense according to the selected filters
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
