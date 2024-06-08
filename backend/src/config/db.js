import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { FoodModel } from "../models/food.model.js";
import { sample_foods } from "../data.js";
import { sample_users } from "../data.js";
import bcrypt from "bcryptjs";
const SALT_ROUNDS = 10;
set("strictQuery", true);

export const connectDatabase = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
    await seedUsers();
    await seedFoods();
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
};

export const seedUsers = async () => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users already seeded");
    return;
  }
  for (let user of sample_users) {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    await UserModel.create(user);
  }
  console.log("Successfully seeded users");
};

export const seedFoods = async () => {
  const foodsCount = await FoodModel.countDocuments();
  if (foodsCount > 0) {
    console.log("Foods already seeded");
    return;
  }
  for (let food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }
  console.log("Successfully seeded foods");
};
