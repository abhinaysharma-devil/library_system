import express from 'express'
import path, {resolve} from 'path'
import bodyParser from 'body-parser';
import db from '../config/connectdb.js'
import {index,login,signup} from '../controllers/controller.js'
// router.set(conn)

const router = express.Router()
const __dirname=resolve();
router.use(express.json())

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

// ===============================================================

router.get("/", index)

router.get("/login", login)

router.get("/signup", signup)

export default router