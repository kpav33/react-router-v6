import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  // Use useRouteError to get data about what caused the error when rendering the component
  // Its message in this example comes from the error handling that was defined in api.js file
  const error = useRouteError();

  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  );
}
