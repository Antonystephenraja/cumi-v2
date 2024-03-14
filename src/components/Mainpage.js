import React, { useState, useEffect } from 'react';
import './style.css';
import Model from './Model';
import Rcards from './Rcards';
import RTables from './RTables';
import Charts from './Charts';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Mainpage = ({Device_data,Alldata_list,Device_name,Devicename}) => {

  return (
    <div>
      <Navbar 
        device_data={Device_data}
        Device_name = {Devicename}
        alldata_list={Alldata_list}
      />
      <ToastContainer/>
      {/* Main content */}
      <div className='px-[25px] main_height h-[89vh]'>
        <div className='sm:grid-rows-2 md:grid-rows-2 lg:grid-rows-2'>
          <div className='sm:grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
            <Model 
            alldata_list={Alldata_list}
            device_name = {Device_name}
            />
            <div>
              <div>
                <Rcards 
                device_data={Device_data}
                devicename = {Devicename}
                />
                {/* <Dashboard/> */}
              </div>
            </div>
          </div>
          <div className='sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2'>
            <div>
              <RTables device_data={Device_data} />
            </div>
            <div>
              <Charts device_data={Device_data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
