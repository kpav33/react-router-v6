import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  // const isLoggedIn = false;
  const isLoggedIn = localStorage.getItem("loggedin");
  // Get the path name
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn) {
    // You can pass messages directly to the redirect URL by passing string after the question mark
    // const response = redirect("/login?message=You must log in first.");
    //
    // Store the value of the pathname where we want to redirect the user after logging in, in the URL
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    response.body = true; // It's silly, but it works
    throw response;

    // This is the correct way to do it, the above fix is only done because of the issues that Mirage JS has with working with React Router DOM, on a real server you don't need the above fix
    // return redirect("/login");
  }

  return null;

  // const pathname = new URL(request.url).pathname;
  // const isLoggedIn = localStorage.getItem("loggedin");

  // if (!isLoggedIn) {
  //   throw redirect(
  //     `/login?message=You must log in first.&redirectTo=${pathname}`
  //   );
  // }
}
