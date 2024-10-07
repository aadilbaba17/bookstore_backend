import User from "../models/user.model.js";
import mongoose from "mongoose";

const addToFavourites = async (req, res) => {
  const { book } = req?.body;
  const user = req?.user;

  try {
    const foundUser = await User.findById(user?._id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the user's favorites
    if (foundUser.favorites.includes(book?._id)) {
      return res.status(400).json({ message: "Book is already in favorites" });
    }

    // Add the book to the user's favorites array
    foundUser.favorites.push(book?._id);
    await foundUser.save();

    return res.status(200).json({ message: "Book added to favorites" });

  } catch (err) {
    console.error("Error occurred in user controller in addToFavourites:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getFavourites = async (req, res) => {
  const user = req?.user;

  try {
    const foundUser = await User.findById(user?._id).populate('favorites');

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ favorites: foundUser.favorites });

  } catch (err) {
    console.error("Error occurred in getFavourites in user controller:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const isFavourite = async (req, res) => {
  const { bookId } = req.body; // Assuming bookId is being passed
  const user = req?.user;

  try {
    const foundUser = await User.findById(user?._id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the user's favorites
    const isFav = foundUser.favorites.includes(bookId);
    return res.status(200).json({ is_favourite: isFav });

  } catch (err) {
    console.error("Error occurred in isFavourites in user controller", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const saveBookmark = async (req, res) => {
  const { bookId, pageNumber } = req.body;
  const userId = req.user._id;

  if (!bookId || !pageNumber) {
    return res.status(400).json({ message: "Book ID and page number are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the bookmark already exists
    const existingBookmark = user.bookmarks.find(b => b.bookId.toString() === bookId);
    if (existingBookmark) {
      existingBookmark.pageNumber = pageNumber; // Update page number if bookmark exists
    } else {
      user.bookmarks.push({ bookId, pageNumber });
    }

    await user.save();
    return res.status(200).json({ message: "Bookmark saved", bookmarks: user.bookmarks });
  } catch (error) {
    console.error(`Error saving bookmark: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getBookmark = async (req, res) => {
  const userId = req?.user._id;
  const bookId = req?.query?.bookId; // Accessing bookId from query parameters

  try {
      const user = await User.findById(userId);
      console.log(user, "User object retrieved");
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      console.log(user.bookmarks, "User bookmarks");

      console.log(bookId, "Book ID from query");
      const bookObjectId = new mongoose.Types.ObjectId(bookId);
      console.log(bookObjectId, "Book ObjectId created");

      const bookmark = user.bookmarks.find(b => {
          console.log(b.bookId, "Bookmark BookId");
          return b.bookId.equals(bookObjectId);
      });

      console.log(bookmark, "Found bookmark");
      if (!bookmark) {
          return res.status(404).json({ error: "Bookmark not found" });
      }

      return res.status(200).json({ bookmark:bookmark?.pageNumber });
  } catch (error) {
      console.error(`Error fetching bookmark: ${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
  }
};
export { addToFavourites, getFavourites, isFavourite, saveBookmark, getBookmark };
