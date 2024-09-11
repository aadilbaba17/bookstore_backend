import User from "../models/user.model.js";

const addToFavourites = async (req, res) => {
  const { book } = req?.body;
  const user = req?.user; // Keep the user from req

  try {
    // Fetch the user by their ID
    const foundUser = await User.findById({ _id: user?._id });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the user's favorites
    if (foundUser.favorites.includes(book?._id)) {
      return res.status(400).json({ message: "Book is already in favorites" });
    }

    // Add the book to the user's favorites array
    foundUser.favorites.push(book?._id);

    // Save the user with updated favorites
    await foundUser.save();

    // Send success response
    return res.status(200).json({ message: "Book added to favorites" });

  } catch (err) {
    // Handle errors
    console.log("Error occurred in user controller in addToFavourites:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addToFavourites };
