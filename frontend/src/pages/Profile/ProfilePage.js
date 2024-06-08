import React from "react";
import classes from "./profilePage.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
export default function ProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile } = useAuth();
  const submit = (user) => {
    updateProfile(user);
  };
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(submit)}>
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
            label="Address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address should have at least 5 characters",
              },
            })}
            error={errors.address}
          />
          <Button type="submit" text="Update" backgroundColor="#009e84" />
        </form>
        <ChangePassword />
      </div>
    </div>
  );
}
