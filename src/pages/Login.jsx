import React from "react";
import {
  useLoaderData,
  useNavigation,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  // Get form data from the request object formData function
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = await loginUser({ email, password });
  // Used for fake auth...
  localStorage.setItem("loggedin", true);

  // Same as in utils file, just using return redirect() should work, but becuase of issues with Mirage JS it has to be done in such a hacky way
  const response = redirect("/host");
  response.body = true; // It's silly, but it works
  throw response;
  // return redirect("/host");

  // const formData = await request.formData();
  // const email = formData.get("email");
  // const password = formData.get("password");
  // const pathname =
  //   new URL(request.url).searchParams.get("redirectTo") || "/host";

  // try {
  //   const data = await loginUser({ email, password });
  //   localStorage.setItem("loggedin", true);
  //   return redirect(pathname);
  // } catch (err) {
  //   return err.message;
  // }
}

export default function Login() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  // Used to programatically navigate to different routes
  const navigation = useNavigation();

  // Replaced by using react router actions
  // Create a controlled form the usual React way, with controlled components, replaced by react router actions
  // const [loginFormData, setLoginFormData] = React.useState({
  //   email: "",
  //   password: "",
  // });
  // const [status, setStatus] = React.useState("idle");
  // const [error, setError] = React.useState(null);
  // const navigate = useNavigate();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus("submitting");
  //   setError(null);
  //   loginUser(loginFormData)
  //     .then((data) => {
  //       // Replace true causes that if you go to login page and sucessfully login, after you get navigated to the host page in this example, if you press the back button in the browser you will not be navigated to the login page, but rather to a page that you were on before the login page
  //       // For example if you go first to about page, then to login page, which redirects you to host page and click the back button on host page, you will be sent to about page, since that was the page you were on before going to login page
  //       navigate("/host", { replace: true });
  //     })
  //     .catch((err) => setError(err))
  //     .finally(() => setStatus("idle"));
  // }

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setLoginFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      {/* {error && <h3 className="red">{error.message}</h3>} */}

      {/* <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form> */}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
