import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import '../styles/LargeGymStyle.css';
import axios from 'axios';
import state from '../variables/states';
import { useMediaQuery } from 'react-responsive'

//const urlLarge = 'http://192.168.1.148'; //temp
const urlLarge = `http://${state.urlLargeGym}`;  

function LargeGym(props) {
    const [ activeEffect, setActiveEffect ] = useState();
    // const [ editEffect, setEditEffect ] = useState();
    // const [ editScreen, setEditScreen ] = useState(false);
    const navigate = useNavigate();
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    
    useEffect(() => {
        state.largeGymEffect = activeEffect
    }, [activeEffect])

    function printEffect(number) {
        for (let i in state.effectsLargeGym) {
            if (state.effectsLargeGym[i].num == number) {
                try {
                    setActiveEffect(state.effectsLargeGym[i].name);
                } catch(e) {
                    console.error(e)
                }
            }
        }
    }

    async function fireScene(num) {
        printEffect(num);
        try {
            await axios.post(`${urlLarge}/RemoteCommands/SetStorageDeck${num}`);
        } catch(e) {
            alert(e + "\n\nHelaas! Het is niet gelukt vanwege een netwerkprobleem! \n\nMogelijk ben je niet verbonden met WiFi \"DynamicFit\" of is de lichtcomputer offline.");
        }
    }

    // async function editScene(num) {
    //     for (let i in state.effectsLargeGym) {
    //         if (state.effectsLargeGym[i].num == num) {
    //             try {
    //                 setEditEffect(state.effectsLargeGym[i].name);
    //             } catch(e) {
    //                 console.error(e)
    //             }
    //         }
    //     }
    //     setEditScreen(true);
    // }

    // function closeEditScreen() {
    //     setEditScreen(false);
    // }
    
    return (
        <div className='section-container'>
            {/* {editScreen &&
                <div className='edit-screen'>
                    <div className='edit-name'>
                        <input type='text' inputMode='text' value={activeEffect}></input>
                        this would be nice to do. BUT; after reload of app all changes are lost. 
                        Improvement to be made. 
                    </div>
                    <button className='close-edit-screen' onClick={closeEditScreen}>Close</button>
                </div>
            } */}
            {isPortrait ? 
            <>
            <div className='header-container' onClick={() => navigate('/smallgym')}>
                <a className='header-text'>Grote Zaal</a>
            </div>
            <div className='scene-list'>
                    {state.effectsLargeGym.map((effect) => {
                        return (
                            <ul key={effect.key} className='scene-container'>
                                <div className='scene-text'>{effect.key}. {effect.name}</div>
                                {/* <div className='scene-controls'> */}
                                    {/* IN DEVELOPMENT */}
                                    {/* <a className='scene-button' onClick={() => editScene(`${effect.num}`)}>
                                        <div className='scene-button-text'>edit</div>
                                    // </a> */}
                                    <a className='scene-button' onClick={() => fireScene(`${effect.num}`)}>
                                        <div className='scene-button-text'>fire</div>
                                    </a>
                                {/* </div> */}
                            </ul>

                            
                        )
                    })}
            </div>

            <div className='footer-container' onClick={() => navigate('/home')}>
                <div className='footer-text'>Terug</div>
            </div>
            </>
            :
            <div className='orientation-message-large-gym'>The app can only be used in portrait orientation.<br /> Please rotate your device.</div>
            }
            
        </div>
    )
}

export default LargeGym;