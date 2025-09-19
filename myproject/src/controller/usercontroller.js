const User = require('./userschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // 2. Validate email format (simple regex)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // 3. Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // 4. Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    // 5. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 7. Generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 8. Return the response
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });

  } catch (error) {
    // 9. Handle other errors
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

const login = async (req, res) => {
  // Placeholder for login logic
  res.status(200).json({ message: 'Login placeholder' });
};

const profile = async (req, res) => {
  // Placeholder for profile logic
  res.status(200).json({ message: 'Profile placeholder' });
};

module.exports = {
  signup,
  login,
  profile
};
