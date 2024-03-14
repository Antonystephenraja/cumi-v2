import React, { useEffect, useState } from 'react';
import { FaMousePointer, FaTemperatureHigh } from 'react-icons/fa';
import { TbDeviceMobileVibration } from "react-icons/tb";
import { AiOutlineSound } from "react-icons/ai";
import axios from 'axios';
import './style.css';


const Model = ({alldata_list,device_name}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const XY00001Data = device_name.find(item => item.devicename === "XY00001");
  const XY00002Data = device_name.find(item => item.devicename === "XY00002");
  const XY00003Data = device_name.find(item => item.devicename === "XY00003");
  const XY00004Data = device_name.find(item => item.devicename === "XY00004");
  const XY00005Data = device_name.find(item => item.devicename === "XY00005");

// console.log(alldata_list)
  const device1_thickness = parseInt(XY00001Data ?XY00001Data.limit  :"N/A");
  const device2_thickness = parseInt(XY00002Data ?XY00002Data.limit  :"N/A");
  const device3_thickness = parseInt(XY00003Data ?XY00003Data.limit  :"N/A");
  const device4_thickness = parseInt(XY00004Data ?XY00004Data.limit  :"N/A");
  const device5_thickness = parseInt(XY00005Data ?XY00005Data.limit  :"N/A");
  

  const device1 = alldata_list["XY00001"];
  const device2 = alldata_list["XY00002"];
  const device3 = alldata_list["XY00003"];
  const device4 = alldata_list["XY00004"];
  const device5 = alldata_list["XY00005"];



  const device1_data = device1 ? device1.thickness : 'N/A';
  const device2_data = device2 ? device2.thickness : 'N/A';
  const device3_data = device3 ? device3.thickness : 'N/A';
  const device4_data = device4 ? device4.thickness : 'N/A';
  const device5_data = device5 ? device5.thickness : 'N/A';



  const device1_convert = parseInt(device1_data)


  const limitvalue = ((device1_convert-0)*(100-0))/(device1_thickness-0)+0;
  const rounded_value_device1 = limitvalue.toFixed(2);
  const rounded_percentage_device1 = parseFloat(rounded_value_device1);
  const device1_thickness_int = parseInt(rounded_percentage_device1);
  const device2_convert = parseInt(device2_data)


  
  const device2_limitvalue2 = ((device2_convert-0)*(100-0))/(device2_thickness-0)+0;
  const rounded_value_device2 = device2_limitvalue2.toFixed(2);
  const rounded_percentage_device2 = parseFloat(rounded_value_device2);
  const device2_thickness_int = parseInt(rounded_percentage_device2);

  const device3_convert = parseInt(device3_data)
  const device3_limitvalue2 = ((device3_convert-0)*(100-0))/(device3_thickness-0)+0;
  const rounded_value_device3 = device3_limitvalue2.toFixed(2);
  const rounded_percentage_device3 = parseFloat(rounded_value_device3);
  const device3_thickness_int = parseInt(rounded_percentage_device3);

  const device4_convert = parseInt(device4_data)
  const device4_limitvalue2 = ((device4_convert-0)*(100-0))/(device4_thickness-0)+0;
  const rounded_value_devic4 = device4_limitvalue2.toFixed(2);
  const rounded_percentage_device4 = parseFloat(rounded_value_devic4);
  const device4_thickness_int = parseInt(rounded_percentage_device4);


  const device5_convert = parseInt(device5_data)
  const device5_limitvalue2 = ((device5_convert-0)*(100-0))/(device5_thickness-0)+0;
  const rounded_value_devic5 = device5_limitvalue2.toFixed(2);
  const rounded_percentage_device5 = parseFloat(rounded_value_devic5);
  const device5_thickness_int = parseInt(rounded_percentage_device5);


  const handleColumnClick = async (id) => {
    try{
      let modifiedId = id.replace(":", "");
      localStorage.setItem("DeviceId", modifiedId);
    }catch(error){
      console.error('Error saving data:', error.message || error);
          if (error.response) {
            console.error('Server responded with:', error.response.data);
          }
    }
  };
  const finaly_thickness = device1_data > device1_thickness
  console.log(device2_thickness_int)



  const renderColumns = (data) => {
    return data.map((item, index) => (
      <div
        key={index}
        className={`grid grid-cols-3 m-2 gap-1 h-22 overflow-hidden ${index === 0 ? 'first-item' : ''}`}>
          <p
          className={`flex items-center   justify-center rounded-lg text-[10px] text-xs text-center font-bold hover:bg-gray-300 cursor-pointer relative ${
            index === 0 ? 'text-red-500' : 'text-[#333]'
          }`}
          onClick={index > 0 ? () => handleColumnClick(item.id, item.thickness) : undefined}>
          {item.id}
          <FaMousePointer className='hidden absolute top-1/2 right-1/2 transform translate(50%, -50%)' />
        </p>
    <p className={`cols-sapn-2 rounded-lg border-2 w-[60px] thickness_width mr-2 text-center text-[11px] font-bold hover:border-[#2d2d2d] cursor-pointer relative 
    ${index === 0 ? 'text-red-500' : 'bg-[#8aecf3]'}
    ${rounded_percentage_device1 < 50 && item.id === 'XY00001:' ? 'bg-red-500' :
  
    (rounded_percentage_device1 >= 50 && rounded_percentage_device1 <= 75 && item.id === 'XY00001:') ? 'bg-[#ED7014]' :
    (device1_thickness_int >= 101 && rounded_percentage_device1 <= 1000 && item.id === 'XY00001:')? 'bg-sky-400':
    (device1_data > device1_thickness === true &&item.id === 'XY00001:')?'bg-sky-400':
    (rounded_percentage_device1 > 75 && item.id === 'XY00001:') ? 'bg-green-500' : ''}

    ${rounded_percentage_device2 < 50 && item.id === 'XY00002:' ? 'bg-red-500' :
  
    (rounded_percentage_device2 >= 50 && rounded_percentage_device2 <= 75 && item.id === 'XY00002:') ? 'bg-[#ED7014]' : 
    (device2_thickness_int >= 101 && rounded_percentage_device2 <= 1000 && item.id === 'XY00002:')? 'bg-sky-400':
    (parseFloat(device2_data) > device2_thickness === true &&item.id === 'XY00002:')?'bg-sky-400':
    (rounded_percentage_device2 >= 76 &&  rounded_percentage_device2 <= 100 && item.id === 'XY00002:') ? 'bg-green-500' : ''}

    ${rounded_percentage_device3 < 50 && item.id === 'XY00003:' ? 'bg-red-500' :
    (device3_thickness_int >= 101 && rounded_percentage_device3 <= 1000 && item.id === 'XY00003:')? 'bg-sky-400':
    (rounded_percentage_device3 >= 50 && rounded_percentage_device3 <= 75 && item.id === 'XY00003:') ? 'bg-[#ED7014]' :
    (parseFloat(device3_data) > device3_thickness === true &&item.id === 'XY00003:')?'bg-sky-400':
    (rounded_percentage_device3 > 75 && item.id === 'XY00003:') ? 'bg-green-500' : ''}

    ${rounded_percentage_device4 < 50 && item.id === 'XY00004:' ? 'bg-red-500' :
    (device4_thickness_int >= 101 && rounded_percentage_device4 <= 1000 && item.id === 'XY00004:')? 'bg-sky-400':
    (rounded_percentage_device4 >= 50 && rounded_percentage_device4 <= 75 && item.id === 'XY00004:') ? 'bg-[#ED7014]' :
    (parseFloat(device4_data) > device4_thickness === true &&item.id === 'XY00004:')?'bg-sky-400':
    (rounded_percentage_device4 > 75 && item.id === 'XY00004:') ? 'bg-green-500' : ''}

    ${rounded_percentage_device5 < 50 && item.id === 'XY00005:' ? 'bg-red-500' :
    (device5_thickness_int >= 101 && rounded_percentage_device5 <= 1000 && item.id === 'XY00005:')? 'bg-sky-400':
    (rounded_percentage_device5 >= 50 && rounded_percentage_device5 <= 75 && item.id === 'XY00005:') ? 'bg-[#ED7014]' :
    (parseFloat(device4_data) > device4_thickness &&item.id === 'XY00005:')?'bg-sky-400':
    (rounded_percentage_device5 > 75 && item.id === 'XY00005:') ? 'bg-green-500' : ''}
    `}
      onClick={index > 0 ? () => handleColumnClick(item.id, item.thickness) : undefined}>
      {item.thickness}
      <FaMousePointer className='hidden absolute top-1/2 right-1/2 transform translate(50%, -50%)' />
    </p>
  </div>
    ));
  };

  const data1 = [
    { id: 'ID', thickness: 'THICKNESS'},
    { id: 'XY00001:', thickness: `${rounded_percentage_device1 >100 ?'⚠️' : rounded_percentage_device1 + '%'}`},
    { id: 'XY00002:', thickness: `${rounded_percentage_device2 > 100 ? '⚠️': rounded_percentage_device2 + '%'}`},
    { id: 'XY00003:', thickness: `${rounded_percentage_device3 > 100 ? '⚠️': rounded_percentage_device3 + ' %'}` },
    { id: 'XY00004:', thickness: `${rounded_percentage_device4 > 100 ? '⚠️': rounded_percentage_device4 + '%'}` },
    { id: 'XY00005:', thickness: `${rounded_percentage_device5 > 100 ? '⚠️' : rounded_percentage_device5 + '%'}`},
    { id: 'XY00006:', thickness: 'N/A'},
    { id: 'XY00007:', thickness: 'N/A'},
    { id: 'XY00008:', thickness: 'N/A'},
    { id: 'XY00009:', thickness: 'N/A'},
    { id: 'XY00010:', thickness: 'N/A'},
    // Add more items as needed

  ];
  const data2 = [
    { id: 'ID', thickness: 'THICKNESS'},
    { id: 'XY00011:', thickness: 'N/A'},
    { id: 'XY00012:', thickness: 'N/A'},
    { id: 'XY00013:', thickness: 'N/A'},
    { id: 'XY00014:', thickness: 'N/A'},
    { id: 'XY00015:', thickness: 'N/A'},
    { id: 'XY00016:', thickness: 'N/A'},
    { id: 'XY00017:', thickness: 'N/A'},
    { id: 'XY00018:', thickness: 'N/A'},
    { id: 'XY00019:', thickness: 'N/A'},
    { id: 'XY00020:', thickness: 'N/A'},
    // Add more items as needed

  ];
  const data3 = [
    { id: 'ID', thickness: 'THICKNESS'},
    { id: 'XY00021:', thickness: 'N/A'},
    { id: 'XY00022:', thickness: 'N/A'},
    { id: 'XY00023:', thickness: 'N/A'},
    { id: 'XY00024:', thickness: 'N/A'},
    { id: 'XY00025:', thickness: 'N/A'},
    { id: 'XY00026:', thickness: 'N/A'},
    { id: 'XY00027:', thickness: 'N/A'},
    { id: 'XY00028:', thickness: 'N/A'},
    { id: 'XY00029:', thickness: 'N/A'},
    { id: 'XY00030:', thickness: 'N/A'},
    // Add more items as needed

  ];
  const data4 = [
    { id: 'ID', thickness: 'THICKNESS' },
    { id: 'XY00031:', thickness: 'N/A' },
    { id: 'XY00032:', thickness: 'N/A' },
    { id: 'XY00033:', thickness: 'N/A' },
    { id: 'XY00034:', thickness: 'N/A' },
    { id: 'XY00035:', thickness: 'N/A' },
    { id: 'XY00036:', thickness: 'N/A' },
    { id: 'XY00037:', thickness: 'N/A' },
    { id: 'XY00038:', thickness: 'N/A' },
    { id: 'XY00039:', thickness: 'N/A' },
    { id: 'XY00040:', thickness: 'N/A' },
    // Add more items as needed
  ];

  return (
    <div className='grid md:grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-4 sm:h-[280px] model overflow-x-auto'>
      <div className='border rounded-lg bg-[#fce6cac7]'>{renderColumns(data1)}</div>
      <div className='border rounded-lg bg-[#fce6cac7]'>{renderColumns(data2)}</div>
      <div className='border rounded-lg bg-[#fce6cac7]'>{renderColumns(data3)}</div>
      <div className='border rounded-lg bg-[#fce6cac7]'>{renderColumns(data4)}</div>
    </div>
  );
};

export default Model;
