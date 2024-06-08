import { Router } from "express";
import { FoodModel } from "../models/food.model.js";
import handler from "express-async-handler";
import admin from "../middleware/admin.mid.js";
const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    var foods = await FoodModel.find({});
    res.send(foods);
  })
);
router.post(
  "/",
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    const food = new FoodModel({
      name,
      price,
      tags: tags.split ? tags.split(",") : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(",") : origins,
      cookTime,
    });
    await food.save();

    res.send(food);
  })
);
router.put(
  "/",
  admin,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;
    await FoodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(",") : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(",") : origins,
        cookTime,
      }
    );
    res.send();
  })
);
router.delete(
  "/:foodId",
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findByIdAndDelete({ _id: foodId });
    if (!food) {
      res.status(404).json({ message: "Food not found", status: 404 });
      return;
    }
    res.send(food);
  })
);
router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });
    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i"); // case-insensitive
    const result = await FoodModel.find({
      $or: [
        { name: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } },
      ],
    });
    res.send(result);
  })
);

router.get(
  "/:foodId",
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    if (!food) {
      res.status(404).json({ message: "Food not found", status: 404 });
      return;
    }
    res.send(food);
  })
);
export default router;
