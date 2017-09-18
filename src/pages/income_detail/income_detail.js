//机器收入详情页
import React, {Component} from 'react';
import billbg from './images/billbg.png'
import incomebg from './images/incomebg.png'
import 'whatwg-fetch'
import queryString from 'query-string'
import './income_detail.css'

const bg = {
    backgroundImage: `url(${billbg})`,
    backgroundSize: '100% 100%',
    color: '#fff',
    textAlign: 'center',
    height: '1.28rem'
};
const incomeBg = {
    backgroundImage: `url(${incomebg})`,
    width:'2.24rem',
    backgroundSize:'100% 100%'
}
const machineDetail ={
    "isBusiness":true,
    "sn":"YQ001000142",
    "day":"9月12日",
    "totalFee":101.01,
    "businessStartTime":"11:20",
    "title":"开始营业",
    "simpleMachineTransactionResponseList":[
        {
            "bookingTime":"12:00",
            "packages":"欢唱1首",
            "refund":null,
            "price":112.02
        },
        {
            "bookingTime":"12:05",
            "packages":"订单已退款",
            "refund":"欢唱1首",
            "price":112.02
        }
    ]
}
export default class Income extends Component {
    constructor(props) {
        super(props);
        const selectDate = props.location.query !== undefined && props.location.query.date !== undefined ?props.location.query.date:new Date()
        const machineId = props.location.query !== undefined && props.location.query.machineId !== undefined ?machineId:null
        this.state={month:selectDate.getMonth()+1,day:selectDate.getDay(),year:selectDate.getFullYear(),machineId:machineId,machineDetail:machineDetail}
    }
    componentDidMount(){
        let url = '/admin/alliance/transaction/machine'
        let param = {sn:this.state.machineId,date:this.state.year+"-"+this.state.month+"-"+this.state.day}
        //let param = {sn:'YQ001000318',data:'2017-09-16'}
        const token = localStorage.getItem('jwt_token');
        fetch(`${url}?${queryString.stringify(param)}`,{headers:{
            'Authorization':`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            mode: 'cors'}).then((res)=>{
            if(res.status !== 200){
                console.log("当前页面获取失败")
            }else{
                return res.json()
            }
        }).then((res) =>{
            this.setState({
                machineDetail:res
            })
        })
    }
    render() {
        const { month,day,machineDetail } = this.state
        return (
            <div>
                { this.state.machineDetail.isBusiness?<div>

                    <div style={bg} className="income-title">
                        <div className="bill-trade-title">{month}月{day}日单机流水（元）</div>
                        <div className="bill-trade-sum">{machineDetail.totalFee}</div>
                    </div>
                    <div className="wrap-income">
                        <div className="warp-income-time income-top">
                            {machineDetail.simpleMachineTransactionResponseList.map((list,index)=>{
                                return <div className="wrap-income-detail" key={index}><span>{list.bookingTime}</span></div>
                            })}
                            <div className="wrap-income-detail">{machineDetail.businessStartTime}</div>

                        </div>
                        <div className="wrap_process">
                            {machineDetail.simpleMachineTransactionResponseList.map((list,index)=>{
                                return <div key={index}>
                                    <div className="process_dot"></div>
                                    <div className="process_line"></div></div>
                            })}
                            <div className="process_dot"></div>
                        </div>
                        <div>
                            {
                                machineDetail.simpleMachineTransactionResponseList.map((list,index)=>{
                                    return                 <div className="wrap-income-detail" key={index}>
                                        <div style={incomeBg}>
                                            <div className="income-detail-bg"><span className="income-detail-title">{list.refund !== null ?list.refund:list.packages}</span><span>{list.price}元</span></div>
                                            {list.refund !== null? <div className="refund-male">
                                                <div>套餐：{list.refund}</div>
                                            </div>:'' }
                                        </div>
                                    </div>
                                })
                            }
                            <div className="wrap-income-detail"><div className="income-detail-bg">开始营业</div></div>
                        </div>
                    </div>
                </div>:'当前机器还没开始营业'
                }
            </div>
        )
    }
}