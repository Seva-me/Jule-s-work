const User = require('./userschema');

// Renamed from createUser to signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
