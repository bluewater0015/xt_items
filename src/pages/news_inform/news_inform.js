//'message_Inform.js
import './news_inform.css';
import React,{ Component } from 'react';
import 'whatwg-fetch';
import 'es6-promise';

export default class Inform extends Component{
	constructor(props){
		super(props);
		this.state = {
			list:[{
				id: 5,
				title:"机器警报1",
				content:'机器离线1',
				createdTime:'2017-09-01 23:00:01',
				isRead: true
			},{
				id: 2,
				title:"机器警报2",
				content:'机器离线2',
				createdTime:'2016-09-01 23:00:02',
				isRead:false
			}]
		}
	}
	
	componentDidMount(){
		this.informList();
	}

	/**
	 *	@informList 处理消息通知页面接口数据
	 *
	 */
	informList(){
		let url = "admin/alliance/messages";
		fetch(url,{
			method:'GET',
			headers:{
				'Authorization':"Bearer "+localStorage.getItem('jwt_token'),
				'Accept': 'application/json',
				'Content-type':'application/json'
			},
			mode: 'cors'
		}).then(res=>{
			return res.json()
		}).then(data=>{
			//console.log('informList',data);
			this.setState({
				list: data
			})
		}).catch(err=> {
			console.log(err);
		})
	}
	/**
	 *	@itemEvent 获取消息通知页面的ID
	 *	@param {number} 参数index 传索引值
	 */
	itemEvent(index){
		let id = this.state.list[index].id;
		this.props.history.push(`/news_Detail/${id}`);
	}

	render(){
		return (
			<div className="news_Inform">
				{
					this.state.list.map((item,index) => {
						return(
							<div className="inform marginTop" key={index}>
								<div className="triangle_up" style={{ borderBottomColor : item.isRead ? '#FEE300': '#57D5E7' }}>
									<p className="isRead justify-content">{item.isRead ? '已读' : "未读"}</p>
								</div>
								<div className="inform_list" onClick={()=>{this.itemEvent(index)}}>
									<p className="machine_alarm  border_bottom">{item.title}</p>
									<p className="marginTop">
										<span>警报时间：</span>
										<span>{ item.createdTime }</span>
									</p>
									<p className="marginTop">
										<span>警报内容：</span>
										<span>{ item.content }</span>
									</p>
								</div>
							</div>
						) 
					})
				}
			</div>
		)
	}
}