import express from 'express'
import route from './routes/routes.js';
import dotenv from 'dotenv'

dotenv.config()

const application = express()
const port = process.env.PORT;

application.set('view-engine', 'ejs')
application.use("/assets",express.static("assets"))

application.use('/',route);
application.use(express.json());

application.listen(port,'localhost',()=>{
    console.log(`running... at port http://localhost:${port}`);
})