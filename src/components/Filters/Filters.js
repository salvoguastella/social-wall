import React from 'react'
import Filter from './Filter/Filter'
import classes from './Filters.module.scss'
import HeroAll from '../../assets/hero_all.png'
import HeroTwitter from '../../assets/hero_twitter.png'
import HeroInstagram from '../../assets/hero_instagram.png'
import HeroManual from '../../assets/hero_manual.png'

const Filters = (props) => {
    let Hero = null
    switch(props.type){
        case 1:
            Hero = (<img src={HeroTwitter} alt="Hero Twitter"/>);
        break;
        case 2:
            Hero = (<img src={HeroInstagram} alt="Hero Instagram"/>);
        break;
        case 5:
            Hero = (<img src={HeroManual} alt="Hero Manual"/>);
        break;
        default:
            Hero = (<img src={HeroAll} alt="Hero"/>);
    }

    return (
        <div className={classes.Filters}>
            <div className={classes.Hero}>{Hero}</div>
            <div className={classes.Title}>Fashion Wall</div>
            <div className={classes.FilterBar}>
                <Filter type="none" isActive={!props.type} click={() => props.click(null)}/>
                <Filter type="twitter" isActive={props.type === 1} click={() => props.click(1)}/>
                <Filter type="instagram" isActive={props.type === 2} click={() => props.click(2)}/>
                <Filter type="manual" isActive={props.type === 5} click={() => props.click(5)}/>
            </div>
        </div>
    )
}

export default Filters
