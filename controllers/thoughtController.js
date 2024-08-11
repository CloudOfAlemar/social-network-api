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
      const thought = await Thought.findById(req.params.thoughtId);
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
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
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
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
