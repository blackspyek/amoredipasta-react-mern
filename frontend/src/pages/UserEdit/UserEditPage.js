import React, { useEffect } from "react";
import classes from "./userEdit.module.css";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getById, updateUser } from "../../services/userService";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import { EMAIL } from "../../constants/patterns";
import Button from "../../components/Button/Button";
export default function UserEditPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { userId } = useParams();

  const isEditMode = userId;
  useEffect(() => {
    if (isEditMode) {
      loadUser();
    }
  }, [userId]);

  const loadUser = async () => {
    const user = await getById(userId);
    reset(user);
  };
  const submit = (userData) => {
    updateUser(userData);
  };
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? "Edit User" : "Add User"} />
        <form onSubmit={handleSubmit(submit)} noValidate>
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
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: EMAIL,
            })}
            error={errors.email}
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
          <Input label="Is Admin" type="checkbox" {...register("isAdmin")} />
          <Button type="submit" />
        </form>
      </div>
    </div>
  );
}
