import React, { useEffect, useState } from "react";
import classes from "./foodEditPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { add, getFoodById, update } from "../../services/foodService";
import Title from "../../components/Title/Title";
import InputContainer from "../../components/InputContainer/InputContainer";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { uploadImage } from "../../services/uploadService";
import { toast } from "react-toastify";
export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const isEditMode = !!foodId;

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;
    getFoodById(foodId).then((food) => {
      if (!food) return;
      reset(food);
      setImageUrl(food.imageUrl);
    });
  }, [foodId]);

  const submit = async (foodData) => {
    const food = { ...foodData, imageUrl };

    if (isEditMode) {
      await update(food);
      toast.success(`${food.name} updated successfully`);
      return;
    }
    const newFood = await add(food);
    toast.success(`${newFood.name} added successfully`);
    navigate("/admin/editFood/" + newFood.id, { replace: true });
  };
  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? "Edit Food" : "Add Food"} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <InputContainer label="Select Image">
            <input
              className={classes.inputfile}
              type="file"
              id="file"
              onChange={upload}
              accept="image/jpeg, image/png"
            />
            <label for="file">Choose a file</label>
          </InputContainer>
          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="_blank">
              <img src={imageUrl} alt="Uploaded" />
            </a>
          )}
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
              minLength: { value: 3, message: "Name Is Too Short" },
            })}
            error={errors.name}
          />
          <Input
            type="text"
            label="Price"
            {...register("price", { required: true })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Tags"
            {...register("tags")}
            error={errors.tags}
          />
          <Input
            type="text"
            label="Origins"
            {...register("origins", { required: true })}
            error={errors.origins}
          />

          <Input
            type="text"
            label="Cook Time"
            {...register("cookTime", { required: true })}
            error={errors.cooktime}
          />
          <Button type="submit" text={isEditMode ? "Update" : "Add"} />
        </form>
      </div>
    </div>
  );
}
