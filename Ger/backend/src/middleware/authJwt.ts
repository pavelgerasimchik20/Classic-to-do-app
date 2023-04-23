import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.ts");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;


 const verifyToken =  async (req: Request, res: Response, next: NextFunction) => {
  
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.body.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.body.userId).exec()
    .then((user: any) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      Role.find({ _id: { $in: user.roles } }).exec()
        .then((roles: any) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        })
        .catch((err: any) => {
          res.status(500).send({ message: err });
          return;
        });
    })
    .catch((err: any) => {
      res.status(500).send({ message: err });
      return;
    });
};

const isModerator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.body.userId);
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