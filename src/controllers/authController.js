const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } = require('firebase/auth');
const { doc, setDoc, getDoc, updateDoc } = require('firebase/firestore');
const { auth, db } = require('../utils/firebase');

const registerUser = async (email, password, phone) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = doc(db, 'users', user.uid);
    await setDoc(userDoc, {
      email,
      phone,
    });
    return user;
  } catch (error) {
    console.log('Error registering user:', error);
    if (error.code === 'auth/email-already-in-use') {
      // Handle email already in use error
      throw new Error('The email address is already in use by another account.');
    } else {
      throw error;
    }
  }
};

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log('Error logging in user:', error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log('Error logging out user:', error);
    throw error;
  }
};

const getUserData = async (uid) => {
  try {
    const userDoc = doc(db, 'users', uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.log('Error getting user data:', error);
    throw error;
  }
};

const editProfile = async (uid, email, password, phone, currentEmail, currentPassword) => {
  try {
    // Sign in the user to get the user object
    const { user } = await signInWithEmailAndPassword(auth, currentEmail, currentPassword);

    // Compare the signed-in user's UID with the provided UID
    if (user.uid === uid) {
      // Update user data in Firestore
      const userDoc = doc(db, 'users', uid);
      const updateData = {};
      if (phone) updateData.phone = phone;
      if (email) updateData.email = email;

      await updateDoc(userDoc, updateData);

      // Update authentication information
      if (email) await updateEmail(user, email);
      if (password) await updatePassword(user, password);

      return true;
    } else {
      // The signed-in user's UID does not match the provided UID
      return false;
    }
  } catch (error) {
    console.log('Error editing profile:', error);
    throw error;
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserData, editProfile };
