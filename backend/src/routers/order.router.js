import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { UserModel } from "../models/user.model.js";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;
    if (order.items.length <= 0)
      res
        .status(BAD_REQUEST)
        .json({ message: "Order must have at least one item" });
    await OrderModel.deleteOne({
      user: req.user._id,
      status: OrderStatus.NEW,
    });
    const newOrder = new OrderModel({
      ...order,
      user: req.user.id,
    });
    await newOrder.save();
    res.send(newOrder);
  })
);
router.put(
  "/pay",
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
      res
        .status(BAD_REQUEST)
        .json({ message: "No new order found for current user" });
      return;
    }
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();
    res.send(order._id);
  })
);
router.get(
  "/track/:orderId",
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = {
      _id: orderId,
    };

    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);

    if (!order) return res.send(UNAUTHORIZED);

    return res.send(order);
  })
);
router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else
      res
        .status(BAD_REQUEST)
        .json({ message: "No new order found for current user" });
  })
);
router.get("/allstatus", (req, res) => {
  res.send(Object.values(OrderStatus));
});
router.get(
  "/:status?",
  handler(async (req, res) => {
    const { status } = req.params;
    const user = await UserModel.findById(req.user.id);
    const filter = {};
    if (!user.isAdmin) {
      filter.user = user._id;
    }
    if (status) filter.status = status;
    const orders = await OrderModel.find(filter).sort("-createdAt");
    res.send(orders);
  })
);
router.put(
  "/updateStatus",
  handler(async (req, res) => {
    const { orderId, status } = req.body;
    const user = await UserModel.findById(req.user.id);
    const filter = {
      _id: orderId,
    };
    if (!user.isAdmin) {
      return res.status(BAD_REQUEST).send(UNAUTHORIZED);
    }
    const order = await OrderModel.findOne(filter);
    if (!order) return res.send(UNAUTHORIZED);
    order.status = status;
    await order.save();
    return res.send();
  })
);
const getNewOrderForCurrentUser = async (req) =>
  await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });

export default router;
