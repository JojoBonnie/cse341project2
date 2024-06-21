const router = require("express").Router();
const usersController = require("../controllers/users");

router.get("/", (req, res) => {
  res.send("Hello World! This is Project 2.");
});

router.post("/register", usersController.register);
router.post("/login", usersController.login);

router.use("/users", require("./users"));
router.use("/profiles", require("./profiles"));
router.use("/api-docs", require("./swagger"));

module.exports = router;
