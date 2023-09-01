import React, { useState, useEffect, Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  // return getHostVans();
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  // const vans = useLoaderData();
  const dataPromise = useLoaderData();

  // Replaced by the loader
  // const [vans, setVans] = useState([]);

  // useEffect(() => {
  //   fetch("/api/host/vans")
  //     .then((res) => res.json())
  //     .then((data) => setVans(data.vans));
  // }, []);

  // Replaced by using Suspense and Await and creating a new renderHostVans function
  // const hostVansEls = vans.map((van) => (
  //   // <Link
  //   //   to={`/host/vans/${van.id}`}
  //   //   key={van.id}
  //   //   className="host-van-link-wrapper"
  //   // >
  //   <Link to={van.id} key={van.id} className="host-van-link-wrapper">
  //     <div className="host-van-single" key={van.id}>
  //       <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
  //       <div className="host-van-info">
  //         <h3>{van.name}</h3>
  //         <p>${van.price}/day</p>
  //       </div>
  //     </div>
  //   </Link>
  // ));

  function renderHostVans(vans) {
    const hostVansEls = vans.map((van) => (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));

    return <section>{hostVansEls}</section>;
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {/* Since switching to loaders this check is no longer necessary and could be removed */}
        {/* {vans.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>Loading...</h2>
        )} */}
        <Suspense fallback={<h2>Loading host vans...</h2>}>
          <Await resolve={dataPromise.vans}>{renderHostVans}</Await>
        </Suspense>
      </div>
    </section>
  );
}
