import LoginModel from "../components/login.js";
import InputModel from "../components/devicename.js";
import limitModel from "../components/limit.js";
import DataModel from "../components/data.js";
import axios from 'axios'
import  jwt from 'jsonwebtoken';
import  bcrypt from  'bcryptjs';

export const register = async(req,res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await LoginModel.create({
            email: req.body.email,
            password: newPassword,
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: 'Duplicate email'})
    }
  }


  export const login =async (req, res) => {
    const user = await LoginModel.findOne({
        email: req.body.email,
    })
    if(!user) {
        return {status: 'error', error: 'Invalid User'}
    }
    const isPasswordVaild = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if (isPasswordVaild) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )
        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }
  }


  export const input =  async (req, res) => {
    try {
      const existingData = await InputModel.findOne({ input: req.body.input });
  
      if (existingData) {
        console.log('Data already exists in the database');
        return res.status(409).json({ status: 'already_exists' });
      } else {
        await InputModel.create({
          input: req.body.input,
        });
    
        res.json({ status: 'ok' });
        console.log('Data stored successfully');
      }
    } catch (error) {
      console.error('Error storing data in the database:', error);
      res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }

export const DeviceName = (req,res)=>{
    InputModel.find({}).then(data=>{
      if(data.length>0){
        res.status(200).json(data)
      }else{
        res.status(404).json({error:"No data found"});
      }
    }).catch(err=>res.status(500).json({error:err.message}))
  }




export const limit=  async (req, res) => {
    try {
      
      const { limit, devicename,time } = req.body;
     
      console.log("time",time)
      if (!limit) {
        return res.status(400).json({ error: 'Missing required parameter "limit"' });
      }
      const newData = {
        limit: limit,
        deviceName: devicename,
        time:time,
      };
      await limitModel.create(newData);
      return res.status(200).json({ message: 'Data successfully saved' });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }


  export const fetchAllData =  (req, res) => {
    DataModel.find({}) 
      .then(data => {
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ error: 'No data found' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }

  export const LastUpdated_data = async (req, res) => {
    try {
      const deviceNames = ['XY00001', 'XY00002','XY00003','XY00004'];
      const promises = deviceNames.map(deviceName => {
        return DataModel.find({ device_name: deviceName })
          .sort({ _id: -1 })
          .limit(1);
      });
      Promise.all(promises).then(results => {
        const responseData = {};
        results.forEach((data, index) => {
          const deviceName = deviceNames[index];
          if (data.length > 0) {
            responseData[deviceName] = data[0];
          } else {
            responseData[deviceName] = null;
          }
        });
        res.status(200).json(responseData);
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  



  export const BulkData = async (req, res) => {
    try {
      const data1 = await DataModel.find({ device_name: 'XY00001' }).sort({_id: -1}).limit(500);
      const data2 = await DataModel.find({ device_name: 'XY00002' }).sort({_id: -1}).limit(500);
      const data3 = await DataModel.find({ device_name: 'XY00003' }).sort({_id: -1}).limit(500);
      const data4 = await DataModel.find({ device_name: 'XY00004' }).sort({_id: -1}).limit(500);
      const data5 = await DataModel.find({ device_name: 'XY00005' }).sort({_id: -1}).limit(500);
      const data6 = await DataModel.find({ device_name: 'XY00006' }).sort({_id: -1}).limit(500);
      const data7 = await DataModel.find({ device_name: 'XY00007' }).sort({_id: -1}).limit(500);
      const data8 = await DataModel.find({ device_name: 'XY00008' }).sort({_id: -1}).limit(500);
      const data9 = await DataModel.find({ device_name: 'XY00009' }).sort({_id: -1}).limit(500);
      const data10 = await DataModel.find({ device_name: 'XY00010' }).sort({_id: -1}).limit(500);
  
      if (data1.length > 0 || data2.length > 0 ) {
        const formattedData1 = data1.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData2 = data2.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));

        const formattedData3 = data3.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        
        const formattedData4 = data4.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData5 = data5.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData6 = data6.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData7 = data7.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData8 = data8.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        })); 
         const formattedData9 = data9.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData10 = data10.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));

        res.status(200).json({
          XY00001: formattedData1,
          XY00002: formattedData2,
          XY00003: formattedData3,
          XY00004: formattedData4,
          XY00005: formattedData5,
          XY00006: formattedData6,
          XY00007: formattedData7,
          XY00008: formattedData8,
          XY00009: formattedData9,
          XY00010: formattedData10,
        });
      } else {
        res.status(404).json({ error: 'No data found for sensors' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }




  export const insertData = async (req, res) => {
    const {device_name, device_status, thickness, signal_strength, battery } = req.query;
    
    if (!device_name ||!device_status || !thickness || !signal_strength || !battery) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    try {
      const limitResponse = await axios.get('https://cumi.xyma.live/backend/limitdata');
      if (limitResponse.status === 200) {
        const device1 = limitResponse.data.find(item => item.devicename === "XY00001")
        const device2 = limitResponse.data.find(item => item.devicename === "XY00002")
        const device3 = limitResponse.data.find(item => item.devicename === "XY00003")
        const device4 = limitResponse.data.find(item => item.devicename === "XY00004")
        const device5 = limitResponse.data.find(item => item.devicename === "XY00005")
        const limit = limitResponse.data.limt;
        const $ = "$";
        const spl = "#";
        const char = "*";
        const at ="@";

        const date = new Date();
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        };
        const formattedTimestamp = date.toLocaleString('en-US', options);

        const responseData = [`#,${device1.devicename},${device1.limit},${device1.time},#,${device2.devicename},${device2.limit},${device2.time},#,${device3.devicename},${device3.limit},${device3.time},#,${device4.devicename},${device4.limit},${device4.time},#,${device5.devicename},${device5.limit},${device5.time}`];
        //const responseData = [String($),String(device1.devicename),String(device1.limit),Number(day),String(char), String(spl),String(device2.devicename),String(device2.limit),Number(day),String(at), String(char),String(device3.devicename),String(device3.limit),Number(day),String($), String(spl),String(device4.devicename),String(device4.limit),Number(day),String(char)];
        const newData = {
          device_name:device_name,
          device_status: device_status,
          thickness: thickness,
          signal_strength: signal_strength,
          battery_status: battery,
          timestamp: formattedTimestamp,
        };
        await DataModel.create(newData);
        res.status(200).json(responseData);
      } else {
        res.status(500).json({ error: 'Failed to retrieve limit data' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


export const devicelast_datas = async (req, res) => {
  try {
      const deviceNames = ['XY00001', 'XY00002', 'XY00003', 'XY00004', 'XY00005', 'XY00006', 'XY00007', 'XY00008', 'XY00009', 'XY00010'];
      const bulkData = [];
      
      for (const deviceName of deviceNames) {
          const data = await DataModel.find({ device_name: deviceName }).sort({ _id: -1 }).limit(30);
          bulkData.push(data);
      }
      res.status(200).json(bulkData);

  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
}


export const limitdata = (req, res) => {
  limitModel.aggregate([
    { $sort: { _id: -1 } }, 
    { $group: { _id: "$deviceName", data: { $first: "$$ROOT" } } }, 
    { $replaceRoot: { newRoot: "$data" } }  
  ])
    .then(data => {
      if (data.length > 0) {
        const result = data.map(item => ({ limit: item.limit, devicename: item.deviceName,time:item.time }));
        res.status(200).json(result);
      } else {
        res.status(400).json({ error: 'No data found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
}

function parseTimestamp(timestampString) {
  const [, month, day, year, time] = timestampString.match(/(\d{2})\/(\d{2})\/(\d{4}), (\d{1,2}:\d{2} (?:AM|PM))/);
  const [hourMinute, period] = time.split(' ');
  const [hour, minute] = hourMinute.split(':');

  let parsedMonth = parseInt(month) - 1; // Month is zero-based in Date object
  if (period === 'PM' && parseInt(hour) !== 12) {
    hour = parseInt(hour) + 12; // Convert PM hour to 24-hour format
  } else if (period === 'AM' && parseInt(hour) === 12) {
    hour = '00'; // Handle 12 AM case
  }

  return new Date(year, parsedMonth, day, hour, minute);
}

export const getdata = async (req, res) => {
  try {
    const a = req.body.device;
    const startdate = new Date(req.body.startdate);
    const enddate = new Date(req.body.enddate);

    startdate.setHours(0);
    startdate.setMinutes(0);
    enddate.setHours(23); // Set end date to end of the day
    enddate.setMinutes(59); // Set end time to end of the day

    const formattedStartDate = `${(startdate.getMonth() + 1).toString().padStart(2, '0')}/${startdate.getDate().toString().padStart(2, '0')}/${startdate.getFullYear()}, ${startdate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const formattedEndDate = `${(enddate.getMonth() + 1).toString().padStart(2, '0')}/${enddate.getDate().toString().padStart(2, '0')}/${enddate.getFullYear()}, ${enddate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    const api = await fetch("https://cumi.xyma.live/backend/fetchAllData");
    const info = await api.json();
    const flattenedInfo = info.flat();

    const startDate = new Date(formattedStartDate);
    const endDate = new Date(formattedEndDate);

    const isWithinRange = (timestamp) => {
      const date = new Date(timestamp);
      return date >= startDate && date <= endDate;
    };

    const DeviceDataInRange = flattenedInfo.filter(item => item.device_name === a && isWithinRange(item.timestamp));
    res.json({ data: DeviceDataInRange });

  } catch (error) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
}
