import React from 'react'
import classes from './Block.module.scss'
import brokenImageUrl from '../../assets/broken_image.png'
import twitterLogo from '../../assets/twitter.png'
import instagramLogo from '../../assets/instagram.png'
import manualLogo from '../../assets/manual.png'

const setBrokenImagePlaceholder = ev => {
    ev.target.src = brokenImageUrl;
}

const linkify = text => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, url => `<a href="${url}" target="_blank">${url}</a>`);
}

const parseHashAndUser = text => {
    let parsedText = text.replace(/(^|\s)(#[a-z\d-]+)/ig, hash => ` <a href='https://www.instagram.com/explore/tags/${hash.replace("#", "").trim()}' target='_blank'>${hash.trim()}</a>`);
    parsedText = parsedText.replace(/(^|\s)(@[a-z\d-]+)/ig, user => ` <a href='https://twitter.com/${user.replace("@", "").trim()}' target='_blank'>${user.trim()}</a>`);
    return (parsedText);
}

const parseText = text => {
    let parsedText = linkify(text);
    parsedText = parseHashAndUser(parsedText);
    return parsedText;
}

const Block = (props) => {
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
                    crossOrigin="anonymous"
                    alt={props.data.user.username} 
                    title={props.data.user.username}/>
                <span>{props.data.user.username}</span>
            </div>
        )
        content = (
            <div className={classes.BlockContent}>
                <span dangerouslySetInnerHTML={{ __html: parseText(props.data.tweet)}}></span>
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
                    crossOrigin="anonymous"
                    alt={props.data.user.username} 
                    title={props.data.user.username}/>
                <span>{props.data.user.username}</span>
            </div>
        )
        content = (
            <div className={classes.BlockContent}>
                <img src={props.data.image.medium} 
                    onError = {setBrokenImagePlaceholder}
                    crossOrigin="anonymous"
                    alt=""/>
                <span dangerouslySetInnerHTML={{ __html: parseText(props.data.caption)}}></span>
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
                <span dangerouslySetInnerHTML={{ __html: parseText(props.data.text)}}></span>
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
            {content}
            <div className={classes.BlockDate}>{date}</div>
        </div>
    )
}

export default Block
