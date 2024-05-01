import User from "../models/User.models.js";


export const register = async (req, res) => {
  try {
    const { name, email, password} = req.body;

  
      // check if the user already exists
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "User already exists" });
      }

      // create a new user
      const user = await User.create({ name, email, password});
      const token = user.generateToken();
      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({ user, token });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    
      //check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check if the password is correct
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = user.generateToken();
      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({ user, token });
    

      
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req,res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


