import React from 'react'
import classes from './AddButton.module.scss'

const AddButton = (props) => {
    return (
        <button 
            className={classes.Button} 
            disabled={props.loading}
            onClick={props.click}>
                {props.loading? "Loading" : "Load More"}
        </button>
    )
}

export default AddButton
