import React, { useEffect, useReducer } from "react";
import { getAll, getTags, search } from "../../services/foodService";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import NotFound from "../../components/NotFound/NotFound";
const initialState = { foods: [], tags: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};
export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadFoods = searchTerm ? search(searchTerm) : getAll();
    const loadTags = getTags();
    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
    loadTags.then((tags) => {
      dispatch({ type: "TAGS_LOADED", payload: tags });
    });
  }, [searchTerm]);
  return (
    <>
      <Search tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
}
