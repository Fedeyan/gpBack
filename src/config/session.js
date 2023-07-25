import { config } from "dotenv";
import session from "express-session";
config()

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
})

export default sessionConfig