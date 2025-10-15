import { Sequelize } from "sequelize";

// Create a new Sequelize instance
const sequelize = new Sequelize("tuc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
