import React from "react";
import classes from "./foodPage.module.css";
import { getFoodById } from "../../services/foodService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating";
import Price from "../../components/Price/Price";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../components/NotFound/NotFound";
export default function FoodPage() {
  const [food, setFood] = React.useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };
  React.useEffect(() => {
    getFoodById(id).then(setFood);
  }, [id]);
  return (
    <>
      {!food ? (
        <NotFound
          message="Food Not Found!"
          linkText="Back To Homepage"
        ></NotFound>
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`/foods/${food.imageUrl}`}
            alt={food.name}
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>
            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>
            <div className={classes.tags}>
              {food.tags &&
                food.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
