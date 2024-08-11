const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
