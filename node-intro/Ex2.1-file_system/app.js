const fs = require("fs");

// Create a new txt file using the same fs module method we have learned before.
fs.writeFileSync("ex2-1.txt", "Hi, I am Gil");

// Create a copy of the newly created txt file using a method from the fs module.
fs.copyFileSync("ex2-1.txt", "ex2-1_copy.txt");

// Rename one of the files using a method from the fs module.
fs.renameSync("ex2-1_copy.txt", "newName.txt");

//Get a list of all the file names of the current directory using a method from the fs module.
console.log(fs.readdirSync(__dirname));
const files = fs.readdirSync(__dirname);
files.forEach((file) => {
  console.log(file);
});
