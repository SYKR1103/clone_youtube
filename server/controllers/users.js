import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findOneAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "you can update your own account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "you can delete your own account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(403, "No User Found"));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


export const subscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
        // subscribedUsers: a list that i'm subscribing
      $push: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("subscription successful");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("unsubscription successful");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("unsubscription successful");
  } catch (err) {
    next(err);
  }
};

export const dislike = (req, res, next) => {
  console.log("test is working");
  res.json("it's successful");
};
