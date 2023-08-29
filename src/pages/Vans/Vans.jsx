import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
  // The useSearchParams hook is used to read and modify the query string in the URL for the current location. Like React's own useState hook, useSearchParams returns an array of two values: the current location's search params and a function that may be used to update them.
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Query parameters represent a change in the UI (sorting, filtering, pagination) => You might want to use React state for such actions, but there is an issues, because the state gets reinitialized to initial value on page reload
  // They can be used as a single source of truth for certain application state => Ask yourself should a user be able to revisit or share this page just like it is? If yes, then you might consider raising that state up to the URL in a query parameter
  // Query parameters represent key/value pairs in the URL => /vans?type=rugged&filterBy=price
  const typeFilter = searchParams.get("type");

  // Calling the data with proper loading screens and by using the getVans function, which has error handling built in
  // Only added here as an example, other places where we use fetch could be refactored like this as well
  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      // Try block assumes the "happy path" route => When everything goes ok and as expected, and catch block is used for the "sad path" => When something goes wrong
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        // console.log(err);
        setError(err);
      } finally {
        // Finally block runs in both cases after either the try or catch block is executed
        setLoading(false);
      }
    }

    loadVans();
  }, []);

  // Filter the vans we want to display by using the type value from the search params
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      {/* Van detail page uses the /vans/:id path and in this case the van.id variable will be accessible to us on the van detail page from the useParams hook */}
      {/* <Link to={`/vans/${van.id}`}> */}
      {/* You can pass state to the Link so that this values will be available on the page that it is linking to */}
      {/* You can pass any value as Link state in this case we are passing the values of the searchParams and of the active typeFilter */}
      <Link
        to={van.id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter,
        }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    // Pass values to the search params
    setSearchParams((prevParams) => {
      if (value === null) {
        // Clear the search params value
        prevParams.delete(key);
      } else {
        // Set the search params value
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple 
                    ${typeFilter === "simple" ? "selected" : ""}`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury 
                    ${typeFilter === "luxury" ? "selected" : ""}`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged 
                    ${typeFilter === "rugged" ? "selected" : ""}`}
        >
          Rugged
        </button>

        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
