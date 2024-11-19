import { Link, useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";

interface Error {
    statusText: string,
    message: string
}

function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className={classes.errorPage}>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p>
        <i>{error.statusText || error.message || "Unknown error occurred"}</i>
      </p>
      <Link to="/" className={classes.backButton}>
        Go Back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
