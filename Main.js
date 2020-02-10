import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './screen_login/Login';
import SignUp from './screen_login/SignUp';
import ResetPassword from './screen_login/ResetPassword';

import MovieList from './screen_movie/MovieList';
import MovieDetail from './screen_movie/MovieDetail';

import Community from './screen_community/Community';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import CheckLogin from './CheckLogin';

//로그인화면 3개을 가진 StackNavigator 생성
const loginStackNav= createStackNavigator({
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    RestPW: {screen: ResetPassword},
});

//영화관련화면 2개을 가진 StackNavigator생성
const movieStackNav= createStackNavigator({
    MovieList,       //screen의 컴포넌트명과 Navigator의 별칭과 같다면 컴포넌트명만 작성할 수 있음.
    MovieDetail,
});

//community화면 관련 StackNavigator생성
const communityStackNav= createStackNavigator({
    Community,
});

//Drawer로 영화소개화면과 Community화면을 이동하기 위해 Navigator생성
const drawerNav= createDrawerNavigator(
    {
        movieStackNav,
        communityStackNav,
    },
    {//drawer 옵션
        drawerPosition:'left',
        drawerType:'slide',
    }
);

//백스택에 화면을 보관하지 않고 화면을 전환시켜주는 SwitchNavigator 생성
const switchNav= createSwitchNavigator(
    {
        CheckLogin,
        loginStackNav,
        drawerNav,
    },
    {
        initialRouteName:'CheckLogin',        
    }
);

//Navigator를 가진 AppContainer객체 생성
const AppContainer= createAppContainer( switchNav );

//Main컴포넌트에 AppContainer 보이기
export default class Main extends Component{
    render(){
        return <AppContainer></AppContainer>;
    }
}