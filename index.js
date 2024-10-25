import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogPosts = [
  {
    author: "Spencer",
    title: "Welcome",
    date: new Date().toLocaleDateString(),
    body: "This is where text goes",
    slug: "1",
  
  },
  {
    author: "Spencer",
    title: "placeholder",
    date: new Date().toLocaleDateString(),
    body: "This is where text goes1",
    slug: "2",
  },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("home.ejs", { blogPosts });
});

app.get("/blog_posts", (req, res) => {
  res.render("blog_posts.ejs", { blogPosts });
});

app.get("/blog_post/:slug", (req, res) => {
  let blogPost;
  for (let i = 0; i < blogPosts.length; i++) {
    if (blogPosts[i].slug === req.params.slug) {
      blogPost = blogPosts[i];
    }
  }
  logBook(blogPost)
  res.render("blog_post.ejs", { blogPost });
});

app.get("/new_post", (req, res) => {
  res.render("new_post.ejs");
});

app.post("/submit", (req, res) => {
  let newBlogPost = {
    author: req.body.author,
    title: req.body.title,
    date: new Date().toLocaleDateString(),
    body: req.body.body,
    slug: `${blogPosts.length + 1}`,
  };
  blogPosts.push(newBlogPost);
  console.log(blogPosts)
  res.redirect("/blog_posts");
});

app.get("/faq", (req, res) => {
  res.render("faq.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

function logBook(blogPost){
  console.log(blogPost.title, blogPost.author, blogPost.date, blogPost.body)
}


