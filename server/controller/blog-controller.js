/*Functionalities we need for our MERN-Blog App:
1. fetch list of blogs
2. add a new blog
3. delete a blog
4. update a blog

*/

const mongoose = require("mongoose");

const Blog = require("../model/Blog");

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
  }

  if (!blogList) {
    return res
      .status(404)
      .json({ message: "No Blogs Found! Please try again." });
  }

  return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
  const { name, title, description } = req.body;
  const currentDate = new Date();

  const newlyCreatedBlog = new Blog({
    name,
    title,
    description,
    date: currentDate,
  });

  try {
    await newlyCreatedBlog.save();
  } catch (e) {
    console.log(e);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreatedBlog.save(session);
    session.commitTransaction();
  } catch (e) {
    return res.send(500).json({ message: e });
  }

  return res.status(200).json({ newlyCreatedBlog });
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog not Found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Unable to delete1 Please try again" });
  }
};

const UpdateBlog = async (req, res) => {
  const id = req.params.id;
  const {name, title, description } = req.body;
  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      name,
      title,
      description,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Something went wrong! Please try again." });
  }

  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: "unable to Update" });
  }
  return res.status(200).json({ currentBlogToUpdate });
};


module.exports = {fetchListOfBlogs, deleteBlog, UpdateBlog, addNewBlog};