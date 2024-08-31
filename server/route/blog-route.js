const express = require("express");
const blogRouter = express.Router();

const {
  fetchListOfBlogs,
  deleteBlog,
  UpdateBlog,
  addNewBlog,
} = require("../controller/blog-controller");
const { updateSearchIndex } = require("../model/Blog");

blogRouter.get("/", fetchListOfBlogs);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/update/:id", UpdateBlog);
blogRouter.delete("/delete/:id", deleteBlog);


module.exports = blogRouter;