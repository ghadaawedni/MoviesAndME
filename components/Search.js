import { StyleSheet,View , Button, TextInput} from 'react-native';
import { FlatList ,Text} from 'react-native';
import FilmItem from './FilmItem';
import { getFilms} from '../API/TMDBApi'
import React from 'react';
import { ActivityIndicator } from 'react-native';

class Search extends React.Component{
    
    constructor(props){
        super(props)
        this.searechedText = ""
        this.state = { 
            films : [],
            isLoading : false
        }
    }

    _loadFilms(){
        if (this.searechedText.length > 0){
            this.setState({ isLoading : true})
            getFilms(this.searechedText).then(data =>
                {
                    this.setState( {
                       films : data.results,
                       isLoading : false
                    })
                });
        }
    }


    _searchText(text){
        this.searechedText= text
    }
    
    render(){
        console.log(this.state.isLoading)
        return (
        <View style={styles.main_container}>
            <TextInput 
                onSubmitEditing={()=> this._loadFilms()}
                style={styles.TextInput} 
                placeholder="Titre du film"
                onChangeText={(text)=> this._searchText(text)}
            ></TextInput>
            <Button title="Recherher" onPress={()=>this._loadFilms()}></Button>
            <FlatList
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FilmItem film={item}/>}
            />
            { this.state.isLoading ? 
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color="grey"  />
                </View> 
                : null
            }
            </View>
    )
    }
}
const styles = StyleSheet.create(
    {
        main_container:{
            marginTop:30,
            flex:1
        },
        TextInput:{
            marginLeft:5,
            marginRight:5,
            marginBottom:5,
            height:50,
            borderColor:'black',
            borderWidth:1,
            paddingLeft:5
        },
        loading_container:{
            position: 'absolute',
            left:0,
            right:0,
            top:100,
            bottom:0,
            alignItems:'center',
            justifyContent:'center'
        }
    }
)
export default Search