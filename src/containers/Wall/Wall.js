import React, { Component } from 'react'
import axios from 'axios'
import classes from './Wall.module.scss'
//https://github.com/paulcollett/react-masonry-css
import Masonry from 'react-masonry-css'
import Filters from '../../components/Filters/Filters'
import Block from '../../components/Block/Block'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

export class Wall extends Component {
    state = {
        items: [],
        filter: null
    }
    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        axios.get("http://private-cc77e-aff.apiary-mock.com/posts")
            .then((res => {
                const _items = [];
                console.log(res.data.items);
                for(const item in res.data.items){
                    _items.push(res.data.items[item]);
                }
                this.setState({
                    items: _items
                })
            }))
            .catch(error => console.log(error))
    }

    setFilter = filter =>  {
        this.setState({
            filter: filter
        })
    }

    render() {
        return (
            <div>
                <Filters click={this.setFilter} type={this.state.filter}/>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.Wall}
                    columnClassName={classes.Wall_column}>
                    {this.state.items.map(item => {
                        if(!this.state.filter || +item.service_id === +this.state.filter){
                            return (<Block 
                                service_id={item.service_id} 
                                data={item.item_data}
                                account={item.account_data} 
                                timeStamp={item.item_created}
                                key={item.item_id} />)
                        }
                        else return null
                    })}
                </Masonry>
            </div>
        )
    }
}

export default Wall
