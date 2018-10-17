import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from '../components/Auth/Signout';
//import './Nabvar.css';
import { Menu } from 'antd';
import {Animated} from "react-animated-css";




const Navbar =({ session }) => (
    

    <nav>

{session && session.getcurrentUser ? <NavbarAuth session={session}/> : <NavbarUnAuth />}

    </nav>
)
const NavbarAuth = ({ session }) =>(
    <Fragment>
    <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1" style={{fontWieght:20}}><NavLink to='/' exact>Home</NavLink></Menu.Item>
        <Menu.Item key="2"><NavLink to='/Serach' >Search</NavLink></Menu.Item>
        <Menu.Item key="3"><NavLink to='/Recipe/AddRecipe' >Add Recipe</NavLink></Menu.Item>
        <Menu.Item key="4"><NavLink to='/Profile' >Profile</NavLink></Menu.Item>
        <Menu.Item key="5"><Signout /></Menu.Item>
      </Menu>
      <Animated animationIn="bounceInUp" animationOut="fadeOut" isVisible={true}>
      <h2 style={{paddingLeft:750, paddingTop:50}}><strong>Welcome {session.getcurrentUser.username}</strong></h2>
      </Animated>
    {/* <ul style={{overflow: "hidden"}}>
        
        <li>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
        <NavLink to='/Serach' >Search</NavLink>
        </li>
        <li>
        <NavLink to='/Recipe/AddRecipe' >Add Recipe</NavLink>
        </li>
        <li>
        <NavLink to='/Profile' >Profile</NavLink>
        </li>
        <li>
        <Signout />
        </li>
    </ul>
    <h2>Welcome {session.getcurrentUser.username}</h2> */}
    </Fragment>
);

const NavbarUnAuth = () =>(
    <Fragment>
    <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="5"><NavLink to='/' exact>Home</NavLink></Menu.Item>
        <Menu.Item key="6"><NavLink to='/Serach' >Search</NavLink></Menu.Item>
        <Menu.Item key="7"><NavLink to='/Signin' >Signin</NavLink></Menu.Item>
        <Menu.Item key="8"> <NavLink to='/Signup' >Signup</NavLink></Menu.Item>
        
      </Menu>
        {/* <ul>
            
            <li>
                <NavLink to='/' exact>Home</NavLink>
            </li>
            <li>
            <NavLink to='/Serach' >Search</NavLink>
            </li>
            <li>
            <NavLink to='/Signin' >Signin</NavLink>
            </li>
            <li>
            <NavLink to='/Signup' >Signup</NavLink>
            </li>
        </ul> */}

    </Fragment>
    );


export default Navbar;