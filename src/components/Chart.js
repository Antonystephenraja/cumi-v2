import React from "react";
import ReactApexChart from "react-apexcharts";
import Select from 'react-select';
const Chart = (chartdata) => {
  const filterdata = chartdata.chartdata;
  const thickness = filterdata.map(item => item.thickness);
  const devicename = filterdata.map(item => item.device_name);

  const battery = filterdata.map(item => {
    const values = item.battery_status.split(','); 
    const firstValue = parseInt(values[0]);
    let Battery_percentage = (firstValue - 265) * (100 - 0) / (540 - 265) + 0;
    Battery_percentage = Battery_percentage > 100 ? 100 : Battery_percentage < 0 ? 0 : Battery_percentage;
    Battery_percentage = Number(Battery_percentage.toFixed(2));
    return Battery_percentage; 
  });

  const time = filterdata.map(item => item.timestamp);

  const options = {
    series: [{
      name: 'Thickness',
      data: thickness
    }, {
      name: 'Battery',
      data: battery
    }],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: time,
      labels: {
        style: {
          colors: '#ffffff' 
        }
      }
    },
    yaxis: {
      title: {
        text: 'Thickness (0 t0 100mm) & Battery (%)',
        style: {
          color: '#ffffff' 
        }
      },
      labels: {
        style: {
          colors: '#ffffff' 
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    },
    legend: {
      labels: {
        colors: '#ffffff' 
      }
    },
  };
  const Data_freequences = [
    { label: 'XY00001', value: 'XY00001' },
    { label: 'XY00002', value: 'XY00002' },
    { label: 'XY00003', value: 'XY00003' },
    { label: 'XY00004', value: 'XY00004' },
    { label: 'XY00005', value: 'XY00005' },
  ];
  const customStyles_2 = {
    control: (provided) => ({
      ...provided,
      // backgroundColor: '#2d2d2d',
      borderColor:'#2d2d2d',
      color: 'black',
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
  const handle_dropdown_Change = async(selectedOption) => {
    localStorage.setItem("ChartId",selectedOption.value)
  }
  return (
    <div className="chart_page">
      <div id="chart" className="bg-[#42426e] ml-4 mr-4 mt-4 rounded-lg ">
        <div className="flex justify-center items-center">
          <div className="flex">
          <h3 className="font-bold mt-2 text-white">Select the DeviceId:</h3>
          <Select  className="w-22 ml-2 mt-1 h-10" options={Data_freequences} styles={customStyles_2} isSearchable={true}  placeholder={`${devicename[0]}`} onChange={handle_dropdown_Change} />
          </div>
         
        </div>
        <ReactApexChart options={options} series={options.series} type="bar" height={450} />
      </div>
    </div>
  );
};

export default Chart;
