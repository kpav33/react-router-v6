import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    const response = redirect("/login");
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
