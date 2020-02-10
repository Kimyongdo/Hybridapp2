import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Community extends Component{
    render(){
        return (
            <View style={style.root}>
                <Text>Community</Text>
            </View>
        );
    }
}

const style= StyleSheet.create({
    root:{flex:1, justifyContent:'center', alignItems:'center'},
});