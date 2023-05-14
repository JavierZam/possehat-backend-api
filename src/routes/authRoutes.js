const Joi = require('joi');
const { registerUser, loginUser, logoutUser, getUserData, editProfile, resetPassword } = require('../controllers/authController');

const registerRoute = {
  method: 'POST',
  path: '/register',
  handler: async (request, h) => {
    const { email, password, phone } = request.payload;
    try {
      const user = await registerUser(email, password, phone);
      return h.response({ message: 'User registered', uid: user.uid }).code(201);
    } catch (error) {
      console.error('Error registering user:', error);
      return h.response({ message: error.message }).code(400);
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        phone: Joi.string().required(),
      }),
    },
  },
};

const loginRoute = {
  method: 'POST',
  path: '/login',
  handler: async (request, h) => {
    const { email, password } = request.payload;
    try {
      const user = await loginUser(email, password);
      return h.response({ uid: user.uid, email: user.email }).code(200);
    } catch (error) {
      console.error('Error logging in user:', error);
      return h.response('Error logging in user').code(500);
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),
    },
  },
};

const resetPasswordRoute = {
  method: 'POST',
  path: '/reset-password',
  handler: async (request, h) => {
    const { email } = request.payload;
    try {
      await resetPassword(email);
      return h.response({ message: 'Password reset email sent' }).code(200);
    } catch (error) {
      console.error('Error resetting password:', error);
      return h.response({ message: 'Error resetting password' }).code(500);
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
      }),
    },
  },
};

const userInfoRoute = {
  method: 'GET',
  path: '/user/{uid}',
  handler: async (request, h) => {
    const { uid } = request.params;
    try {
      const data = await getUserData(uid);
      if (data) {
        return h.response({ email: data.email, phone: data.phone }).code(200);
      } else {
        return h.response('No user data found').code(404);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return h.response('Error fetching user data').code(500);
    }
  },
};

const logoutRoute = {
  method: 'POST',
  path: '/logout',
  handler: async (request, h) => {
    try {
      await logoutUser();
      return h.response({ message: 'User logged out successfully' }).code(200);
    } catch (error) {
      console.error('Error logging out user:', error);
      return h.response({ message: 'Error logging out user' }).code(400);
    }
  },
};

const editProfileRoute = {
  method: 'PUT',
  path: '/edit-profile/{uid}',
  options: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).optional(),
        phone: Joi.string().optional(),
        currentEmail: Joi.string().email().required(),
        currentPassword: Joi.string().min(8).required(),
      }),
      params: Joi.object({
        uid: Joi.string().required(),
      }),
    },
  },
  handler: async (request, h) => {
    const { uid } = request.params;
    const { email, password, phone, currentEmail, currentPassword } = request.payload;

    try {
      const result = await editProfile(uid, email, password, phone, currentEmail, currentPassword);
      if (result) {
        return h.response({ message: 'Profile updated successfully' }).code(200);
      } else {
        return h.response({ message: 'User not authorized to edit this profile' }).code(403);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return h.response({ message: 'Error updating profile' }).code(500);
    }
  },
};

module.exports = [registerRoute, loginRoute, userInfoRoute, logoutRoute, editProfileRoute, resetPasswordRoute];
