import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES ,GET_USER_RECIPES } from '../../query';
import  Error  from '../Error';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';
import { Form, Icon, Input, Button } from 'antd';
import { Row, Col } from 'antd';

import './AddRecipe.css';

const FormItem = Form.Item;
 


const initialState ={
    name:'',
    imageUrl:'',
    instructions:'',
    category:'Brakfast',
    description:'',
    username:''
};
class  AddRecipe extends React.Component{

    state={...initialState};

    clearState =()=>{
        this.setState({ ...initialState });
    }

    componentDidMount= () =>{
        this.setState({ username: this.props.session.getcurrentUser.username})
    }

    handleChange =event =>{
        const { name, value } = event.target;
        this.setState({[name]: value});
    }
    validateForm =() =>{
        const { name, imageUrl,  instructions, category, description } = this.state;
        const inInvalid = !name || !instructions || !imageUrl || !category || !description ;
        return inInvalid;
    }
    handleSubmit =(event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(({ data }) =>{
           // console.log(data);
            this.clearState();
            this.props.history.push('/')
        });

    }
    updateCache =(cache, {data : { addRecipe }}) =>{
        const { getAllRecipes } = cache.readQuery({ query : GET_ALL_RECIPES})
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data :{
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        });
    };
    render() { 
        const { name,  imageUrl, instructions, category, description, username,} = this.state;
        return (
        
        <Mutation  mutation={ADD_RECIPE} variables={{  name,  imageUrl, instructions, category, description, username }} update={this.updateCache}
        refetchQueries={() => [
            { query: GET_USER_RECIPES, variables: { username } }
        ]}
        >
        {(addRecipe, { data, loading, error }) => {

        return(
            <div className='App' style={{display:"flex", paddingLeft:50}}>
            <div style={{margin:100}}> 
                    <Row>
                    <Col span={12} offset={6}>
       <Form className='login-form' style={{ width:400}} onSubmit={event => this.handleSubmit(event, addRecipe)}>
                 <h2 className='App' style={{paddingLeft:10}}>Add Recipe</h2>
       <FormItem>
           <Input type='text' name='name' className='input-sigin'  value={name} placeholder='Recipe Name' onChange={ this.handleChange } />
           </FormItem>
            <FormItem>
           <Input type='text' name='imageUrl' className='input-sigin'   value={imageUrl} placeholder='Recipe Image' onChange={ this.handleChange } />
           </FormItem>
           <div>
           <select type='text' name='category' value={category} onChange={this.handleChange}>
           
                <option value='Breakfast'>Breakfast</option>
                <option value='Lunch'>Lunch</option>
                <option value='Dinner'>Dinner</option>
                <option value='Snacks'>Snacks</option>
           </select>
           </div>
           <FormItem>
           <Input type='text' name='description' className='input-sigin'   placeholder='Add description' value={description} onChange={this.handleChange} />
           </FormItem>
           <FormItem>
           <textarea name='instructions'  placeholder='Add instructions' value={instructions} onChange={this.handleChange} />
           </FormItem>
           <FormItem>
           <Button type='submit' disabled={loading || this.validateForm()} 
            className="login-form-button" style={{ width:210}} 
            onClick={event => this.handleSubmit(event, addRecipe)}
           >Submit</Button>
            </FormItem>
           {error && <Error error={error} />}
       </Form>
       </Col>
      </Row>
</div>
   </div>
    );
        }}
    </Mutation>
    );
    }
};

export default withAuth(session => session && 
    session.getcurrentUser)(
        withRouter(AddRecipe)
    );