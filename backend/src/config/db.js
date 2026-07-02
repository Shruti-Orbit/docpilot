const dns = require("dns");
const mongoose = require("mongoose");

const configureDnsForAtlas = (uri) => {
  if (!uri.startsWith("mongodb+srv://")) {
    return;
  }

  const currentServers = dns.getServers();
  const onlyLocalDns = currentServers.every((server) =>
    ["127.0.0.1", "::1"].includes(server)
  );

  if (onlyLocalDns) {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
  }
};

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing from backend/.env");
    }

    configureDnsForAtlas(mongoUri);

    await mongoose.connect(mongoUri);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
