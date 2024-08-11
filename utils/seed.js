const { User, Thought } = require("../models");
const connection = require("../config/connection");

connection.once("open", async () => {
  const initialUsers = [
    {
      username: "alemar",
      email: "alemar@example.com",
    },
    {
      username: "arebor",
      email: "arebor@example.com",
    },
    {
      username: "diegomar",
      email: "diegomar@example.com",
    },
  ];

  const initialThoughts = [
    {
      thoughtText: "I'm turning 29 in a few days!",
      username: "alemar",
      reactions: [
        {
          reactionBody: "Dang you're getting old.",
          username: "diegomar",
        },
      ],
    },
    {
      thoughtText: "I can't wait for the ACOTAR show to stream!",
      username: "arebor",
    },
    {
      thoughtText: "I need to work two jobs to get a car soon!",
      username: "diegomar",
    },
    {
      thoughtText: "Catch me at Street Classicos.",
      username: "alemar",
    },
    {
      thoughtText: "You can also find me in 7 leaves cafe lol.",
      username: "alemar",
    },
  ];

  await User.deleteMany({});

  const insertedUsers = await User.insertMany(initialUsers);

  await Thought.deleteMany({});

  const insertedThoughts = await Thought.insertMany(initialThoughts);

  const userOneThoughts = insertedThoughts
    .filter((thought) => thought.username === "alemar")
    .map((thought) => thought._id);

  const userOne = await User.findByIdAndUpdate(
    insertedUsers[0]._id,
    { $addToSet: { thoughts: { $each: userOneThoughts } } },
    { new: true }
  );

  process.exit(0);
});
