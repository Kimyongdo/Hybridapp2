import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import BigCatalogList from '../components_movie/BigCatalogList';
import SubCatalogList from '../components_movie/SubCatalogList';

//별도 라이브러러 Async
import AsyncStorage from '@react-native-community/async-storage';

export default class MovieList extends Component{
    render(){

        //인기영화 정보 불러오는 Url
        const bigUrl="https://yts.lt/api/v2/list_movies.json?sort_by=like_count&order_by=&limit=5";
        
        // 최신등록순 영화 정보 불러오는 url 
        const recentUrl="https://yts.lt/api/v2/list_movies.json?sort_by=date_added&order_by=desc&limit=10";

        // 평점순 영화 정보 불러오는 url 
        const ratingtUrl="https://yts.lt/api/v2/list_movies.json?sort_by=rating&order_by=desc&limit=10";
        
        // 다운로드순 영화 정보 불러오는 url 
        const downloadUrl="https://yts.lt/api/v2/list_movies.json?sort_by=download_count&order_by=desc&limit=10";

        return (
            <ScrollView style={style.root}>
                {/* 1. 큰 이미지 가로 스크롤되는 영역 : 인기영화순 */}
                <BigCatalogList
                    url={bigUrl}
                    onPress={ (id)=>{ this.props.navigation.navigate('MovieDetail', {id, });} }></BigCatalogList>
                    {/* id는 이미 bigcataloglist에 있음  */}
                {/* 최신등록순, 평점순, 다운로드순 영화목록 보여주는 작은 사이즈 가로 스크롤 */}
                {/* 2. 최신등록순 */}
               
                <SubCatalogList title="최신등록순" url={recentUrl} onPress={id=>this.props.navigation.navigate('MovieDetail',{id, })}></SubCatalogList>
            
                {/* 3. 평점순 */}
                <SubCatalogList title="평점순" url={ratingtUrl} onPress={id=>this.props.navigation.navigate('MovieDetail',{id, })}></SubCatalogList>

                {/* 4. 다운로드순 */}
                <SubCatalogList title="다운로드순" url={downloadUrl} onPress={id=>this.props.navigation.navigate('MovieDetail',{id, })}></SubCatalogList>
                
            </ScrollView>
        );
    }

    //네비게이션 헤더바(액션바)의 옵션적용[re - run해야만 함]
    static navigationOptions= (props)=>{ //이 컴포넌트의 props를 파리미터로 전달받음.
        return {
                    headerTitleAlign:'center',
                    headerLeft: ()=>{
                        return <TouchableOpacity 
                                    style={{marginRight:16}}
                                    onPress={ ()=>{props.navigation.toggleDrawer()} }>
                                    <Image source={require('../images/ic_menu.png')}></Image>
                                </TouchableOpacity>},
                    headerRight: ()=>{
                        return <TouchableOpacity
                                    style={ {marginLeft:16, flexDirection:'row', alignItems:'center'} }
                                    onPress={ async ()=>{
                                        //다음에 앱을 실행할 때 로그인을 다시하도록..
                                        //AsyncStorage에서 로그인 여부 변경
                                        await AsyncStorage.removeItem('isLogin');
                                        //로그인 화면으로 이동
                                        props.navigation.navigate('CheckLogin');
                                    } }>
                                    <Image source={require('../images/ic_profile.png')}></Image>
                                    <Text style={{marginLeft:4}}>로그아웃</Text>
                               </TouchableOpacity>
                    }
                }
    }

}

const style= StyleSheet.create({
    root:{flex:1, backgroundColor:'black'},

});