import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import sessionConfig from "./src/config/session.js";
import passport from "passport";
import { createServer } from "http";
import cors from "cors";
import sequelize, {
  Categories,
  Orders,
  Products,
  ProductsCategories,
  User,
  UserData,
  UserRole,
  UserRoleJoin,
} from "./src/config/database.js";
import socketIoService from "./src/config/socket-io.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoriesRoutes from "./src/routes/categoriesRoutes.js";
import LocalAuth from "./src/config/passport.js";
import authRoutes from "./src/routes/authRoutes.js";
import session from "express-session";
import {
  guestPermissions,
  superAdminPermissions,
} from "./src/config/server-config.js";
import ordersRoutes from "./src/routes/ordersRoutes.js";
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
async function initializeServer() {
  const syncUser = true;

  const syncUserData = true;
  const syncProducts = false;
  const syncCategories = false;
  const syncProductsCategories = false;
  const syncUserRole = true;
  const syncUserRoleJoin = true;
  const syncOrder = true;

  try {
    await sequelize.authenticate();
    console.log("La base de datos funciona correctamente.");

    if (syncUser) {
      await User.sync({ force: true });
      console.log(`Tabla: User -> sincronizada. Force: ${syncUser}`);
    }

    if (syncUserData) {
      await UserData.sync({ force: true });
      console.log(`Tabla: UserData -> sincronizada. Force: ${syncUserData}`);
    }

    if (syncProducts) {
      await Products.sync({ force: true });
      console.log(`Tabla: Products -> sincronizada. Force: ${syncProducts}`);
    }

    if (syncCategories) {
      await Categories.sync({ force: true });
      console.log(
        `Tabla: Categories -> sincronizada. Force: ${syncCategories}`
      );
    }

    if (syncProductsCategories) {
      await ProductsCategories.sync({ force: true });
      console.log(
        `Tabla: ProductsCategories -> sincronizada. Force: ${syncProductsCategories}`
      );
    }

    if (syncUserRole) {
      await UserRole.sync({ force: true });
      console.log(`Tabla: UserRole -> sincronizada. Force: ${syncUserRole}`);

      await UserRole.create({
        name: "guest",
        permissions: guestPermissions.getPermissions(),
      });

      if (syncUserRoleJoin) {
        await UserRoleJoin.sync({ force: true });
      }

      //admin

      await UserRole.create({
        name: "superadmin",
        permissions: superAdminPermissions.getPermissions(),
      });
    }

    if (syncOrder) {
      await Orders.sync({ force: syncOrder });
    }
    const adminData = await UserData.create();
    const admin = await User.create({
      nombre: "Admin",
      contraseña: "Aezakmi11",
      correo: "developer.basilorien@gmail.com",
    });
    const adminRole = await UserRole.findOne({ where: { id: 2 } });
    const adminOrder = await Orders.create();

    await admin.setUserRole(adminRole);
    await adminData.setUser(admin);
    await admin.setOrder(adminOrder);
    console.log("bienvenido admin");
  } catch (error) {
    console.error("Error al sincronizar las tablas:", error);
  }
}

io.on("connect", function (socket) {
  socket.emit("connected");
});

app.get("/", function (req, res) {
  return res.json(req.isAuthenticated());
});

app.get("/debug/all_users", async function (req, res) {
  const result = await User.findAll({
    include: [UserData, UserRole],
  });

  return res.json(result);
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoriesRoutes);
app.use("/orders", ordersRoutes);

initializeServer(true, true, true, true, true, true, true).then(function () {
  httpServer.listen(PORT, console.log(`Server running on port ${PORT}`));
});
