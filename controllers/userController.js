const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).populate("friends");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
