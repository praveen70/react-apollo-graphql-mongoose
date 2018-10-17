import React from 'react';
//import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import {SIGNUP_USER} from '../../query';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import './Signup.css';
import {Animated} from "react-animated-css";


const FormItem = Form.Item;

const initialState = {
    username:'',
    email:'',
    password:'',
    PasswordConfirmation:'',
}
class Signup extends React.Component{

    state={...initialState};

    clearState =()=>{
        this.setState({ ...initialState });
    }

    handleChange = event =>{
        const { name, value } = event.target;
        this.setState({[name]:value});
        //console.log(name, value);
     }
     handleSubmit = (event,signupUser) =>{
         event.preventDefault();
         signupUser().then(data =>{
            // console.log(data);
             localStorage.setItem('token', data.data.signupUser.token);
             this.clearState();
             this.props.history.push('/')
         })

     }
     validateForm =()=>{
        const  { username, email, password, PasswordConfirmation} = this.state;
        const isInvalid = !username || !email || !password ||  password!==PasswordConfirmation;
        return isInvalid;
     }

    render(){
        const  { username, email, password, PasswordConfirmation} = this.state;
        return(
            <Mutation mutation={SIGNUP_USER} variables={{  username, email, password }}>
            {( signupUser, { data, loading, error }) =>{
                return (
         <div  style={{display:"flex"}}>  
         <div style={{margin:120}}> 
         <Row>
                <Col span={12} offset={6}>
            <Form className="login-form" style={{ width:400}} onSubmit={event=>this.handleSubmit(event, signupUser)}>
            <FormItem>
           
            <h1 style={{textAlign:'center'}}>
            <Animated animationIn="rubberBand" animationOut="fadeOut" isVisible={true}>
            <img style={{width:80}} src={require('../Image/signup.png')} />
            </Animated>
            <img style={{width:350}} src={require('../Image/sign-up3.png')} />
            </h1>
            
            <FormItem className='App'>
            <FormItem>
                <Input type='text' className='input-sigin' value={username} name='username' placeholder='Username' onChange={(event) =>this.handleChange(event)} />
                </FormItem>
                <FormItem>
                <Input type='email' className='input-sigin' value={email} name='email' placeholder='Email'  onChange={this.handleChange} />
                </FormItem>
                <FormItem>
                <Input type='password' className='input-sigin' value={password} name='password' placeholder='Password'  onChange={this.handleChange} />
                </FormItem>
                <FormItem>
                <Input type='password' className='input-sigin' value={PasswordConfirmation} name='PasswordConfirmation' placeholder='PasswordConfirmation'  onChange={this.handleChange} />
                </FormItem>
                <Button  
                disabled={ loading || this.validateForm()}
                type='submit' 
                className="login-form-button" style={{ width:210}}
                onClick={event=>this.handleSubmit(event, signupUser)}
                > Submit</Button>
                { error && <Error error={ error} />}
            </FormItem>
            </FormItem>
</Form>

</Col>
      </Row>
       </div> 
       </div>        )
            }}
</Mutation>

        );
    }
}

export default withRouter(Signup);