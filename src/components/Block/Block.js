import React from 'react'
import classes from './Block.module.scss'
import brokenImageUrl from '../../assets/broken_image.png'
import twitterLogo from '../../assets/twitter.png'
import instagramLogo from '../../assets/instagram.png'
import manualLogo from '../../assets/manual.png'
import LazyLoad, {forceCheck} from 'react-lazyload'

//most of the images are broken. I set a fallback
const setBrokenImagePlaceholder = ev => {
    ev.target.src = brokenImageUrl;
}

//parse urls and convert them to links
const linkify = text => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, url => `<a href="${url}" target="_blank">${url}</a>`);
}

//parse hash and user and convert them to links
const parseHashAndUser = text => {
    let parsedText = text.replace(/(^|\s)(#[a-z\d-]+)/ig, hash => ` <a href='https://www.instagram.com/explore/tags/${hash.replace("#", "").trim()}' target='_blank'>${hash.trim()}</a>`);
    parsedText = parsedText.replace(/(^|\s)(@[a-z\d-]+)/ig, user => ` <a href='https://twitter.com/${user.replace("@", "").trim()}' target='_blank'>${user.trim()}</a>`);
    return (parsedText);
}

//call both parse functions, return processed text
const parseText = text => {
    let parsedText = linkify(text);
    parsedText = parseHashAndUser(parsedText);
    return parsedText;
}

//calculate relative time
const timeDifference = previous => {

    const current = new Date().getTime();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

const Block = (props) => {
    // generate labels, header, content and date dinamically
    let label = null;
    let user = null;
    let content = null;
    //let date = props.timeStamp;
    let date = timeDifference(new Date(props.timeStamp).getTime());
    switch(props.service_id){
        case "1":
        //tweet
        label = (
            <div className={classes.BlockLabel}>
                <img src={twitterLogo} alt="Twitter"/>
            </div>
        )
        user = (
            <a href={"https://twitter.com/" + props.data.user.username} className={classes.BlockHeader} target="_black">   
                <LazyLoad height={40}>
                    <img src={props.data.user.avatar} 
                        onError = {setBrokenImagePlaceholder}
                        crossOrigin="anonymous"
                        alt={props.data.user.username} 
                        title={props.data.user.username}/>
                </LazyLoad>
                <span>{props.data.user.username}</span>
            </a>
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
            <a href={"https://instagram.com/" + props.data.user.username} className={classes.BlockHeader} target="_black">   
                <LazyLoad height={40}>
                    <img src={props.data.user.avatar} 
                        onError = {setBrokenImagePlaceholder}
                        crossOrigin="anonymous"
                        alt={props.data.user.username} 
                        title={props.data.user.username}/>
                </LazyLoad>
                <span>{props.data.user.username}</span>
            </a>
        )
        content = (
            <div className={classes.BlockContent}>
                <LazyLoad height={300}>
                <img src={props.data.image.medium} 
                    onError = {setBrokenImagePlaceholder}
                    crossOrigin="anonymous"
                    alt=""/>
                </LazyLoad>
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
                <LazyLoad height={300}>
                    <img src={props.data.image_url} alt={props.data.link_text} title={props.data.link_text}/>
                </LazyLoad>
                <span dangerouslySetInnerHTML={{ __html: parseText(props.data.text)}}></span>
            </div>
        )
        break;
        default:
        //unknown
        content = "Unknown"
    }

    //post images are lazyloaded as we scroll. We need to forceCheck when the component get mounted,
    //otherwise nothing would be loaded
    setTimeout(forceCheck, 100);

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
