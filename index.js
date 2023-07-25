import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import sessionConfig from "./src/config/session.js";
import { createServer } from "http";
import cors from "cors";
import sequelize, {
  Categories,
  Products,
  ProductsCategories,
  User,
  UserData,
} from "./src/config/database.js";
import socketIoService from "./src/config/socket-io.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoriesRoutes from "./src/routes/categoriesRoutes.js";

config({ path: "./.env" });

const app = express();
const httpServer = createServer(app);
const io = socketIoService(httpServer);


//---------------------app.use---------------------------
app.use(json())
app.use(urlencoded({extended: true}))
app.use(sessionConfig);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  (req.io = io), next();
});

//----------------------routes--------------------------
app.get("/", function(req,res) {
    return res.send("Hello World!")
})
app.use("/products", productRoutes)
app.use("/categories", categoriesRoutes)
const { PORT } = process.env;




//-----start------------------------------------------------------
async function initializeServer(user, userdata, products, categories, pcat) {
  await sequelize.authenticate();
  console.log("La base de datos funciona correctamente.");

  await User.sync({ force: user });
  console.log(`Tabla: User -> sincronizada. Force: ${user}`);

  await UserData.sync({ force: userdata });
  console.log(`Tabla: UserData -> sincronizada. Force: ${user}`);

  await Products.sync({ force: userdata });
  console.log(`Tabla: Products -> sincronizada. Force: ${products}`);

  await Categories.sync({ force: userdata });
  console.log(`Tabla: Categories -> sincronizada. Force: ${categories}`);

  await ProductsCategories.sync({force: pcat})
  console.log(`Tabla:  ProductsCategories -> sincronizada. Force: ${pcat}`);

}

io.on("connect", function(socket) {
  socket.emit("connected")
})


initializeServer(true, true, true, true, true).then(function () {
  httpServer.listen(PORT, console.log(`Server running on port ${PORT}`));
});
