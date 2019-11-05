import React from 'react'
import Filter from './Filter/Filter'
import classes from './Filters.module.scss'

const Filters = (props) => {
    return (
        <div>
            <div>IMG</div>
            <div>
                <Filter type="none" click={props.click}/>
                <Filter type="manual" click={props.click}/>
                <Filter type="twitter" click={props.click}/>
                <Filter type="instagram" click={props.click}/>
            </div>
        </div>
    )
}

export default Filters
