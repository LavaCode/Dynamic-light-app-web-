import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import '../styles/HomeStyle.css';
// import { globalStyles } from '../styles/GlobalStyle';
import axios from 'axios';
import state from '../variables/states';
import logo from '../assets/logo/logo.png'
import { useMediaQuery } from 'react-responsive'

// const urlSmall = state.urlSmallGym;
// const urlLarge = state.urlLargeGym;  

const urlSmall = "";
const urlLarge = "";  

/*
/RemoteCommands/GetStoragePlaceDeckA
/RemoteCommands/GetStoragePlaceDeckB

/RemoteCommands/GetFadeValue
(255 is deck B)
(0 is deck A)
*/

function Home() {
  const [effectSmallGym, setEffectSmallGym] = useState('');
  const [deckValueSmallGym, setDeckValueSmallGym] = useState();
  const [effectLargeGym, setEffectLargeGym] = useState('');
  const [deckValueLargeGym, setDeckValueLargeGym] = useState();
  const navigate = useNavigate();
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    // useEffect(
    //     setTimeout(() => {
    //         getInfoSmall();
    //         getInfoLarge();
    //     }, 100)
    // );

  async function getInfoSmall() {
    try {
      const resultSmall = await axios.get(`${urlSmall}/RemoteCommands/GetFadeValue`);
      setDeckValueSmallGym(resultSmall.data);
    } catch(e) {
        alert(e + "\n\nHelaas! Het is niet gelukt bij de kleine zaal vanwege een netwerkprobleem! \n\nMogelijk ben je niet verbonden met WiFi \"DynamicFit\" of is de lichtcomputer offline.");
    }
  }

  async function getInfoLarge() {
    try {
      const resultLarge = await axios.get(`${urlLarge}/RemoteCommands/GetFadeValue`);
      setDeckValueLargeGym(resultLarge.data);
    } catch(e) {
      alert(e + "\n\nHelaas! Het is niet gelukt bij de grote zaal vanwege een netwerkprobleem! \n\nMogelijk ben je niet verbonden met WiFi \"DynamicFit\" of is de lichtcomputer offline.");
    }
  }

//   useEffect(() => {
//     if (deckValueSmallGym < 127) {
//       for (let i in state.effectsSmallGym) {
//         if (state.effectsSmallGym[i].num === `A=S1P${effectSmallGym}`) {
//             state.smallGymEffect = state.effectsSmallGym[i].name;
//         }
//       }
//     } else if( deckValueSmallGym >= 127) {
//       for (let i in state.effectsSmallGym) {
//         if (state.effectsSmallGym[i].num === `B=S2P${effectSmallGym}`) {
//             state.smallGymEffect = state.effectsSmallGym[i].name;
//         }
//       }
//     } 
//   }, [effectSmallGym])

//   useEffect(() => {
//     if (deckValueLargeGym < 127) {
//       for (let i in state.effectsLargeGym) {
//         if (state.effectsLargeGym[i].num === `A=S1P${effectLargeGym}`) {
//             state.largeGymEffect = state.effectsLargeGym[i].name;
//         }
//       }
//     } else if( deckValueLargeGym >= 127) {
//       for (let i in state.effectsLargeGym) {
//         if (state.effectsLargeGym[i].num === `B=S2P${effectLargeGym}`) {
//             state.largeGymEffect = state.effectsLargeGym[i].name;
//         }
//       }
//     } 
//   }, [effectLargeGym])

//   useEffect(() => {
//     getEffectSmall();
//   }, [deckValueSmallGym])

//   useEffect(() => {
//     getEffectLarge();
//   }, [deckValueLargeGym])

  async function getEffectSmall() {
    console.log('Check small');
    if (deckValueSmallGym < 127) {
      const deckDataA = await axios.get(`${urlSmall}/RemoteCommands/GetStoragePlaceDeckA`);
      if (deckDataA.data === "undefined") {
        setEffectSmallGym('error');
      } else {
        setEffectSmallGym(deckDataA.data)
        console.log(deckDataA.data)
      }
    } else if (deckValueSmallGym >= 127) {
      const deckDataB = await axios.get(`${urlSmall}/RemoteCommands/GetStoragePlaceDeckB`);
      if (deckDataB.data === "undefined") {
        setEffectSmallGym('error');
      } else {
        setEffectSmallGym(deckDataB.data)
      }
    }
  }

  async function getEffectLarge() {
    console.log('Check large');
    if (deckValueLargeGym < 127) {
      const deckDataA = await axios.get(`${urlLarge}/RemoteCommands/GetStoragePlaceDeckA`);
      if (deckDataA.data === "undefined") {
        setEffectLargeGym('error');
      } else {
        setEffectLargeGym(deckDataA.data)
        console.log(deckDataA.data)
      }
    } else if (deckValueLargeGym >= 127) {
      const deckDataB = await axios.get(`${urlLarge}/RemoteCommands/GetStoragePlaceDeckB`);
      if (deckDataB.data === "undefined") {
        setEffectLargeGym('error');
      } else {
        setEffectLargeGym(deckDataB.data)
        console.log(deckDataB.data)
      }
    }
  }

  return (
    <div className='section-container'>
        <div className='section-title'>
          <div className='section-title-text'>Dynamic fit control app</div>
        </div>
        {isPortrait ? 
          <div className='controls'>
            <div className='main-description'>Kies de zaal om te bedienen</div>
            <div className='button-section'>
              <a className='button' onClick={() => navigate('/smallgym')}>
                <div className='button-text'>Kleine Zaal</div>
              </a>
              <a className='button' onClick={() => navigate('/largegym')}>
                <div className='button-text'>Grote Zaal</div>
              </a>
            </div>
            {/* <div className='status-container'> */}
              <div className='active-scene-container'>
                <div className='active-scene-text'>Active scene:</div>
                <div className='active-scene-text'>Active scene:</div>
              </div>
              <div className='active-scene-response-container'>
                <div className='active-scene-response-text'>
                  <div className='active-scene-response-effect'>{state.smallGymEffect}</div>
                </div>
                <div className='active-scene-response-text'>
                  <div className='active-scene-response-effect'>{state.largeGymEffect}</div>
                </div>
              </div>
            {/* </div> */}
          </div>
        :
          <div className='orientation-message-home'>The app can only be used in portrait orientation.<br /> Please rotate your device.</div>
        }
        <div className='logo-container'>
          <a className='logo' onClick={() => navigate('/help')}>
            <img
              className='subLogo'
              src={logo}
              alt="logo"
            />
          </a>
        </div>
    </div>
  );
}

export default Home;
  