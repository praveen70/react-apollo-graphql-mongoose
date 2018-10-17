import React from 'react';
//import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {SIGNIN_USER} from '../../query';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import './Signin.css';
import {Animated} from "react-animated-css";

const FormItem = Form.Item;

const initialState = {
    username:'',
    password:'',
   
}
class Signin extends React.Component{

    state={...initialState};

    clearState =()=>{
        this.setState({ ...initialState });
    }

    handleChange = event =>{
        const { name, value } = event.target;
        this.setState({[name]:value});
        //console.log(name, value);
     }
     handleSubmit = (event,signinUser) =>{
         event.preventDefault();
         signinUser().then(data=>{
             //console.log(data);
             localStorage.setItem('token', data.data.signinUser.token);
             this.clearState();
             this.props.history.push('/')
         })

     }
     validateForm =()=>{
        const  { username, password } = this.state;
        const isInvalid = !username ||  !password 
        return isInvalid;
     }

    render(){
        const  { username,  password } = this.state;
        return(
            <Mutation mutation={SIGNIN_USER} variables={{  username,  password }}>
            {( signinUser, { data, loading, error }) =>{
                return (
                 <div  style={{display:"flex"}}>  
                 <div style={{margin:120}}> 
                    <Row>
                    <Col span={12} offset={6}>

            <Form className="login-form" style={{ width:400}} onSubmit={event=>this.handleSubmit(event, signinUser)}>
            <FormItem>
          
            <Animated animationIn="rubberBand" animationOut="fadeOut" isVisible={true}>
            <div>
            <span className="login100-form-title p-b-51">
            <h1 className="login100-form-title p-b-51" style={{textAlign:'center'}}>👨 Signin</h1>
            </span>
            </div>
            </Animated>
            
            <FormItem className='App'>
            <FormItem>
            <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                <Input type='text' className='input-sigin' value={username} name='username' placeholder='Username' onChange={(event) =>this.handleChange(event)} 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}    
                />
                </Animated>
                </FormItem>
               
                <FormItem>
                <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                <Input type='password' className='input-sigin'  value={password} name='password' placeholder='Password'  onChange={this.handleChange} 
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                />
                 </Animated>
                </FormItem>
                <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
                <Button  
                onClick={event =>this.handleSubmit(event, signinUser)}
                 className="login-form-button" style={{ width:210}} 
                disabled={ loading || this.validateForm()}
                type='submit' 
                > Submit</Button>
                </Animated>
                { error && <Error error={ error} />}
            </FormItem>
            </FormItem>
            </Form>

</Col>
      </Row>
</div>
</div>
                )
            }}
        </Mutation>

        );
    }
}

export default withRouter(Signin);