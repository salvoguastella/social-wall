import React from 'react'
import classes from './Block.module.scss'
import brokenImageUrl from '../../assets/broken_image.png'
import twitterLogo from '../../assets/twitter.png'
import instagramLogo from '../../assets/instagram.png'
import manualLogo from '../../assets/manual.png'

const setBrokenImagePlaceholder = ev => {
    ev.target.src = brokenImageUrl;
}

const cleanTitle = title => {
    let cleanTitle = title.replace("Tweet:","");
    cleanTitle = cleanTitle.replace("Instagram:","");
    cleanTitle = cleanTitle.replace("Manual:","");
    return cleanTitle.trim();
}

const Block = (props) => {
    console.log(props);
    let label = null;
    let user = null;
    let content = null;
    let date = props.timeStamp;
    switch(props.service_id){
        case "1":
        //tweet
        label = (
            <div className={classes.BlockLabel}>
                <img src={twitterLogo} alt="Twitter"/>
            </div>
        )
        user = (
            <div className={classes.BlockHeader}>   
                <img src={props.data.user.avatar} 
                    onError = {setBrokenImagePlaceholder}
                    crossorigin="anonymous"
                    alt={props.data.user.username} 
                    title={props.data.user.username}/>
                <span>{props.data.user.username}</span>
            </div>
        )
        content = (
            <div className={classes.BlockContent}>
                <span>{props.data.tweet}</span>
            </div>
        )
        break;
        case "2":
        //Instagram
        label = (
            <div className={classes.BlockLabel}>
                <img src={instagramLogo} alt="Twitter"/>
            </div>
        )
        user = (
            <div className={classes.BlockHeader}>   
                <img src={props.data.user.avatar} 
                    onError = {setBrokenImagePlaceholder}
                    crossorigin="anonymous"
                    alt={props.data.user.username} 
                    title={props.data.user.username}/>
                <span>{props.data.user.username}</span>
            </div>
        )
        content = (
            <div className={classes.BlockContent}>
                <img src={props.data.image.medium} 
                    onError = {setBrokenImagePlaceholder}
                    crossorigin="anonymous"
                    alt=""/>
                <span>{props.data.caption}</span>
            </div>
        )
        break;
        case "5":
        //Manual
        label = (
            <div className={classes.BlockLabel}>
                <img src={manualLogo} alt="Twitter"/>
            </div>
        )
        content = (
            <div className={classes.BlockContent}>
                <img src={props.data.image_url} alt={props.data.link_text} title={props.data.link_text}/>
                <span>{props.data.text}</span>
            </div>
        )
        break;
        default:
        //unknown
        content = "Unknown"
    }

    return (
        <div className={classes.Block}>
            {label}
            {user}
            <span className={classes.BlockTitle}>{cleanTitle(props.title)}</span>
            {content}
            <div className={classes.BlockDate}>{date}</div>
        </div>
    )
}

export default Block
