import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Row, Col } from 'antd';


const formatDate = date =>{
    const newDate = new Date(date).toLocaleDateString('en-Us');
    const newTime = new Date(date).toLocaleTimeString('en-India');
    return `${newDate} at ${newTime}`;
}
const UserInfo =({ session }) => (
    
    
    <div style={{ paddingLeft:50, paddingTop:45}}>
    
                 <Row>
                <Col span={6}>
             <Card
                title="User Info"
            
                style={{ width: 300 }}
                >
    
        <h3>User Info</h3>
        <p>Username: {session.getcurrentUser.username}</p>
        <p>Email: {session.getcurrentUser.email}</p>
        <p>Join Date: {formatDate(session.getcurrentUser.joinDate)}</p>
        </Card>
        </Col>
       

     
       
        <Col span={6}>
        <Card style={{ width: 400 }} 
             title= "Favorites">
        <ul>
        <h3>Username: {session.getcurrentUser.username}' s Favorites</h3>
        {session.getcurrentUser.favorites.map(favorite =>(
            <li key={favorite._id}>
           <Link to={`/Recipe/${favorite._id}`}><p>{favorite.name}</p></Link> 

            </li>
        
            ))}
            {!session.getcurrentUser.favorites.length && (
                <strong><p>you have no favorites currently. go add some!</p></strong>)}
        </ul>

        </Card>
        </Col>
        </Row>
      
        </div>
    
    

)


export default UserInfo;