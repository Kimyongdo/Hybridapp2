import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import InputComponent from '../components/InputComponent';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{
    render(){
        return (
            <View style={style.root}>                
                {/* 크게 2개영역으로 구성 */}
                {/* 1. 로그인콘텐츠 영역 */}
                <View style={style.content}>
                    {/* 1.1 로고 */}
                    <View >
                         <Text style={style.logo}>CINEMA</Text>
                    </View>

                    {/* 1.2 이메일/패스워드 입력박스 */}
                    {/* TextInput은 로그인,회원가입,비밀번호리셋화면에 모두 사용되므로 사용빈도가 높음 */}
                    {/* 이를 일일이 스타일링하는 것이 번거롭고 수정도 어려워서 별도의 component로 제작하여 재사용함 */}
                    <InputComponent placeholder="이메일" secureTextEntry={false}></InputComponent>
                    <InputComponent placeholder="비밀번호" secureTextEntry={true}></InputComponent>

                    {/* 1.3 비밀번호 재설정 버튼 - Text컴포넌트는 onPress가 동작함 */}
                    <Text style={style.resetPW} onPress={()=>{this.props.navigation.navigate('RestPW')}}>비밀번호 재설정</Text>

                    {/* 1.4 로그인 버튼 */}
                    {/* 가로 전체 사이즈의 버튼을 만들기 위해 View로 감싸기 */}
                    <View style={{width:'100%', marginBottom:24, backgroundColor:'#121212'}}>
                        <Button title="로그인" onPress={this.login} color="#222222"></Button>
                    </View> 

                    {/* 1.5 회원가입 */}
                    <Text style={style.signup}>
                        계정이 없으신가요? <Text style={style.signupLink} onPress={ ()=>this.props.navigation.navigate('SignUp') }>가입하기</Text>
                    </Text>
                </View>

                {/* 2. Footer영역 */}
                <View style={style.footer}>
                    <Text style={style.footerCopyright}> Copyright 2020. Kim. All rights reserved </Text>
                </View>
            </View>
        );
    }//render

    login= async ()=>{
        //원래는 서버에 전송하는 코드사용해야 하지만 시간상 이는 생략!!

        //대신 다음에 또 로그인하면 사용자가 귀찮아 하므로
        //디바이스에 로그인유무를 저장
        await AsyncStorage.setItem('isLogin', 'email');//임시로 'email'이라는 글씨저장

        //로그인 되었다면 앱의 주요화면인 MovieList.js를 가진 DrawerNav로 이동
        this.props.navigation.navigate('drawerNav');
    }

    //네비게이터 옵션 [static은 새로고침으로 반영되지 않음. 반드시 re-run해야함]
    static navigationOptions={
        headerShown: false,  //헤더영역 없애기
    };

}//class

const style= StyleSheet.create({
    root:{flex:1, backgroundColor:'#FF4848'},
    content:{
        flex:1, //높이가 footer제외 모든 영역
        justifyContent:'center',
        alignItems:'center',
        padding:60,
    },
    footer:{
        borderTopWidth: 1,
        borderTopColor: 'white',
        padding:8,
    },
    footerCopyright:{
        color:'black',
        textAlign:'center',
    },
    logo:{
        color:'#ffffff',
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:70,
    },
    resetPW:{
        width:'100%',
        textAlign:'right',
        fontWeight:'bold',
        color:'black',
        marginTop:8,
        marginBottom:16,
        marginRight:8,
    },
    signup:{
        color:'black',
        textAlign:'center',
        fontWeight:'bold',
    },
    signupLink:{
        color:'white',
        fontWeight:'bold',
        marginLeft:10,
    }
});