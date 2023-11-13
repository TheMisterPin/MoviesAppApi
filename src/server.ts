import express,  {Express,Request,Response} from "express"
import cors from "cors"
import config from "./config/config";
import router from "./router";

const app: Express = express()
const corsOptions = {
    origin: config.app.ORIGIN
}

app.use(cors())
app.use(express.json())

app.use("/",router() )

app.get("/", (req:Request,res:Response)=>{
    res.status(200).json({message: "Welcome to the API World"})
})

app.get("/hi", (req:Request,res:Response)=>{
    res.status(200).json({message: "HI"})
})



export default app