import React, { useContext, useEffect,useRef,useState } from "react";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";
import Carddrop from "./Carddrop";
import CUMI from "../imgaes/CUMI0908.png";
import { circularProgressClasses } from "@mui/material";
import Select from 'react-select';
import { TbRulerMeasure } from "react-icons/tb";
import './style.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./css/rcard.css"






const circle = {
  height: "25px",
  width: "25px",
  borderRadius: "50%",
  display: "inline-block",
};



const Data_freequences = [
  { label: '5 Min', value: '5' },
  { label: '1 Hrs', value: '60' },
  { label: '1 Day', value: '1440' },
  { label: '7 Days', value: '10080' },
  { label: '15 Days', value: '21600' },
];
const customStyles_2 = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#2A77E8',
    borderColor:'#2d2d2d',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    

  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#D3D2D1', 
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#fffff', 
  }),
};



const Rcards = ({device_data,devicename}) => {

  const[dropdowndata,setDropdown]=useState([]);
  const inputRef = useRef(null);
  const device_Datas = device_data[0]
  const deviceName = device_Datas ? device_Datas.device_name: 'N/A';
  const thickness = device_Datas ? device_Datas.thickness : 'N/A';
  const device_temp = device_Datas ? device_Datas.device_status : 'N/A';
  const signal = device_Datas ? device_Datas.signal_strength : 'N/A';
  const battery = device_Datas ? device_Datas.battery_status : 'N/A';
  const time = device_Datas ? device_Datas.timestamp : 'N/A';
  const device_thickness = devicename ? devicename.limit : "N/A";
  const usertime=devicename?devicename.time:"N/A"


  const intconvert = parseInt(thickness)

  const limitvalue = ((intconvert-0)*(100-0))/(device_thickness-0)+0;
  const rounded_value = limitvalue.toFixed(2);
  const rounded_percentage = parseFloat(rounded_value);
  const thickness_int = parseInt(rounded_percentage);


let time_data;
if(parseInt(usertime)===1440){
  time_data = "1 Day"
}else if(parseInt(usertime)===5){
  time_data="5 Min"
}
else if(parseInt(usertime)===60){
  time_data="1 hrs"
}
else if(parseInt(usertime)===10080){
  time_data="7 Days"
}
else if(parseInt(usertime)===21600){
  time_data="15 Days"
}

//battery percentage
const Current_battery = battery.split(",");
const Battery_percentage = (Current_battery[0] - 265) * (100 - 0) / (540 - 265) + 0;
const Battery_Percentage_Value =parseInt(Battery_percentage)
 
//convert a signal to percentage

const signal_percentage= (signal - 0)*(100 - 0 )/(32 - 0)+0;
const signal_percentage_convert = parseInt(signal_percentage)


const successtoast =()=>{
  if (toast) {
    toast.success("Success Notification !", {
      position: "top-right",
    });
  } else {
    console.error("toast object is undefined");
  }
}

const DFerrortoast =()=>{
  if (toast) {
    toast.error("Please Select the Clockify!", {
      position: "top-right",
    });
  } else {
    console.error("toast object is undefined");
  }
}
const Max_thickness_errortoast =()=>{
  if (toast) {
    toast.error("Please Enter a Thickness!", {
      position: "top-right",
    });
  } else {
    console.error("toast object is undefined");
  }
}
const Device_error =()=>{
  if (toast) {
    toast.error("Please Select a Device!", {
      position: "top-right",
    });
  } else {
    console.error("toast object is undefined");
  }
}



  const handleSubmit = async(event)=>{
 
    event.preventDefault();
    const inputValue = inputRef.current.value;
    const ints = parseInt(inputValue);
    if ((dropdowndata == null || dropdowndata.length === 0) && (inputValue == null || inputValue.trim() === '') && (deviceName == null || deviceName.trim() === '')) {
      alert("please Select the Device Id , Data Frequency,Max thickness");
    } else if (dropdowndata == null || dropdowndata.length === 0) {
      DFerrortoast()
    } else if (inputValue == null || inputValue.trim() === '') {
      Max_thickness_errortoast()
    }else if (deviceName == null || deviceName.trim() === '') {
      Device_error()
    } else {
      try{
        const response = await fetch('https://cumi.xyma.live/backend/limit',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({limit:inputValue, devicename:deviceName,time:dropdowndata}),
        });
        if(response.ok){
          inputRef.current.value = ""
          successtoast()
        }else{
          console.error('Error storing value in the Database');
        }
      }
      catch(error){
        console.error(error);
      }
    }
  }

  const handle_dropdown_Change = async(selectedOption) => {
    try {
      let dayValue;
      if (selectedOption.value === "5"){
        dayValue = 5;
      }
      else if(selectedOption.value === "60"){
        dayValue = 60;
      }
      else if(selectedOption.value === "1440"){
        dayValue = 1440;
      }
      else if(selectedOption.value === "10080"){
        dayValue = 10080;
      }
      else if(selectedOption.value === "21600"){
        dayValue = 21600;
      }
      setDropdown(dayValue);
    } catch (error) {
      console.error(error);
    }
  }

  const finaly_thickness = thickness > device_thickness


  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex items-end justify-end">
        <p className="text-xs font-bold mb-3 mr-2">Last-Data :<span className="text-red-500 font-bold">{time}</span></p>
        <Select  className="w-44" options={Data_freequences} styles={customStyles_2} isSearchable={true}  placeholder={`Clockify -${time_data} `} onChange={handle_dropdown_Change} />
        <input
          type="text"
          ref={inputRef}
          className="ml-3 rounded-lg w-[20%] h-9 border border-black"
          placeholder="Thickness"
        />
        <button onClick={handleSubmit} 
          type="button"
          className="mr-3 ml-3 inline-block w-20 h-9 font-bold text-center bg-gradient-to-tl from-purple-700 to-pink-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-white"
        >
          SUBMIT
        </button>
        {/* ${rounded_percentage <= 50 ? 'bg-red-500' :  rounded_percentage <= 75 ? 'bg-[#ED7014]': rounded_percentage <=100 ? 'bg-[#1AC48B]' : 'bg-[#0A99DF]'} */}
        {/* ${rounded_percentage <= 50 ? 'bg-red-500' :  rounded_percentage <= 75 ? 'bg-[#ED7014]': rounded_percentage <=100 ? 'bg-[#28a33d]' :rounded_percentage>device_thickness? "bg-[#0A99DF]": 'bg-[#0A99DF]'}  */}
      </div>
      <div className="mt-2">
        <div className={`flex card border-4 flex-col items-center p-4  rounded-lg shadow-md mb-2 sm:flex-row  ${finaly_thickness === true ? "bg-[#0A99DF]":rounded_percentage <= 50 ? 'bg-red-500' :  rounded_percentage <= 75 ? 'bg-[#ED7014]': rounded_percentage <=100 ? 'bg-[#28a33d]' : 'bg-[#0A99DF]'} `}>
          <div className={`p-3 mr-4 text-blue-500 bg-blue-100 rounded-full sm:mb-0`}>
            <svg className="h-10" fill="currentColor" viewBox="-1 -2 18 18">
              <TbRulerMeasure />
            </svg>
          </div>
          <div className="text-center flex-grow"> {/* Center content vertically */}
            <div className="text-2xl font-medium text-gray-600">
              <p className="text-2xl font-bold card_size text-white mt-1">{finaly_thickness === true?"⚠️ OverLimit":parseInt(thickness) === 0 ? "⚠️ ER01" :parseInt(thickness) === 999 ?"⚠️ ER02" : thickness_int + "%"}</p>
              <p className="mt-1 text-lg text-white">Thickness</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-white text-right">
            <p className="mt-2 sm:mt-0 ">{thickness}/{device_thickness}mm</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3 sm:grid-cols-1 mb-5">
        <div className={`flex flex-col border-4 ${device_temp > 65 ? 'border-red-500 blink-border' : 'border-white' } card items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row`}>
          <div className="p-3 mb-2 mr-4 text-green-500 bg-green-100 rounded-full sm:mb-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="-1 -2 18 18">
              <FaTemperatureLow />
            </svg>
          </div>
          <div className="text-sm font-medium  text-gray-600 text-center sm:text-left">
            
            <p className="text-lg  font-bold card_size text-gray-700 mt-1">{device_temp} ℃</p>
            <p className="mt-1 text-sm">Device Temp</p>
          </div>
        </div>

        <div className={`flex flex-col border-4 ${signal_percentage_convert === 0?'border-red-500 blink-border':'border-white'} border-white card items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row`}>
          <div className="p-3 mb-2 mr-4 text-red-500 bg-red-100 rounded-full sm:mb-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="-1 -2 18 18">
              <FaSignal />
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
            <p className="text-lg card_size font-bold text-gray-700 mt-1">{signal_percentage_convert}%</p>
            <p className="mt-1">Signal Strength</p>
          </div>
        </div>
        {/* <div className={`flex flex-col border-4 ${Battery_Percentage_Value <25 ?'border-red-500 blink-border':'border-white'}  card items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row  `}> */}
        <div className={`flex flex-col border-4 ${Battery_Percentage_Value < 25 ? 'border-red-500 blink-border' : 'border-white'}  card items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row`}>

          <div className="p-3 mb-2 mr-4 text-yellow-500 bg-yellow-100 rounded-full sm:mb-0">
            <svg
              className="w-6 h-6 items-center"
              fill="currentColor"
              viewBox="-1 -2 18 18"
            >
              <PiBatteryFullFill />
            </svg>
          </div>
          <div className="text-sm font-medium text-gray-600 text-center sm:text-left">
          <p className="text-lg card_size font-bold text-gray-700 mt-1">{Battery_Percentage_Value >= 100 ? "100 %" : Battery_Percentage_Value < 0 ? "0 %" : Battery_Percentage_Value + "%"}</p>

            <p className="mt-1">Battery Level</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rcards;
