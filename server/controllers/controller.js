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
      var token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRETKEY
      );
      res.status(200).json({
        access_token: token,
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
            access_token: token,
            email: user.email,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async getMyOrder(req, res, next) {
    try {
      const order = await Order.findAll({
        include: [
          {
            model: User,
            attributes: ["email"],
          },
          {
            model: Product,
          },
        ],
      });

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async MakeMyOrder(req, res, next) {
    try {
      const { name, quantity, price } = req.body;

      const id = req.user.id;

      const product = await Product.create({
        name,
        quantity,
        price,
      });

      if (!product) {
        throw { msg: `Product can't be registered` };
      } else {
        const order = await Order.create({
          UserId: id,
          ProductId: product.id,
        });

        res.status(201).json({ product, order });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
