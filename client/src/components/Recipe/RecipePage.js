import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../query';
import LikeRecipe from './LikeRecipe';

const ReacipePage =({ match }) =>{
    const {_id } = match.params;
   
    return (
        <Query query={ GET_RECIPE } variables={{ _id }}>
            {({ data, loading, error }) => {
                if(loading) return <div>Loading</div>
                if(error) return <div>error</div>
                //console.log(data);
                return (<div className='App'>
                <div className="recipe-image" 
                style={{ background: `url(${data.getRecipe.imageUrl}) center center/ cover no-repeat`}}
                    className='card'>
                    <div className="recipe">
                    <div className='recipe-header'>
                    <h2 className='recipe-name'>
                        <strong>{data.getRecipe.name}</strong>
                    </h2>
                    <h5><strong>{data.getRecipe.category}</strong></h5>
                    <p>Created By <strong>{data.getRecipe.username}</strong></p>
                    <p><strong>{data.getRecipe.likes}
                    <span role='img' aria-label='heart'>💜</span></strong></p>


                    </div>
                        <blockquote className='recipe-description'>
                            {data.getRecipe.description}
                        </blockquote>
                        <h3>Instructions </h3>
                        <div>{data.getRecipe.instructions} </div>
                    </div>
                    <LikeRecipe _id={_id } />
                                
                 
                </div>
                    {/* <h2>{data.getRecipe.name}</h2>
                    <p>Category:{data.getRecipe.category}</p>
                    <p>Description:{data.getRecipe.description}</p>
                    <p>Instructions:{data.getRecipe.instructions}</p>
                    <p>Likes:{data.getRecipe.likes}</p>
                    <p>Created By:{data.getRecipe.username}</p>
                    <LikeRecipe _id={_id } /> */}
                </div>
                
                
                )
            }}


        </Query>
    )

};

export default withRouter(ReacipePage);