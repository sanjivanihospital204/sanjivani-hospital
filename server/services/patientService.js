const schema = require('../database/schema');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'my_secret_key';
const utils = require('../helper/util');

const createNewPatient = async (data) => {
  try {
    const user = new schema.patientSchema(data);
    const savedUser = await user.save();
    if (savedUser) {
      return {
        message: 'User Created successfully',
        status: 'created'
      };
    } else {
      return { message: 'Something went wrong', status: 'unDone' };
    }
  } catch (error) {
    throw new Error('Failed to create a user: ' + error.message);
  }
};


const userLogin = async (data) => {
  const findUser = await schema.userSchema.findOne(data);

  if (findUser) {
    const secretKey = JWT_SECRET_KEY;
    const options = { expiresIn: '2d' };
    const payload = {
      name: findUser.name,
      email: findUser.email,
    };
    const token = jwt.sign(payload, secretKey, options);
    return {
      validUser: true,
      message: 'Login successfully',
      token: token,
      user: {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      },
    };
    // return findUser;
  } else {
    return {
      validUser: false,
      message: 'Invalid Credential',
    };
  }
};

const updateUserByEmail = async (data) => {
  return await schema.userSchema
    .updateOne({ email: data.email }, { $set: data })
    .then((result) => {
      if (result) {
        return { status: 'done' };
      } else {
        return { status: 'unDone' };
      }
    })
    .catch((err) => console.warn(err));
};

const verifyOtp = async (data) => {
  const { email, otp, name } = data;
  const existUser = await schema.userSchema.findOne({ email: email, otp: otp });
  if (existUser) {
    if (utils.isWithinMinutes(existUser.otpCreateTime, 5)) {
      const verifiedUserData = {
        email: email,
        verified: true,
      };
      const verifiedUser = await updateUserByEmail(verifiedUserData);
      if (verifiedUser?.status === 'done') {
        const secretKey = JWT_SECRET_KEY;
        const options = { expiresIn: '2d' };
        const payload = {
          name: name,
          email: email,
        };
        const token = jwt.sign(payload, secretKey, options);
        return {
          token: token,
          user: {
            id: existUser._id,
            name: existUser.name,
            email: existUser.email,
          },
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const verifyToken = async (data) => {
  const { token } = data;

  if (!token) {
    return { valid: false, message: 'Unable To Authenticate !' };
  }

  try {
    const isValidToken = jwt.verify(token, JWT_SECRET_KEY);
    if (isValidToken) {
      return { valid: true };
    }
  } catch (error) {
    console.error(error);
    return { valid: false, message: 'Unable To Authenticate !' };
  }
};

module.exports = {
  createNewPatient,
  userLogin,
  updateUserByEmail,
  verifyOtp,
  verifyToken,
};
