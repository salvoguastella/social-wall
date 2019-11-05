import React from 'react'
import classes from './Filter.module.scss'
import twitterLogo from '../../../assets/twitter.png'
import instagramLogo from '../../../assets/instagram.png'
import manualLogo from '../../../assets/manual.png'

const Filter = (props) => {
    let icon = null;
    switch(props.type){
        case "twitter":
            icon = (<img src={twitterLogo} alt="Twitter"/>)
        break;
        case "instagram":
            icon = (<img src={instagramLogo} alt="Instagram"/>)
        break;
        case "manual":
            icon = (<img src={manualLogo} alt="Manual"/>)
        break;
        default:
           icon = (<div>ALL</div>);
    }
    return (
        <div className={classes.Filter} onClick={props.click}>
            {icon}
        </div>
    )
}

export default Filter
