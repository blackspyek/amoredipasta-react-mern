import React from "react";
import classes from "./notFound.module.css";
import { Link } from "react-router-dom";
export default function NotFound({ message, linkRoute, linkText }) {
  return (
    <div className={classes.container}>
      <img src="/404.png" alt="404" className={classes.image} />
      <span className={classes.text}>{message}</span>
      <Link to={linkRoute} className={classes.link}>
        {linkText}
      </Link>
    </div>
  );
}

NotFound.defaultProps = {
  message: "Nothing found!",
  linkRoute: "/",
  linkText: "Go back home",
};
