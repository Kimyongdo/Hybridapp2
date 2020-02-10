import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import TabComponent from '../components/TabComponent';
import InputComponent from '../components/InputComponent';

export default class SignUp extends Component{

    constructor(){
        super();
        this.state={
            tabs: ["전화번호", "이메일"],  //탭라벨을 배열로 저장
            tabIndex: 0,      //현재 선택된 탭번호 저장변수
        };
    }

    //현재 선택된 탭번호(tabIndex)를 변경하는 메소드
    setTabIndex= (index)=>{
        this.setState({tabIndex: index});
    }

    render(){
        return (
            <View style={style.root}>
                {/* 1. 콘텐츠 영역 */}
                <View style={style.content}>
                    {/* 1.1 탭 영역 */}
                    <View style={style.tabContainer}>
                        {/* Tab버튼은 다른 곳에서도 사용하기때문에 별도의 component로 만들어서 재사용 */}
                        {/* 선택 탭이 어느것이지 제어할 수 있도록 탭들을 배열로 관리하고자 함 */}
                        {/* <TabComponent label={this.state.tabs[0]} selected={this.state.tabIndex==0} onPress={ ()=>this.setTabIndex(0) }></TabComponent>
                        <TabComponent label={this.state.tabs[1]} selected={this.state.tabIndex==1} onPress={ ()=>this.setTabIndex(1) }></TabComponent> */}

                        {/* 위 작업을 반복문으로 */}
                        {
                            this.state.tabs.map( (item, index)=>{
                                return <TabComponent label={item} selected={this.state.tabIndex==index} onPress={ ()=>this.setTabIndex(index) } key={"Tab"+index}></TabComponent>
                            } )
                        }
                    </View>

                    {/* 1.2 정보입력 : 현재탭의 라벨값으로 힌트제공*/}
                    <InputComponent placeholder={this.state.tabs[this.state.tabIndex]}></InputComponent>

                    {/* 1.3 이메일탭일때(tabIndex==1)는 비밀번호 입력칸도 있어야 함 */}
                    {
                        //if( this.state.tabIndex===1) //if문법 사용불가!!

                        // &&연산자를 통해 앞의 조건이 true일때 && 다음 코드가 실행되도록
                        this.state.tabIndex===1 && <InputComponent placeholder="비밀번호" secureTextEntry={true} color="black"></InputComponent>
                    }

                    {/* 1.4 전화번호 탭일때 다음 버튼 */}
                    {
                        this.state.tabIndex===0 && <View style={{width:'100%', margin:16, borderRadius:100}}><Button title="다음" onPress={ ()=>this.setTabIndex(1)} color="black"  ></Button></View> 
                    }

                    {/* 1.5 이메일 탭일때 다음 버튼 */}
                    {
                        this.state.tabIndex===1 && <View style={{width:'100%', margin:16,}}><Button title="완료" onPress={ ()=>this.props.navigation.goBack() } color="black" ></Button></View> 
                    }

                    {/* 1.6 전화번호 탭일때 안내메세지 */}
                    {
                        this.state.tabIndex===0 && <Text style={style.telMessage}></Text>
                    }

                </View>

                {/* 2. footer영역 */}
                <View style={style.footer}>
                    <Text style={style.footerMsg}>
                        이미 계정이 있으신가요? <Text style={style.goBack} onPress={ ()=>this.props.navigation.goBack() }>로그인</Text>
                    </Text>
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
        flex: 1,
        width:'100%',
        alignItems:'center', //가로축 가운데 정렬
        padding:32,
    },
    footer:{
        borderTopWidth: 1,
        borderTopColor: '#F15F5F',
        padding:8,
    },
    footerMsg:{
        color:"black",
        textAlign:'center',
    },
    goBack:{
        color:'#FF4848',
    },
    tabContainer:{
        flexDirection:'row',
        marginBottom: 16,
    },
    telMessage:{
        textAlign:'center',
        fontSize:12,
        color:'#929292',
        marginLeft:8,
        marginRight:8,
    },
});