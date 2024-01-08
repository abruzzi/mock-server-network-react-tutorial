const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT || 1573;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

const users = [
  {
    id: "u1",
    name: "Juntao Qiu",
    bio: "Developer, Educator, Author",
    interests: ["Technology", "Outdoors", "Travel"],
  },
  {
    id: "u2",
    name: "Abruzzi",
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

const userDetails = [
  {
    id: "u1",
    name: "Juntao Qiu",
    twitter: "@JuntaoQiu",
    bio: "Developer, Educator, Author",
    homepage: "https://icodeit.com.au",
  },
  {
    id: "u2",
    name: "Abruzzi",
    twitter: "@abruzzi",
    bio: "Software Engineer",
    homepage: "https://icodeit.com.au",
  },
  {
    id: "u3",
    name: "Bob Smith",
    twitter: "@bobsmith",
    bio: "Frontend Developer, Photographer",
    homepage: "https://icodeit.com.au",
  },
  {
    id: "u4",
    name: "Carol White",
    twitter: "@carolwhite",
    bio: "UI/UX Designer",
    homepage: "https://icodeit.com.au",
  },
];

const relationship = {
  u1: ["u2", "u3", "u4"],
  u2: ["u1"],
  u3: ["u1"],
  u4: ["u1"],
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
    title: "Why Web UI Development Is So Hard?",
    description:
      "The landscape of web UI development is fraught with challenges that extend beyond writing code and designing interfaces. The inherent language limitations, nuanced data management, async complexities, and often-ignored unhappy paths collectively make this a formidable field. Architectural decisions ...",
    category: "Technology",
  },
  {
    id: "t3",
    title: "The best beaches in Victoria that you won't want to miss",
    description:
      "Best known for its sand and surf Victoria, Australia, has no shortage of beautiful beaches. Here’s a guide to the best ones",
    category: "Travel",
  },
];

const ads = [
  {
    id: "a1",
    title: "Summer Sale Extravaganza!",
    content:
      "Get up to 50% off on all summer clothing. Dive into our exclusive summer collection and revamp your wardrobe!",
    imageUrl: "https://example.com/images/summer-sale.jpg",
    link: "https://example.com/summer-sale",
    startDate: "2024-06-01",
    endDate: "2024-07-31",
  },
  {
    id: "a2",
    title: "Tech Gadgets Galore: Unbeatable Deals!",
    content:
      "Explore the latest tech gadgets at unbeatable prices. From smartphones to laptops, we've got everything tech enthusiasts need!",
    imageUrl: "https://example.com/images/tech-gadgets.jpg",
    link: "https://example.com/tech-deals",
    startDate: "2024-09-10",
    endDate: "2024-10-10",
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
  }, 1500);
});

app.get("/users/:id/details", (req, res) => {
  const userId = req.params.id;
  const detail = userDetails.find((u) => u.id === userId);

  if (!detail) {
    res.status(404).send("User not found");
    return;
  }

  setTimeout(() => {
    res.json(detail);
  }, 500);
});


app.get("/ads", (req, res) => {
  setTimeout(() => {
    res.json(ads);
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
  }, 1000);
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
