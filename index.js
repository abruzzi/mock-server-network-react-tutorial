const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 1573;

const app = express();

app.use(express.json());
app.use(cors());

const users = [
  {
    id: "u1",
    name: "Juntao Qiu",
    bio: "Developer, Educator, Author",
    interests: ["Technology", "Outdoors", "Travel"],
  },
  {
    id: "u2",
    name: "Alice Johnson",
    bio: "Software Engineer",
    interests: ["Technology", "Reading", "Music"],
  },
  {
    id: "u3",
    name: "Bob Smith",
    bio: "Frontend Developer",
    interests: ["Art", "Design", "Travel"],
  },
  {
    id: "u4",
    name: "Carol White",
    bio: "UI/UX Designer",
    interests: ["Photography", "Technology", "Outdoors"],
  },
];

const relationship = {
  u1: ["u2", "u3", "u4"],
};

const feeds = [
  {
    id: "t1",
    title: "Implementing Dynamic Import and Code Splitting",
    description:
      "As an application grows and more code is added, the initial loading time can become noticeably longer. This delay, sometimes lasting several seconds, can frustrate users. To avoid this, it's essential to optimize loading times.",
    category: "Technology",
  },
  {
    id: "t2",
    title: "Headless Component: a pattern for composing React UIs",
    description:
      "As React UI controls become more sophisticated, complex logic can get intertwined with the visual representation. This makes it hard to reason about the behavior of the component, hard to test it, and necessary to build similar components that need a different look. A Headless Component extracts all non-visual logic and state management, separating the brain of a component from its looks.",
    category: "Technology",
  },
  {
    id: "t3",
    title: "Why Web UI Development Is So Hard?",
    description:
      "The landscape of web UI development is fraught with challenges that extend beyond writing code and designing interfaces. The inherent language limitations, nuanced data management, async complexities, and often-ignored unhappy paths collectively make this a formidable field. Architectural decisions ...",
    category: "Technology",
  },
  {
    id: "t4",
    title: "The best beaches in Victoria that you won't want to miss",
    description:
      "Best known for its sand and surf Victoria, Australia, has no shortage of beautiful beaches. Here’s a guide to the best ones",
    category: "Travel",
  },
];

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  setTimeout(() => {
    res.json(user);
  }, 1000);
});

app.get("/users/:id/friends", (req, res) => {
  const userId = req.params.id;
  const friendIds = relationship[userId];

  if (!friendIds) {
    res.status(404).send("User not found");
    return;
  }

  const friends = friendIds.map((id) => users.find((user) => user.id === id));

  setTimeout(() => {
    res.json(friends);
  }, 1200);
});

app.get("/articles/:category", (req, res) => {
  const category = req.params.category;

  const filtered = feeds.filter((p) => p.category === category);

  setTimeout(() => {
    res.json(filtered);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
