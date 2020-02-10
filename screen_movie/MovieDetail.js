import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, ScrollView,Image} from 'react-native';
import BigCatalog from '../components_movie/BitCatalog';

export default class MovieDetail extends Component{

    constructor(){
        super();
        this.state={
            data: null,  //영화상세정보
        }
    }

    render(){        
        return this.state.data?
            (
            
                <ScrollView style={style.root}>
                    {/* 큰 이미지 보여주기.- 이미 만들어놓은 BigCatalog컴포넌트 재사용 */}
                    <BigCatalog movie={this.state.data}></BigCatalog>


                    {/* 영화정보 영역 */}
                    <View>
                        <Text style={style.title}> ★ MOVIE INFO</Text>
                 
                        <View style={style.borderTop}></View>
                        <View style={style.infoContainer}>
                            <Text style={{fontSize:15}}>{this.state.data.runtime} minutes</Text>
                            <Text style={{fontSize:15}}>Rating : <Text style={{color:'red',fontSize:16,}}>{this.state.data.rating}</Text></Text>
                            <Text style={{fontSize:15}}>Like : <Text style={{color:'blue', fontSize:16,}}>{this.state.data.like_count}</Text></Text>
                        </View>
                    </View>

                <View>
                <Text style={style.title}> ★ Actors</Text>
                <View style={style.borderTop}></View>
                <View style={style.infoActors}>
                {
                      this.state.data.cast.map( function(item, index, array) {
                            return (
                                <View>
                                <Image style={style.infoActorsImage} source={{uri:item.url_small_image} }></Image>
                                <Text style={{fontSize:10, fontWeight:'bold'}}>{item.name}</Text>
                                </View>
                            );
                        })
                } 
            
              
                </View>
                </View>

                    {/* 줄거리영역 */}
                    <View>
                        <Text style={style.title}> ★ Summary</Text>
                        <View style={style.borderTop}></View>
                        <Text style={style.description}>{this.state.data.description_full}</Text>
                    </View>

                

                </ScrollView>
            ) 
            :
            (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#E70915"></ActivityIndicator>
                </View>
            );
    }

    loadData=()=>{
        const id= this.props.navigation.getParam('id');
        fetch('https://yts.lt/api/v2/movie_details.json?movie_id='+id+'&with_image=true&with_cast=true')
        .then(response=>response.json())
        .then(json=>this.setState({data:json.data.movie}) );//주소가 다르다
    }

    componentDidMount(){
        this.loadData();
    }
}

const style= StyleSheet.create({
    root:{flex:1, backgroundColor:'#F9F9F9'},
    title:{
        fontSize:20,
        fontWeight:'bold',
        paddingTop:24,
        paddingRight:16,
        paddingBottom:8,
        paddingLeft:16,
    },
    infoActors:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:16,
        paddingRight:16,
        marginRight:1,
    },
    infoActorsImage:{
        width:70, 
        height:80, 
        marginRight:4,
    },

    infoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:16,
        paddingRight:16,
    },
    description:{
        paddingLeft:16,
        paddingRight:16,
    },
    borderTop:{
        borderWidth:0.2,
        borderColor:'#F15F5F',
        marginBottom:10,
      
    }
});