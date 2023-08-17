import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-activity";
import logo from '../assets/logo/logo.png'
import '../styles/LauncherStyle.css';
import "react-activity/dist/Spinner.css";
import { db } from '../db.js';
import state from '../variables/states'

const defaultUrlSmall = '192.168.68.106'
const defaultUrlLarge = '192.168.68.105'
const defaultPin = '1234'

function Launcher() {
  const [loading, toggleLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSavedData();
    setTimeout(() => {
        navigate("/home");
        toggleLoading(false);
    }, 2500);
  });

  async function loadSavedData() {
    loadSmallData();
    loadLargeData();
    loadPinData();
  }

  async function loadSmallData() {
    const ipSmallArray = await db.ipSmall.toArray();
    // if (ipSmallArray.length > 0){ 
    //     console.log(ipSmallArray[ipSmallArray.length -1].ipValueSmall);
    // } else {
    //     console.log('none')
    // }

    if (ipSmallArray.length === 0) {
        loadInitialIpSmall(defaultUrlSmall); //load default url
    } else {
        const dbIp = ipSmallArray[ipSmallArray.length -1].ipValueSmall //get last item set
        state.urlSmallGym = dbIp;
    }
  }

  async function loadLargeData() {
    const ipLargeArray = await db.ipLarge.toArray();
    // if (ipLargeArray.length > 0){ 
    //     console.log(ipLargeArray[ipLargeArray.length -1].ipValueLarge);
    // } else {
    //     console.log('none')
    // }

    if (ipLargeArray.length === 0) {
        loadInitialIpLarge(defaultUrlLarge); //load default url
    } else {
        const dbIp = ipLargeArray[ipLargeArray.length -1].ipValueLarge //get last item set
        state.urlLargeGym = dbIp;
    }
  }

  async function loadPinData() {
    const pincodeArray = await db.pincode.toArray();
    // if (pincodeArray.length > 0){ 
    //     console.log(pincodeArray[pincodeArray.length -1].pincodeValue);
    // } else {
    //     console.log('none')
    // }

    if (pincodeArray.length === 0) {
        loadInitialPin(defaultPin); //load default pin
    } else {
        const dbPin = pincodeArray[pincodeArray.length -1].pincodeValue //get last item set
        state.pincode = dbPin;
    }
  }

  async function loadInitialIpSmall(ipValueSmall) {
    try {
        const ip = await db.ipSmall.add({
            ipValueSmall
        });
        state.urlSmallGym = defaultUrlSmall;
    } catch(e) {
        console.error(e);
    }
  } 

  async function loadInitialIpLarge(ipValueLarge) {
    try {
        const ip = await db.ipLarge.add({
            ipValueLarge
        });
        state.urlLargeGym = defaultUrlLarge;
    } catch(e) {
        console.error(e);
    }
  } 

  async function loadInitialPin(pincodeValue) {
    try {
        const pin = await db.pincode.add({
            pincodeValue
        });
        state.pincode = defaultPin;
    } catch(e) {
        console.error(e);
    }
  } 


  return (
    <>
        <div className='container'>
            <div>
                <img className='logo-container-launcher' src={logo} alt="logo"/>
            </div>
            
            <div>
                {loading && 
                    <>
                        <Spinner className='indicator-container'/>
                        <div className='subtext'> Warming up...</div>
                    </>
                }      
            </div>
        </div>
    </>
  )
}

export default Launcher;
