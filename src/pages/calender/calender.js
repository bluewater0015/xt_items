import React, {Component} from 'react'
import {Calendar} from 'react-date-range'
import './calender.css'

class Calender extends Component {
    constructor(props) {
        super(props)
        const selectDay = props.location.query !== undefined?props.location.query:new Date()
        this.state={selectDay:selectDay.getDate()+'/'+( selectDay.getMonth()+1)+'/'+selectDay.getFullYear()}
    }

    handleChange(date) {
        var path = {
            pathname: '/billitemized',
            query: date._d,
        }
        this.props.history.push(path)
    }

    render() {
        return (
            <div className="wrap-calender">
                <Calendar
                    lang="cn"
                    date={this.state.selectDay}
                    theme={{DaySelected: {background: '#ffce00', borderRadius: '20px', color: '#000'}}}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

export default Calender