import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Button, Alert} from 'react-native';
import TabComponent from '../components/TabComponent';
import InputComponent from '../components/InputComponent';

export default class ResetPassword extends Component{

    constructor(){
        super();
        this.state={
            tabs: ["이메일", "전화번호"],
            tabIndex: 0, //현재 선택된 탭번호
            message:[
                "이메일을 입력하면 임시 비밀번호를 메일로 보내 드립니다.",
                "전화번호를 입력하면 임시 비밀번호를 SMS로 전송합니다.",
            ],

        };
    }

    //탭번호 변경 메소드
    setTabIndex= (index)=>{
        this.setState({tabIndex: index});
    }

    render(){
        return (
            <View style={style.root}>
                {/* 1. 콘텐츠 영역 */}
                <View style={style.content}>
                    {/*1.1 자물쇠 모양의 이미지 표시 영역 */}
                    <View style={style.lockImageContainer}>
                        <Image source={require('../images/key.png')}></Image>
                    </View>

                    {/* 1.2 타이틀 글씨*/}
                    <Text style={style.title}>로그인에 문제가 있나요?</Text>

                    {/* 1.3 메세지 출력 */}
                    <Text style={style.message}> {this.state.message[this.state.tabIndex]} </Text>

                    {/* 1.4 탭영역 */}
                    <View style={style.tabContainer}>
                        {
                            this.state.tabs.map( (item, index)=>{
                                return <TabComponent label={item} selected={this.state.tabIndex==index} onPress={()=>this.setTabIndex(index)} key={"Tab"+index}></TabComponent>
                            } )
                        }                        
                    </View>

                    {/* 1.5 정보입력 영역 */}
                    <InputComponent placeholder={this.state.tabs[this.state.tabIndex]}></InputComponent>

                    {/* 1.6 다음 버튼 */}
                    <View style={{width:'100%', margin:16}}>
                        <Button title="다음" color='black' onPress={ ()=>Alert.alert('임시 비밀번호 발송 완료, 이메일을 확인해주세요') }></Button>
                    </View>
                </View>

                {/* 2. footer 영역 */}
                <View style={style.footer}>
                    <Text style={style.goBack} onPress={()=>this.props.navigation.goBack()}>로그인 화면</Text>
                </View>
                
            </View>
        );
    }

    //네비게이터 옵션 [static은 새로고침으로 반영되지 않음. 반드시 re-run해야함]
    static navigationOptions={
        headerShown: false,  //헤더영역 없애기
    };
}

const style= StyleSheet.create({
    root:{flex:1, backgroundColor:'#FFEAEA'},
    content:{
        flex:1,
        width:'100%',
        alignItems:'center',
        padding:32,
    },
    footer:{
        borderTopWidth: 1,
        borderColor:'#F15F5F',
        padding:8,
    },
    goBack:{
        color: 'black',
        textAlign:'center',
    },
    lockImageContainer:{
        padding:24,
        borderWidth:2,
        borderColor: '#F15F5F',
        borderRadius:30, //코너반지름의 값이 원이 될 정도 값 이상을 주면 무조건 원이 됨
        margin:16,
    },
    title:{
        textAlign:'center',
        fontSize:16,
        marginBottom:16,
    },
    message:{
        textAlign:'center',
        marginBottom:16,
        color:'#292929',
    },
    tabContainer:{
        flexDirection:'row',
        marginBottom:16,
    }
});