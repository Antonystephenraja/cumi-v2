import React, { useContext ,useEffect,useState} from 'react';
import { ModeContext } from './ModeContext';
import xyma from '../imgaes/xyma_blue.png';
import reportpng from '../imgaes/reports-bg1.png';
import Select from 'react-select';
import axios from 'axios';
import './style.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const Reports = () => {
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [deviceId,Dropdowndata]=useState('')
  const[sensors,setSensors] =useState(null);
  const { isLightMode } = useContext(ModeContext);
useEffect(()=>{
  DropDown();

  const dropdown =setInterval(DropDown,5000)

  return()=>{
    clearInterval(dropdown);
  
  }
},[])

////////////DropDown sensors name////////////////////
const DropDown = async () => {
  try {
    const response = await fetch("https://cumi.xyma.live/backend/DeviceName");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const filteredSensors = data.filter(sensor => sensor.input.startsWith("XY"));
    if (filteredSensors.length === 0) {
      setSensors(['No data']);
    } else {
      setSensors(filteredSensors);
    }
  } catch (error) {
    console.error('Error fetching DeviceName:', error);
    setSensors(['No data']);
  }
};


  const handleDateChange = (event, dateType) => {
    const selectedDate = event.target.value;
    if (dateType === 'from') {
      setSelectedFromDate(selectedDate);
    } else if (dateType === 'to') {
      setSelectedToDate(selectedDate);
    }
  };


  
  const handleDownload = async () => {
    try {
      console.log(deviceId)
      const startDate = new Date(selectedFromDate);
      const endDate = new Date(selectedToDate);

      const response = await axios.post('https://cumi.xyma.live/backend/getdata',{device:deviceId,startdate:startDate,enddate:endDate});

      const apidata = response.data.data
      console.log(apidata)
     
 
      const doc = new jsPDF();
      const tableHeaders = [
        ['Device', 'Thickness', 'Battery', 'Device Temp', 'Time'],
      ];
  
      const tableData = apidata.map(item => {
        const rawBatteryPercentage = parseInt((parseInt(item.battery_status.split(",")[0]) - 265) * (100 - 0) / (540 - 265) + 0);
        const batteryPercentage = Math.max(Math.min(rawBatteryPercentage, 100), 0);
        const formattedBatteryPercentage = batteryPercentage < 0 ? 0 : (batteryPercentage > 100 ? 100 : batteryPercentage);
        return [
          item.device_name,
          item.thickness,
          formattedBatteryPercentage,
          item.device_status,
          item.timestamp,
        ];
      });
  
      doc.autoTable({
        head: tableHeaders,
        body: tableData,
      });
  
      // Save the PDF
      doc.save('data.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  const color_value = '#FDFDFD';
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor:'#2A77E8' ,
      borderColor:color_value,
      color: isLightMode ? 'white' : 'black',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2d2d2d' : isLightMode ? '#2d2d2d' : color_value,
      color: state.isSelected ? 'white' : isLightMode ? 'white' : 'black',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'red', 
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: '#fffff', 
    }),
  };

  const options = sensors
  ? sensors.map((sensor) => ({
      value: sensor._id, 
      label: sensor.input, 
    }))
  : [];
  const handleSensorChange = (selectedOption) => {
    if (selectedOption) {
      const sensorNumber = selectedOption.label; 
      Dropdowndata(sensorNumber);
    }
  };

  return (
<div className={`pt-[25px] h-screen px-[25px] 'bg-[#D0D9DB]'}`}>
  <h1 className='text-black mb-5 font-bold text-center'>Reports</h1>
  <div className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-md bg-white shadow-md`} style={{ height: 'auto' }}>
    <div className="flex report_align flex-col items-center md:items-start mb-4 md:mb-0 md:w-1/2">
      <img src={xyma} className='report_img mt-10 md:mt-0 w-40 ml-4 md:ml-10'  alt="XYMA" />
      <div className="grid grid-rows-4 mt-4 items-center ml-10 md:items-start justify-center">
      <div className="text-block flex items-center">
        <h1 className="mb-2 mr-2">Select a Device Id:</h1>
        <Select className='ml-4' options={options} styles={customStyles} onChange={handleSensorChange} />
      </div>
        <div className='mt-2 flex items-center'>
          <h1 className='text-block ml-1'>From Date :</h1>
          <input type="date" className="border rounded p-2 ml-5" onChange={(e) => handleDateChange(e, 'from')} />
        </div>
        <div className='mt-2 flex items-center'>
          <h1 className='text-block ml-6'>To Date :</h1>
          <input type="date" className="border rounded p-2 ml-5" onChange={(e) => handleDateChange(e, 'to')} />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={handleDownload}>Download</button> 
      </div>
    </div>
    <div className="flex flex-col items-center md:items-end w-full md:w-1/2 mt-4 md:mt-0">
      <img src={reportpng} style={{ width: '80vh', maxWidth: '100%' }} alt="Report" />
    </div>
  </div>
</div>

  );
};

export default Reports;
