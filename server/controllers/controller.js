const { User, Product, Order } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hashedPassword } = require("../helpers/jwt");

class Controller {
  static async SignUp(req, res, next) {
    try {
      let password = hashedPassword(req.body.password);
      let user = await User.create({
        email: req.body.email,
        password: password,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async SignIn(req, res, next) {
    try {
      let user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        throw { name: `Email Not Authentic` };
      } else {
        let validPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          throw { name: `Password Not Authentic` };
        } else {
          var token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRETKEY
          );
          res.status(200).json({
            accessToken: token,
            email: user.email,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async getMyorder(req, res, next) {
    try {
      console.log("masuk");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
