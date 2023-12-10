const bcrypt = require("bcryptjs");
const connectToDatabase = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const {
  requestRefereshTokens,
  requestAccessTokens,
  verifyRefreshToken,
} = require("../middleware/jwt.js");
// Get all data
const getAll = async (req, res) => {
  try {
    const { User } = await connectToDatabase();
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Get data by ID
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const { User } = await connectToDatabase();
    const data = await User.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Create a new data
const create = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const id = uuidv4();
  try {
    const { User } = await connectToDatabase();
    const newUser = await User.create({
      id,
      email,
      password,
      first_name,
      last_name,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Update data by ID
const updateById = async (req, res) => {
  const { id } = req.params;
  const { email, password, first_name, last_name } = req.body;
  try {
    const { User } = await connectToDatabase();
    const data = await User.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    await data.update({ email, password, first_name, last_name });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Delete data by ID
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const { User } = await connectToDatabase();
    const data = await User.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    await data.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// // Create a new data
// const register = async (req, res) => {
//   const { email, password, first_name, last_name } = req.body;
//   const id = uuidv4();
//   try {
//     const { User } = await connectToDatabase();
//     const newUser = await User.create({
//       id,
//       email,
//       password,
//       first_name,
//       last_name,
//     });

//     const userJson = { ...newUser.toJSON() };
//     delete userJson.password;
//     res.status(200).json(userJson);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error " + error });
//   }
// };

// Create a new data
const register = async (req, res) => {
  var { email, password, first_name, last_name } = req.body;
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;
  try {
    const { User } = await connectToDatabase();
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        id,
        email,
        password,
        first_name,
        last_name,
      },
    });
    if (!created) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }

    const userJson = { ...newUser.toJSON() };
    delete userJson.password;
    res.status(200).json(userJson);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Get data by ID
const login = async (req, res) => {
  var { email, password } = req.body;
  try {
    const { User } = await connectToDatabase();

    const data = await User.findOne({
      where: {
        email: email,
      },
    });
    if (data) {
      const isPasswordValid = await bcrypt.compare(
        password,
        data.dataValues.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const accessToken = requestAccessTokens(data.dataValues);
      const refreshToken = requestRefereshTokens(data.dataValues);
      res.cookie("refreshToken", String(refreshToken), {
        httpOnly: true,
      });
      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

const referesh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken ?? req.body.refreshToken;

  if (!refreshToken || refreshToken == null) {
    return res.status(400).json({ error: "Refresh token is required." });
  }

  try {
    const decodedToken = verifyRefreshToken(refreshToken);

    const userId = decodedToken.id;

    const newAccessToken = requestAccessTokens({ id: userId });

    res.status(200).json({
      accessToken: newAccessToken,
      message: "New Token Generated Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken ?? req.body.refreshToken;

  if (!refreshToken || refreshToken == null) {
    return res.status(400).json({ error: "Refresh token is required." });
  }

  try {
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ message: "Token invalidated & logout successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" + error });
  }
};

module.exports = {
  referesh,
  login,
  register,
  logout,
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
