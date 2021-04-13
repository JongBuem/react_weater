import React from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';

//로딩중일 경우 출력 되는 화면
export default function Loading(){ 
    return(
        <View style={styles.container}> 
            <StatusBar barStyle="dark-content"/>
            <Text style={styles.text}>Gotting the fucking weater...</Text>
        </View>
    );
}

//스타일링
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent:"flex-end",
        paddingHorizontal:30,
        paddingVertical:100,
        backgroundColor: "#FDF6AA"
      },
      text: {
        color:"#2c2c2c",
        fontSize: 40
      }
  });
