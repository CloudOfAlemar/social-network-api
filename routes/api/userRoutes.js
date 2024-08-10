const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getSingleUser).put(updateUser);

module.exports = router;
