import React from 'react';
import './App.css';
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../query';
import RecipeItem from './Recipe/Recipeitem';

const App =() =>(

  <div className="App">
  <h1 className='man-title'>Find Recipes you <strong>Love</strong></h1>
  <Query query={ GET_ALL_RECIPES}>
  
  {({data, loading, error }) =>{
    if(loading) return <div>Loading..</div>
    if(error) return <div>error</div>
    console.log("data:::",data);
    return <ul className='cards'>
    {data.getAllRecipes.map(recipe => (
      <RecipeItem key={recipe._id} {...recipe}/>
      ))}
      </ul>
  }}


  </Query>
  </div>
);

export default App;
