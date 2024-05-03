import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./search.module.css";

export default function Search({ tags }) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  useEffect(() => {
    setTerm(searchTerm ?? "");
  }, [searchTerm]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (term.trim() !== "") {
        navigate("/search/" + term.trim());
      } else {
        navigate("/");
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [term, navigate]);

  const search = () => {
    if (term.trim() !== "") {
      navigate("/search/" + term.trim());
    } else {
      navigate("/");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.search_bar}>
        <input
          type="text"
          placeholder="Search food!"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        <button onClick={search}>Search</button>
      </div>
      <ul className={classes.tags}>
        <li key={null}>
          <button
            className={searchTerm ? null : classes.active}
            onClick={() => {
              setTerm("");
              navigate("/");
            }}
          >
            All
          </button>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <button
              onClick={() => {
                setTerm(tag);
                navigate("/search/" + tag);
              }}
              className={tag === searchTerm ? classes.active : null}
            >
              {tag}
            </button>
          </li>
        ))}
        <li key={null}>
          <button
            className={
              !tags.flat().includes(searchTerm) && searchTerm
                ? classes.active
                : null
            }
            onClick={() => {
              setTerm("");
              navigate("/");
            }}
          >
            Custom
          </button>
        </li>
      </ul>
    </div>
  );
}
