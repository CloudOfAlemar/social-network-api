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
};
