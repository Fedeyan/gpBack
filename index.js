import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import sessionConfig from "./src/config/session.js";
import passport from "passport";
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
import LocalAuth from "./src/config/passport.js";
import authRoutes from "./src/routes/authRoutes.js";
import session from "express-session";
config({ path: "./.env" });

const app = express();
const httpServer = createServer(app, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});
const io = socketIoService(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

//---------------------app.use---------------------------
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: "dfmjfikds",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(function (req, res, next) {
  (req.io = io), next();
});

app.use(passport.initialize());
app.use(passport.session());

//passport
passport.use(LocalAuth);

passport.serializeUser(function (user, cb) {
  try {
    return cb(null, user);
  } catch (error) {
    cb(error);
  }
});

passport.deserializeUser(function (user, cb) {
  try {
    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
});

//----------------------routes--------------------------

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

  await ProductsCategories.sync({ force: pcat });
  console.log(`Tabla:  ProductsCategories -> sincronizada. Force: ${pcat}`);
}

io.on("connect", function (socket) {
  socket.emit("connected");
});

app.get("/", function (req, res) {
  return res.json(req.isAuthenticated());
});
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoriesRoutes);

initializeServer(false, false, true, true, true).then(function () {
  httpServer.listen(PORT, console.log(`Server running on port ${PORT}`));
});
