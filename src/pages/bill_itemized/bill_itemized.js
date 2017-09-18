import React, {Component} from 'react'
import billbg from './images/billbg.png'
import 'whatwg-fetch'
import queryString from 'query-string'
import './bill_itemized.css'

const bg = {
    backgroundImage: `url(${billbg})`,
    backgroundSize: '100% 100%',
    color: '#fff',
    textAlign: 'center',
    height: '1.6rem'
};
const machineData = {
    "totalFee": 110.01,
    "addressResponseList": [
        {
            "address": "第三置业大厦",
            "addressIncome": 110.01,
            "machineTransactionResponses": [
                {
                    "sn": "YQ00100012",
                    "dayIncome": 101.02
                },
                {
                    "sn": "YQ00100013",
                    "dayIncome": 101.03
                }
            ]
        },
        {
            "address": "第三置业大厦2",
            "addressIncome": 110.02,
            "machineTransactionResponses": [
                {
                    "sn": "YQ00100012",
                    "dayIncome": 101.02
                },
                {
                    "sn": "YQ00100013",
                    "dayIncome": 101.03
                }
            ]
        }
    ]
}

class billItemiezd extends Component {
    constructor(props) {
        super(props)
        const selectDate = props.location.query
        let dateTime;
        if (selectDate !== undefined && !selectDate.home) {
            dateTime = selectDate
        } else {
            dateTime = new Date()
        }
        this.state = {dateTime: dateTime, clickIndex: -1,fromHome:selectDate && selectDate.home?selectDate.home:false}
    }

    componentDidMount() {
        this.getMonthWeekDay(this.state.dateTime)
        let url = '/admin/alliance/transaction',param
        if(!this.state.fromHome){
         param = {date:this.state.year+"-"+this.state.month+"-"+this.state.day}
        }else{
        param ={}
        }
        const token = localStorage.getItem('jwt_token');
        fetch(`${url}?${queryString.stringify(param)}`,{headers:{
            'Authorization':`Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        mode: 'cors'}).then((res)=>{
            if(res.status !== 200){
                console.log("您当前无法获取机器的营业收入")
            }else{
                return res.json()
            }
        }).then((res)=>{
            this.setState({
                machineData:res
            })
        })
    }

    prevDay() {
        let prevDate = new Date(this.state.dateTime.getTime() - 24 * 60 * 60 * 1000)
        this.getMonthWeekDay(prevDate)
        this.setState({
            dateTime: prevDate
        })
    }

    nextDay() {
        let nextDate = new Date(this.state.dateTime.getTime() + 24 * 60 * 60 * 1000)
        this.getMonthWeekDay(nextDate)
        this.setState({
            dateTime: nextDate
        })
    }

    getMonthWeekDay(dateTime) {
        let year,month, week, day;
        year = dateTime.getFullYear()
        month = dateTime.getMonth() + 1
        day = dateTime.getDate()
        week = dateTime.getDay()
        this.setState({
            month: month, week: this.numToChinese(week), day: day, year:year
        })
    }

    toCalender() {
        let path = {
            pathname: '/calender',
            query: this.state.dateTime,
        }
        this.props.history.push(path)
    }

    toIncomeDetail() {
        let path = {
            pathname: '/income_detail',
            query: {machineId: 'TY0010022', date: this.state.dateTime},
        }
        this.props.history.push(path)
    }

    spread(index) {
        this.setState({clickIndex: index})
    }
    numToChinese(week) {
        switch (week) {
            case 0:
                return "日";
                break;
            case 1:
                return "一";
                break;
            case 2:
                return "二";
                break;
            case 3:
                return "三";
                break;
            case 4:
                return "四";
                break;
            case 5:
                return "五";
                break;
            case 6:
                return "六";
                break;
        }
    }

    render() {
        const {month, week, day, clickIndex} = this.state
        return (
            <div>
                <div style={bg}>
                    <div className="bill-date">
                        <div onClick={this.prevDay.bind(this)}>前一天</div>
                        <div onClick={this.toCalender.bind(this)}><img src={require('./images/calender.png')}
                                                                       className="caldener-img"/>{month > 9 ? month : '0' + month}-{day > 9 ? day : '0' + day}
                            周{week}</div>
                        <div onClick={this.nextDay.bind(this)}>后一天</div>
                    </div>
                    <div className="bill-trade-title">交易流水（元）</div>
                    <div className="bill-trade-sum">{machineData.totalFee}</div>
                </div>
                <div className="wrap-bill-detail">
                    <ul>
                        {machineData.addressResponseList.map((address, index) => {
                            return <li onClick={this.spread.bind(this,index)} key={index}>
                                <div className="bill-detail-flex">
                                    <div><img src={require('./images/right.png')}
                                              className="bill-right-img"/>{address.address}</div>
                                    <div>{address.addressIncome}</div>
                                </div>
                                    {index == clickIndex? <ul>
                                        {address.machineTransactionResponses.map((adressDetail, indexDetail) => {
                                            return <li className="bill-detail-flex"
                                                       onClick={this.toIncomeDetail.bind(this)} key={indexDetail}>
                                                <div className="bill-detail-full"><img src={require('./images/ down.png')}
                                                                                       className="bill-mechine-img"/>{adressDetail.sn}
                                                </div>
                                                <div>{adressDetail.dayIncome}<img src={require('./images/index_right.png')}
                                                                                  className="bill-index-right"/></div>
                                            </li>
                                        })}
                                    </ul>:''}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )

    }
}

export default billItemiezd