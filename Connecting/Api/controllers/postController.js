import axios from "axios";
import fs from "fs"; // it is used to create temporary files
import sharp from "sharp"; // it's a library use to manage images
import Post from "..//models/Post.js";
import User from "..//models/User.js";
import path from "path"; // it is used to create directory for files
import { fileURLToPath } from "url";

// Define __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//this function will generate names of files

const generateFileName = (userId, allPostsLength) => {
  const date = new Date().toISOString().replace(/:/g, "-"); // Converts the current date and time to ISO 8601 format, which is a standardized date format (YYYY-MM-DDTHH:mm:ss.sssZ).
  const fileName = `${userId}_${allPostsLength + 1}_${date}.jpg`;
  return fileName;
};

const createPostWithImages_V3 = async (req, res, next) => {
  const { userId } = req.params;
  const { prompt, size, negativePrompt, style, imageURL, revisedPrompt } =
    req.body;
  console.log(
    "all the data :" + prompt,
    size,
    negativePrompt,
    style,
    imageURL,
    revisedPrompt
  );
  console.log("Creating: " + req.body.imageURL);
  const allPosts = await Post.find();
  const allPostsLength = allPosts.length;
  const fileName = generateFileName(userId, allPostsLength);
  //path.join(__dirname, "../..", "uploads", fileName): This line constructs the absolute path to a file located in the "uploads" directory, which is two levels above the current directory where the script is running.
  const filePath = path.join(__dirname, "../..", "uploads", fileName);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log("imageUrl", imageURL);

    //An ArrayBuffer is a data type in JavaScript used to represent a fixed-length raw binary data buffer. It is part of the Web API and is particularly useful when you need to manipulate low-level binary data, such as reading files, working with streams, or handling network requests where data is in binary form (e.g., images, video, and audio).
    //The provided code snippet is making an HTTP request using the axios library, specifically for downloading an image (or any file) and handling a few custom settings
    const response = await axios({
      url: imageURL,
      responseType: "arraybuffer",
      maxRedirects: 5,
    });
    if (response.status !== 200) {
      throw new Error("Failed to download image");
    }
    const imageBuffer = Buffer.from(response.data);

    console.log(imageBuffer.length);
    if (imageBuffer.length === 0) {
      return res.status(400).json({ message: "Downloaded image is empty." });
    }
    //Sharp is a high-performance image processing library often used for tasks like resizing, formatting, and converting images.

    await sharp(imageBuffer).png().toFile(filePath); // here we convert the image into a png, and after convertion we send it to the filepath.

    // we are creating a new post
    const newPost = new Post({
      user: userId,
      prompt,
      negativePrompt,
      aimodel: "AI Image Art Dall-e-v3",
      aiMage: [imageURL],
      size,
      quality: "HD",
      quantity: 1,
      style: style,
      revisedPrompt,
      images: [fileName],
    });
    // we are saving the new post in the collection , that is because we are using the new method ,which is diff from await.Post.create()
    console.log(newPost);
    await newPost.save();
    user.posts.push(newPost);
    await user.save();
    res.status(201).json({ message: "Post created successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating post.", error: error.message });
  }
};

const getPostsController = async (req, res, next) => {
  try {
    const { userId } = req.query;
    let query = {};

    // If userId is provided, filter posts by user
    if (userId) {
      query.user = userId;
    }

    const posts = await Post.find(query)
      .populate("user", "username")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getSinglePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const posts = await Post.find({ user: userId }).populate(
      "user",
      "username"
    );
    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    await post.deleteOne();
    res.status(204).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
const likePost = async (req, res, next) => {
  const { postId, userId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post already liked." });
    }
    post.likes.push(userId);
    await post.save();
    res.status(200).json({ message: "Post liked successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const dislikePost = async (req, res, next) => {
  const { postId, userId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((like) => like.toString() !== userId); // we are filtering by user id to remove the post from the list
      await post.save();
      return res.status(200).json({ message: "Post disliked successfully." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  getSinglePost,
  getUserPosts,
  likePost,
  deletePost,
  dislikePost,
  getPostsController,
  createPostWithImages_V3,
};
