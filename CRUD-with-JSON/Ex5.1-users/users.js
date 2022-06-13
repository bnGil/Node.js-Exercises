const uniqid = require("uniqid");
const chalk = require("chalk");
const fs = require("fs");

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("users.json", dataJSON);
};

const createUser = (name, email, password) => {
  const users = loadUsers();
  const id = uniqid();
  const newUser = { id, name, email, password };
  const duplicateUsers = users.filter((user) => user.email === newUser.email);
  if (duplicateUsers.length === 0) {
    users.push(newUser);
    saveUsers(users);
    console.log(chalk.green.inverse("User created!"));
  } else {
    console.log(chalk.red.inverse("Email is already exist"));
  }
};

const readUser = (id) => {
  const users = loadUsers();
  const userToRead = users.find((user) => user.id === id);
  if (userToRead) {
    console.log(
      chalk.green.inverse(
        `Username: ${userToRead.name}, Email: ${userToRead.email}`
      )
    );
  } else {
    console.log(chalk.red.inverse("There is no user with this ID"));
  }
};

const deleteUser = (id) => {
  const users = loadUsers();
  const usersToKeep = users.filter((user) => user.id !== id);
  if (usersToKeep) {
    saveUsers(usersToKeep);
    console.log(chalk.green.inverse("Deleted user"));
  } else {
    console.log(chalk.red.inverse("There is no user with this ID"));
  }
};

const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

const updatePassword = (id, password) => {
  const users = loadUsers();
  const userToUpdateIdx = users.findIndex((user) => user.id === id);
  if (userToUpdateIdx !== -1) {
    users[userToUpdateIdx] = { ...users[userToUpdateIdx], password };
    saveUsers(users);
  } else {
    console.log("There is no user with this ID");
  }
};

module.exports = {
  createUser: createUser,
  readUser: readUser,
  deleteUser: deleteUser,
  updatePassword: updatePassword,
};
