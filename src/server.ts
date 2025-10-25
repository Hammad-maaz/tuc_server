import app from "./app";
import http from "http";
import "./middlewears/sequelize";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT as number, "192.168.1.33", () => {
  console.log(`Server is running on port ${PORT} 192.168.1.33`);
});
