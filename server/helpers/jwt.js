const bcrypt = require("bcryptjs");

const hashedPassword = (password) => {
  return bcrypt.hashSync(password);
};

const date = async () => {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };
  return (timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
    dateStyle: "short",
    timeStyle: "short",
  }));
};
module.exports = { hashedPassword, date };
