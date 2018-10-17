import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Button, Radio, Icon } from 'antd';


const handleSignout = (client, history) =>{
    localStorage.setItem('token', '');
    client.resetStore();
    history.push('/')
}
const Signout =({ history }) => (
    <ApolloConsumer >
    {client =>{
        //console.log(client)
        return (

    <Button type="danger" onClick={()=> handleSignout(client, history)}>Signout</Button>
    
        )
    }}
    </ApolloConsumer>
)

export default withRouter(Signout);