import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SERACH_RECIPES } from '../../query';
import SearchItem from './Searchitem';
import { Form, Icon, Input, Button } from 'antd';

class Serach extends React.Component {
    state = {
        searchResults : []
    }

    handleChange = ({ searcheRecipes }) => {
        this.setState({
            searchResults:searcheRecipes
        });
        
    };

    render(){
       const { searchResults } = this.state;

       // console.log( searchResults );
        return (
            <ApolloConsumer>
                {client =>(

                    <div className='App'>
                    <h2><strong>🌮 🍩 Search Item</strong></h2>
                        <Input style={{width:350, marginTop: 80}} type='serach' placeholder='Serach for recipes' 
                            onChange={async event => {
                                 event.persist(); 
                                const { data } = await client.query({
                                    query: SERACH_RECIPES,
                                    variables : {
                                        searchTerm: event.target.value
                                    }
                                });
                                this.handleChange(data)
                            }}
                        />
                        <ul>
                            {searchResults.map(recipe =>(
                                <SearchItem   key={recipe._id} {...recipe}/>
                            ))}
                        </ul>
                    </div>
                )}
            

            </ApolloConsumer>
)
}
}


export default Serach;
