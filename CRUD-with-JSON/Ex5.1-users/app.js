const yargs = require("yargs");
const users = require("./users");

yargs.version("1.1.0");

yargs.command({
  command: "create",
  describe: "Create a new user",
  builder: {
    name: {
      describe: "User name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "User email",
      demandOption: true,
      type: "string",
    },
    password: {
      describe: "User password",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    users.createUser(argv.name, argv.email, argv.password);
  },
});

yargs.command({
  command: "read",
  describe: "Read a user",
  builder: {
    id: {
      describe: "User ID",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    users.readUser(argv.id);
  },
});

yargs.command({
  command: "update",
  describe: "Update a user's password",
  builder: {
    id: {
      describe: "User password",
      demandOption: true,
      type: "string",
    },
    password: {
      describe: "User password",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    users.updatePassword(argv.id, argv.password);
  },
});

yargs.command({
  command: "delete",
  describe: "Delete a user",
  handler: function (argv) {
    users.deleteUser(argv.id);
  },
});

yargs.parse();
