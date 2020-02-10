import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import BigCatalog from './BitCatalog';

export default class BigCatalogList extends Component{

    constructor(){
        super();
        this.state={
            data: [],
        }
    }

    render(){
        return (
            <View style={ {height:300, marginBottom:8} }>
                <FlatList
                    horizontal={true}
                    pagingEnabled={true}
                    data={this.state.data}
                    renderItem={ ( {item, index} )=>{ return <BigCatalog onPress={this.props.onPress} movie={item}></BigCatalog>;} }
                    keyExtractor={ (item, index)=>{ return "Big"+index} }>
                </FlatList>
            </View>
        );
    }

    //영화정보 fetch해오는 기능 메소드
    loadData= ()=>{
        //전달받은 URL을 통해 json을 읽어오기
        fetch(this.props.url)
        .then( (response)=>{return response.json();} )
        .then( (responseJson)=>{ this.setState({data: responseJson.data.movies}) } )
        // .then( (response)=>{ return response.text();} )
        // .then( (responseText)=>{ alert(responseText); });
    }

    //화면이 보여지고 난 후 1번 자동호출되는 라이프사이클메소드
    componentDidMount(){
        if(this.props.url) this.loadData();
    }
}