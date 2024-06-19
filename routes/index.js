const router = require("express").Router();

router.get("/", (req, res) => {
 //#swagger.tags = ['Hello World']    
  res.send("Hello World! This is Project 2.");
});

router.use("/profiles", require("./profiles"));
router.use("/users", require("./users"));

router.use("/api-docs", require("./swagger"));

module.exports = router;
