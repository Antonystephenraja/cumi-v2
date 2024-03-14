import React,{useState,useEffect} from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from '../App';
import Mainpage from '../components/Mainpage';
import Pdf from '../components/Pdf'
import Chart from '../components/Chart';
import Upgradeplan from '../components/Upgradeplan';
import Reports from '../components/Reports';
import Setting from '../components/Setting';
import Login from '../components/login';
import ProtectedRoute from './../components/ProtectedRoute';
import axios from 'axios';

const Router = () => {
  const [alldata, Alldata] = useState([]);
  const[all_device_data,All_device_data]=useState([])
  const [device, device_data] = useState([]);
  const[deviceID,Device_Id]=useState([]);
  const [chartId,chartData]=useState([]);

  useEffect(() => {
    fetchData();
    
    datas();
    const data = setInterval(fetchData, 2000);
    const thickness_data =setInterval(datas,2000);
  
    return () => {
      clearInterval(data);
      clearInterval(thickness_data);
    };
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch('https://cumi.xyma.live/backend/devicelast_datas');
      const info = await response.json();
      const flattenedInfo = info.flat();
      const device_names = localStorage ? localStorage.getItem("DeviceId"):"N/A";
      const chartId = localStorage? localStorage.getItem("ChartId"):"N/A";
      const lastUpdatedData = {};
      
      flattenedInfo.forEach(item => {
        const deviceName = item.device_name;
        if (["XY00001", "XY00002", "XY00003", "XY00004","XY00005"].includes(deviceName)) {
          if (!lastUpdatedData[deviceName] || item.updatedAt > lastUpdatedData[deviceName].updatedAt) {
            lastUpdatedData[deviceName] = item;
          }
        }
      });


      const DeviceData = flattenedInfo.filter(item => item.device_name === device_names);
      const Chartdata= flattenedInfo.filter(item=>item.device_name === chartId);
     
      device_data(DeviceData);
      Device_Id(device_names);
      Alldata(lastUpdatedData);
      chartData(Chartdata);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const updated_project_name = localStorage.getItem('Device');
  // console.log(updated_project_name)


//must needed
  const xy00001Data = all_device_data.find(device => device.devicename === deviceID );
  const datas = async () => {
    try {
      const response = await axios.get('https://cumi.xyma.live/backend/limitdata');
      const all_device_data = response.data;
      
      All_device_data(all_device_data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
        <BrowserRouter>
          <Routes>
          <Route path='login' element={<Login/>}/>
          <Route path='/' element = {<ProtectedRoute />}>
              <Route path='/' element={<App/>}>
                  <Route index element={<Mainpage
                  Device_data={device}
                   Alldata_list={alldata}
                   Device_name = {all_device_data}
                   Devicename = {xy00001Data}
                 
                  />}/>
                  <Route path='chart' element={<Chart
                    chartdata={chartId}
                  />}/>
                  {/* <Route path='upgrade' element={<Upgradeplan/>}/> */}
                  <Route path='report' element={<Reports/>}/>
                  <Route path='setting' element={<Setting/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}
export default Router
