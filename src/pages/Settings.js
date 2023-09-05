import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/SettingsStyle.css';
import state from '../variables/states'
import { db } from '../db.js';
import logo from '../assets/logo/logo.png'
import { useMediaQuery } from 'react-responsive'

function Settings() {
    const [dbIpValueSmall, setDbIpValueSmall] = useState();
    const [dbIpValueLarge, setDbIpValueLarge] = useState();
    const [dbPin, setDbPin] = useState();
    const [ipValueSmall, setIpValueSmall] = useState();
    const [ipValueLarge, setIpValueLarge] = useState();

    const [pinVisible, setPinVisible] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [pincodeValue, setPincodeValue] = useState();
    const [pincodePlchldr, setPincodePlchldr] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    useEffect(() => {
        loadSmallData();
        loadLargeData();
        loadPinData();
    }, [])

    async function loadSmallData() {
        try {
            setDbIpValueSmall(state.urlSmallGym);
        } catch (e) {
            console.error(e);
        }
    }

    async function loadLargeData() {
        try {
            setDbIpValueLarge(state.urlLargeGym);
        } catch (e) {
            console.error(e);
        }
    }

    async function loadPinData() {
        try {
            setDbPin(state.pincode);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteDataSmall() { 
        const ipSmallArray = await db.ipSmall.toArray()
        try {
            if (ipSmallArray.length !== 0) {
                db.ipSmall.clear();
            }
            alert('Succesfully restored default IP Small, reloading now...')
            setTimeout(() => navigate('/'), 1000);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteDataLarge() { 
        const ipLargeArray = await db.ipLarge.toArray()
        try {
            if (ipLargeArray.length !== 0) {
                db.ipLarge.clear();
            }
            alert('Succesfully restored default IP Large, reloading now...')
            setTimeout(() => navigate('/'), 1000);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteDataPin() { 
        const pinArray = await db.pincode.toArray()
        try {
            if (pinArray.length !== 0) {
                db.pincode.clear();
            }
            alert('Succesfully restored default PIN, reloading now...')
            setTimeout(() => navigate('/'), 1000);
        } catch (e) {
            console.error(e);
        }
    }

    async function updateIpSmall() {
        try {
            if (ipValueSmall !== undefined) {
                const ip = await db.ipSmall.add({
                    ipValueSmall
                });
                alert('Succesfully updated your IP Small, restarting now...')
                setTimeout(() => navigate('/'), 1000);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function updateIpLarge() {
        try {
            if (ipValueLarge !== undefined) {
                const ip = await db.ipLarge.add({
                    ipValueLarge
                });
                alert('Succesfully updated your IP Large, restarting now...')
                setTimeout(() => navigate('/'), 1000);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function updatePin() {
        try {
            if (pincodeValue !== undefined && pincodeValue.length === 4 ) {
                const pin = await db.pincode.add({
                    pincodeValue
                });
                alert('Succesfully updated your PIN, restarting now...')
                setTimeout(() => navigate('/'), 1000);
            } else {
                alert("NOPE! Incorrect input!");
            }
        } catch (e) {
            console.error(e);
        }

    }
    
    function checkPin() {
        if (pincodePlchldr === undefined) {
            setError('Nope, you won\'t hack me today! \r\nsorry!')
        } else if (pincodePlchldr.length === 4) {
            if (pincodePlchldr === dbPin) {
                setPincodePlchldr('');
                setPincodeValue('');
                setError();
                setPinVisible(false);
                setSettingsVisible(true);
            } else {
                setError('Nope, that\'s incorrect!');
            }
        } else {
            setError('Input is to short, try again. ')
        }
    }

    return (
        <div className='section-container-settings'>
            {isPortrait ? 
            <>

            <img
                className='settings-logo'
                src={logo}
                alt="logo"
            />
            {pinVisible &&
                <>
                    <div className='login-mystery-screen'>You found the mystery screen!</div>
                    <form id="form1" className="form-pin-login">
                        <div className='pin-input-text'> Enter pincode:
                            <input
                                required
                                type="password"
                                autoComplete="username"
                                inputMode="numeric"
                                minLength="4"
                                maxLength="4"
                                size="4"
                                className="pin-input-field"
                                onChange={(v) => setPincodePlchldr(v.target.value)}
                                onSubmit={checkPin}
                            />
                        </div>
                        <div className='error-container-settings'>
                            {error && <div className='error-message-settings'>{error}</div>}
                        </div>
                        <div className="login-button login-enter-button" onClick={checkPin}>
                            <a type="submit">Login</a>
                        </div>
                        <div className="login-button login-enter-button reset-pin" onClick={deleteDataPin}>
                            <a type="submit">Reset pin to default -- ({state.pincode})</a>
                        </div>
                        <div className='pin-input-text reset-pin-text'>Only use if you forgot the PIN</div>
                    </form>
                    <div className='login-other-functions'>
                        <div className='login-button login-return-back' onClick={() => navigate(-1)}>
                            <a>Go back</a>
                        </div>
                        <div className='login-button login-reload-page' onClick={() => navigate('/')}>
                            <a>Reload page</a>
                        </div>
                    </div>
                </>
            }


            {settingsVisible &&
                <>
                    <div className='all-settings small'>
                        <div className='ip-currently-set-small'>
                            {dbIpValueSmall !== undefined && `Current settings small: ${dbIpValueSmall}`}
                        </div>
                        <form id="form2">
                            <div className='ip-settings-small-text'> Update IP Small Gym:
                                <input
                                    required
                                    type="text"
                                    minLength="7"
                                    maxLength="15"
                                    size="15"
                                    pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                                    className="small-input-field"
                                    onChange={(v) => setIpValueSmall(v.target.value)}
                                    value={ipValueSmall}
                                    onSubmit={updateIpSmall}
                                />
                            </div>
                            <div className="update-reset-button update" onClick={updateIpSmall}>
                                <a type="button">Update</a>
                            </div>
                        </form>
                        <div className="update-reset-button" onClick={deleteDataSmall}>
                            <a>Restore default</a>
                        </div>
                    </div>
                    <div className='all-settings large'>
                        <div className='ip-currently-set-large'>
                            {dbIpValueLarge !== undefined && `Current settings large: ${dbIpValueLarge}`}
                        </div>
                        <form id="form3">
                            <div className='ip-settings-large-text'> Update IP Large Gym:
                                <input
                                    required
                                    type="text"
                                    minLength="7"
                                    maxLength="15"
                                    size="15"
                                    pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                                    className="large-input-field"
                                    onChange={(v) => setIpValueLarge(v.target.value)}
                                    value={ipValueLarge}
                                    onSubmit={updateIpLarge}
                                />
                            </div>
                            <div className="update-reset-button update" onClick={updateIpLarge}>
                                <a type="button">Update</a>
                            </div>
                        </form>
                        <div className="update-reset-button" onClick={deleteDataLarge}>
                            <a>Restore default</a>
                        </div>
                    </div>
                    <div className='all-settings pin'>
                        <div className='pin-currently-set'>
                            {dbIpValueLarge !== undefined && `Current PIN: ${dbPin}`}
                        </div>
                        <form id="form4">
                            <div className='pin-settings-text'> Update login PIN:
                                <input
                                    required
                                    type="text"
                                    maxLength="4"
                                    size="4"
                                    pattern="[0-9]{4}"
                                    className="new-pin-input-field"
                                    onChange={(v) => setPincodeValue(v.target.value)}
                                    value={pincodeValue}
                                    onSubmit={updatePin}
                                />
                            </div>
                            <div className="update-reset-button update" onClick={updatePin}>
                                <a type="button">Update</a>
                            </div>
                        </form>
                        <div className="update-reset-button" onClick={deleteDataPin}>
                            <a>Restore default</a>
                        </div>
                    </div>


                    <div className='settings-return-back-button back'>
                        <a className='button-container-back' onClick={() => navigate(-1)}>
                            <div className='button-text-back'>Back</div>
                        </a>
                    </div>
                </>
            }
            </>
        :
            <div className='orientation-message-settings'>The app can only be used in portrait orientation.<br /> Please rotate your device.</div>
        }
        </div>
    );
}

export default Settings;