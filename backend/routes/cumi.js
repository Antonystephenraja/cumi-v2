import express from 'express'
import { register,
    login,DeviceName,input,
    limit,limitdata,
    LastUpdated_data,fetchAllData,insertData,BulkData,
devicelast_datas,getdata} from "../controller/alldata.js";

const router = express.Router();




router.get("/fetchAllData",fetchAllData)
router.post("/input",input)


//fetch chart value api missing
router.get("/BulkData",BulkData)
router.get("/DeviceName",DeviceName)
router.post("/limit",limit)
router.post("/register", register)//useful
router.post("/login",login)//useful
router.get("/limitdata",limitdata)//** */
router.get("/LastUpdated_data",LastUpdated_data)
router.get("/insertData",insertData)//useful
router.get('/devicelast_datas',devicelast_datas)
router.post('/getdata',getdata)




export default router;