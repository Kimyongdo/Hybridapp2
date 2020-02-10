import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//체크로그인화면을 AsyncStorage에 저장되어 있는 로그인 유무 여부를 
//판단하여 로그인화면 or 영화소개화면으로 이동하는 역할만 하므로
//굳이 stateful 컴포넌트가 아니어도 됨, stateless컴포넌트로 제작
const CheckLogin= (props)=>{ //stateless는 props를 파라미터로 전달받음

    //AsyncStorage에서 로그인유무 읽어오기
    AsyncStorage.getItem('isLogin')
    .then( (value)=>{
        if(value) props.navigation.navigate('drawerNav');
        else props.navigation.navigate('loginStackNav');
    } );

    return (
        <View style={style.root}>
            <ActivityIndicator></ActivityIndicator>
        </View>
    );
}

export default CheckLogin;

// export default class CheckLogin extends Component{
//     render(){
//         return (
//             <View style={style.root}>
//                 <Text>Check Login</Text>
//             </View>
//         );
//     }
// }

const style= StyleSheet.create({
    root:{flex:1, justifyContent:'center', alignItems:'center'},
});