// Create a function to fetch the van data that has error handing added, so that in case of some sort of issues with the api, the page will have proper error handling and properly inform the user of the issues

export async function getVans() {
  const res = await fetch("/api/vans");
  // res.ok is built into the fetch function so you can use it any time
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}
