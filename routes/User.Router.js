const { authenticateToken } = require("../middleware/jwt.js");

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.Controller.js"); // Update the path accordingly

// Routes for User CRUD operations
router.get("/user/", UserController.getAll);
router.get("/user/:id", UserController.getById);
router.post("/user/", UserController.create);
router.put("/user/:id", UserController.updateById);
router.delete("/user/:id", UserController.deleteById);

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/refresh", UserController.referesh);
router.post("/logout", authenticateToken, UserController.logout);

module.exports = router;
