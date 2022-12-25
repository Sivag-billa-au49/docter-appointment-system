const userModel = require("./UserModel");

async function getUser(email) {
  const user = await userModel.findOne({ email });
  if (user) {
    return user;
  }
}

async function postUser(userData) {
  try {
    await userModel.create(userData);
    return true;
  } catch (e) {
    return false;
  }
}

async function bookAppointment(email, appointment) {
  const user = await getUser(email);
  user.appointments.push(appointment);
  await user.save();
}

async function validateUser(email, password) {
  const user = await getUser(email);
  if (user) {
    return user.password == password;
  }
  return false;
}

module.exports = { getUser, postUser, bookAppointment, validateUser };
