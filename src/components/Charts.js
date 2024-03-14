import React from "react";
import { Line } from "react-chartjs-2";
import './style.css';
import { Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement } from "chart.js";
ChartJS.register(
  LineElement,CategoryScale,LinearScale,PointElement
)

const Charts = (device_data) => {

  
const filterdata = device_data.device_data;
const thicknessValues = filterdata.map(item => item.thickness);
const reversedThicknessValues = thicknessValues.reverse();



const timestamp = filterdata.map(item => {
  const date = new Date(item.timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
});

const Thickness_times = timestamp.reverse();
const thcikness_data = reversedThicknessValues?reversedThicknessValues :"N/A";



const time = Thickness_times?Thickness_times :"N/A";

  const data={
    labels:time,
    datasets:[
      {
        data:thcikness_data,
        backgroundColor:'transparent',
        borderColor:'#08B8FF',
        pointBorderColor:'transparent',
      }
    ]
  }
  const options={
  }
  return (
    <div className="bg-white ml-2 rounded-lg ">
    <div className="">
      <Line className="ml-10 w-96 h-32" data={data} options={options}></Line>
    </div>
    </div>
    
  );
};

export default Charts;