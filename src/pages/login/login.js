//login.js
import React,{ Component } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Title from '../../components/title/title';
import "./login.css";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    /**
     *	@getPhoneEvent 获取电话号码
     *	@param {number} 参数value 电话号码
     */
    getPhoneEvent(value){
        console.log('phone',value);
        this.setState({
            username: value
        })
    }

    /**
     *	@getPasswordEvent 获取登录密码
     *	@param {number} 参数value 密码
     */
    getPasswordEvent(value){
        console.log('psw',value);
        this.setState({
            password: value
        })
    }
    handleErrors(response) {
        //console.log('在handlerErrors中的返回数据',response);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

	/**
	 *	@loginEvent 点击登录
	 *	
	 */
	loginEvent(){
		let url = "/admin/login";
		var form = new FormData();
        form.append('username', this.state.username)
        form.append('password', this.state.password)
        const request = new Request(url, {
            method: 'POST',
            body: form
        })
        return fetch(request).then(this.handleErrors)
        .then((response) => {
            localStorage.setItem('jwt_token',response.headers.get('jwt_token'));
            return response.json();
        })
        .then((responseData) => {
            localStorage.setItem('user', JSON.stringify(responseData));
            if(responseData.enabled){
            	this.props.history.push('/home');
            }
        });

    }
	render(){
		return (
			<div className="login_container" style={{backgroundImage: 'url(' + require('../../assets/images/Group@2x.png') + ')'}}>
				<div className="alliance_business center">
					<Title title="加盟商管家" style={{ width: '110px',fontSize: '22px'}}/>
				</div>
				<div className="login_input">
					<div className='baseHeight flex align_items borderRadius bgColorMain border borderColorWhite'>
						<img
                            alt=""
							src={ require('../../assets/images/phone.png') }
							className='icons margin-left'
						/>
						<Input
							onChange={(value)=>{this.getPhoneEvent(value)}}
							value="请输入手机"
							type="text"
							style={{marginLeft: '16px',backgroundColor:'#FAD51B',color:'#FFF'}}
						/>
					</div>
					<div className='baseHeight flex align_items borderRadius bgColorMain border borderColorWhite'>
						<img
                            alt=""
							src={ require('../../assets/images/password.png') }
							className='icons margin-left'
						/>
						<Input
							onChange={(value)=>{this.getPasswordEvent(value)}}
							value="请输入密码"
							type="password"
							style={{marginLeft: '16px',backgroundColor:'#FAD51B',color:'#FFF'}}
						/>
					</div>

				</div>
				<div className="login_btn center">
					<Button style={{width:'100%',height:'42px',backgroundColor: '#fff'}} title="登录" onClick={this.loginEvent.bind(this)}/>
				</div>
			</div>
        )
    }
}