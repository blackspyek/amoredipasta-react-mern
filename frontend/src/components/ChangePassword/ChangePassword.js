import React from "react";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ChangePassword() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const { changePassword } = useAuth();
  const submit = (passwords) => {
    changePassword(passwords);
  };
  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit(submit)}>
        <Input
          type="password"
          label="Current Password"
          {...register("currentPassword", {
            required: "Current Password is required",
            minLength: {
              value: 5,
              message: "CurrentPassword should have at least 5 characters",
            },
          })}
          error={errors.currentPassword}
        />
        <Input
          type="password"
          label="New Password"
          {...register("newPassword", {
            required: "New Password is required",
            minLength: {
              value: 5,
              message: "New Password should have at least 5 characters",
            },
          })}
          error={errors.newPassword}
        />
        <Input
          type="password"
          label="Confirm Password"
          {...register("confirmNewPassword", {
            required: true,
            validate: (value) =>
              value !== getValues("newPassword")
                ? "Passwords do not match"
                : true,
          })}
          error={errors.confirmNewPassword}
        />

        <Button type="submit" text="Change" backgroundColor="red" />
      </form>
    </div>
  );
}
