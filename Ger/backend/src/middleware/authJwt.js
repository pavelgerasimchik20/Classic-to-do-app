import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.ts");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      Role.find({ _id: { $in: user.roles } }).exec()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        })
        .catch(err => {
          res.status(500).send({ message: err });
          return;
        });
    })
    .catch(err => {
      res.status(500).send({ message: err });
      return;
    });
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;