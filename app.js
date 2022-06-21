import express from 'express'
import route from './routes/routes.js';
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import cookieparser from 'cookie-parser'

dotenv.config()

const application = express()
const port = process.env.PORT;

// application.use( express.static( "public" ) );

application.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
application.use(bodyparser.json())
application.use(cookieparser())

application.set('view-engine', 'ejs')
application.use("/assets",express.static("assets"))

application.use('/',route);
application.use(express.json());

application.listen(port,'localhost',()=>{
    console.log(`running... at port http://localhost:${port}`);
    
})
