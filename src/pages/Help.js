import React from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import '../styles/HelpStyle.css';
import state from '../variables/states'
import support from '../assets/support.png'

function Help(props) {
    const navigate = useNavigate();

    return (
        <div className='section-container'>
            <div className='container-help'>
                <div className='text-help'>For any support/update requests, please contact: kasper@rapenburgplaza.nl</div>
                <div className='image-container-help'>
                    <div className='text-help'>This webpage is developed: June 2023, by kasper</div>
                    <img
                        className='support-logo-help'
                        src={support}
                        alt="support"
                    />
                </div>
            </div>
            <div className='help-footer'>
                <a className='settings-container' onClick={() => navigate('/settings')}>
                    <div className='button-text-help'>Settings</div>
                </a>
                <a className='button-container-help' onClick={() => navigate('/home')}>
                    <div className='button-text-help'>Back</div>
                </a>
            </div>
        </div>
    );
}

export default Help;