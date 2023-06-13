const Joi = require('joi');
const { registerUser, loginUser, logoutUser, getUserData, editProfile, resetPassword } = require('../controllers/authController');

const registerRoute = {
  method: 'POST',
  path: '/register',
  handler: async (request, h) => {
    const { email, password } = request.payload;
    try {
      const uid = await registerUser(email, password);
      return h.response({
        data: { message: 'User registered', uid },
        message: '',
        code_respon: 200,
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return h.response({
        data: {},
        message: error.message,
        code_respon: 400,
      });
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

const loginRoute = {
  method: 'POST',
  path: '/login',
  handler: async (request, h) => {
    const { email, password } = request.payload;
    try {
      const { uid, email: userEmail, token: userToken } = await loginUser(email, password);
      return h.response({
        data: { uid, email: userEmail, token: userToken },
        message: '',
        code_respon: 200,
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      return h.response({
        data: {},
        message: 'Error logging in user',
        code_respon: 500,
      });
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
      return h.response({
        data: {},
        message: 'Password reset email sent',
        code_respon: 200,
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      return h.response({
        data: {},
        message: error.message,
        code_respon: 400,
      });
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
        return h.response({
          data: { email: data.email, phone: data.phone },
          message: '',
          code_respon: 200,
        });
      } else {
        return h.response({
          data: {},
          message: 'No user data found',
          code_respon: 404,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return h.response({
        data: {},
        message: 'Error fetching user data',
        code_respon: 500,
      });
    }
  },
};

const logoutRoute = {
  method: 'POST',
  path: '/logout',
  handler: async (request, h) => {
    try {
      await logoutUser();
      return h.response({
        data: {},
        message: 'User logged out successfully',
        code_respon: 200,
      });
    } catch (error) {
      console.error('Error logging out user:', error);
      return h.response({
        data: {},
        message: 'Error logging out user',
        code_respon: 400,
      });
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
    const { email, password, currentEmail, currentPassword } = request.payload;

    try {
      const result = await editProfile(uid, email, password, currentEmail, currentPassword);
      if (result) {
        return h.response({
          data: {},
          message: 'Profile updated successfully',
          code_respon: 200,
        });
      } else {
        return h.response({
          data: {},
          message: 'User not authorized to edit this profile',
          code_respon: 403,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return h.response({
        data: {},
        message: 'Error updating profile',
        code_respon: 500,
      });
    }
  },
};

module.exports = [registerRoute, loginRoute, userInfoRoute, logoutRoute, editProfileRoute, resetPasswordRoute];
