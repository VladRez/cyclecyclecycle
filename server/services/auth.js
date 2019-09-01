const User = require("../models/User");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validateLoginInput = require("../validations/login");
const validateRegisterInput = require("../validations/register");

const register = async data => {
  try {
    
    const { message, isValid } = validateRegisterInput(data);
    
    if (!isValid) {
      throw new Error(message);
    }

    const { fname, lname, email, password } = data;
    
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User(
      {
        fname,
        lname,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);
      
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const user = await User.findById(data._id);
    token = "";
    loggedIn = false;
    return { token, loggedIn, ...user._doc };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;

    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new Error("This user does not exist");

    const validPWord = await bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!validPWord) throw new Error("Invalid Password");

    const token = jwt.sign({ id: existingUser._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...existingUser._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;

    const decode = jwt.verify(token, keys.secretOrKey);
    const { id } = decode;

    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, login, logout, verifyUser };
