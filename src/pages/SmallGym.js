import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import '../styles/SmallGymStyle.css';
import axios from 'axios';
import state from '../variables/states';
import { useMediaQuery } from 'react-responsive'

//const urlSmall = 'http://192.168.1.148'; //temp
const urlSmall = `http://${state.urlSmallGym}`;  

function SmallGym(props) {
    const [ activeEffect, setActiveEffect ] = useState();
    const navigate = useNavigate();
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    
    useEffect(() => {
        state.smallGymEffect = activeEffect
    }, [activeEffect])

    function printEffect(number) {
        for (let i in state.effectsSmallGym) {
            if (state.effectsSmallGym[i].num == number) {
                try {
                    setActiveEffect(state.effectsSmallGym[i].name);
                } catch(e) {
                    console.error(e)
                }
            }
        }
    }

    async function fireScene(num) {
        try {
            printEffect(num);
            // await axios.post(`${urlSmall}/RemoteCommands/SetStorageDeck${num}`);
        } catch(e) {
            alert(e + "\n\nHelaas! Het is niet gelukt vanwege een netwerkprobleem! \n\nMogelijk ben je niet verbonden met WiFi \"DynamicFit\" of is de lichtcomputer offline.");
        }
    }
    
    return (
        <div className='section-container'>
            {isPortrait ? 
            <>
            <div className='header-container' onClick={() => navigate('/largegym')}>
                <a className='header-text'>Kleine Zaal</a>
            </div>
            <div className='scene-list'>
                    {state.effectsSmallGym.map ((effect) => {
                        return (
                            <ul key={effect.key} className='scene-container'>
                                <div className='scene-text'>{effect.key}. {effect.name}</div>
                                <a className='scene-button' onClick={() => fireScene(`${effect.num}`)}>
                                    <div className='scene-button-text'>fire</div>
                                </a>
                            </ul>
                        )
                    })}
            </div>
            <div className='footer-container' onClick={() => navigate('/home')}>
                <div className='footer-text'>Terug</div>
            </div>
            </>
            : 
            <div className='orientation-message-small-gym'>The app can only be used in portrait orientation.<br /> Please rotate your device.</div>   
            }
        </div>
    )
}

export default SmallGym;