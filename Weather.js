import React from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

//현재 날씨의 따른 아이콘, 이름, 배경색을 제공한다
const WeatherOptions = {
    Thunderstorm:{
        iconName : "weather-lightning-rainy",
        weatherName : "번개",
        color: ["#000000","#414345","#434343"]
    },
    Drizzle : {
        iconName : "weather-pouring",
        weatherName : "비 조금",
        color: ["#536976", "#BBD2C5"]
    },
    Rain: {
        iconName : "weather-pouring",
        weatherName : "비",
        color: ["#292E49", "#536976", "#BBD2C5"]
    },
    Snow: {
        iconName : "weather-snowy-heavy",
        weatherName : "눈",
        color: ["#D6A4A4","#ECE9E6","#fff"]
    },
    Atmosphere: {
        iconName : "weather-sunny-alert",
        weatherName : "맑음",
        color: ["#076585","#fff"]
    },
    Clear: {
        iconName : "weather-sunny",
        weatherName : "맑음",
        color: ["#f83600","#fe8c00","#fcb045"]
    },
    Clouds: {
        iconName : "weather-cloudy",
        weatherName : "구름",
        color: ["#000046","#2980B9", "#f2fcfe", ]
    },
    Dust: {
        iconName : "weather-windy",
        weatherName : "먼지",
        color: ["#CAC531","#f7ff00","#F3F9A7"]
    },
    Haze: {
        iconName : "weather-fog",
        weatherName : "먼지",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Mist: {
        iconName : "weather-cloudy",
        weatherName : "흐림",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Fog: {
        iconName : "weather-fog",
        weatherName : "흐림(안개)",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Smoke: {
        iconName : "weather-fog",
        weatherName : "흐림(안개)",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Sand: {
        iconName : "weather-fog",
        weatherName : "흐림(황사)",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Ash: {
        iconName : "weather-windy",
        weatherName : "바람",
        color: ["#CAC531","#f7ff00","#F3F9A7"]
    },
    Squall: {
        iconName : "weather-windy",
        weatherName : "돌풍",
        color: ["#CAC531","#f7ff00","#F3F9A7"]
    },
    Tornado: {
        iconName : "weather-tornado",
        weatherName : "폭풍",
        color: ["#0F2027", "#203A43"]
    },
}

//로딩이 완료되면 출력되는 날씨 정보
export default function Weather({temp, condition, city, speed, humidity, pressure, clouds}){ 
    let icon = WeatherOptions[ condition].iconName; //날씨아이콘
    let backgroundColor = WeatherOptions[ condition].color; //배경색
    let weatherName = WeatherOptions[ condition].weatherName; //현재날씨
    return(
        <LinearGradient colors={backgroundColor} style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.halfcontainer}>
                <MaterialCommunityIcons name={icon} size={96} color="white" />
                <Text style={styles.temp}>{temp}° </Text>
                <Text style={styles.city}>{city} </Text>
            </View>
            <View style={{...styles.halfcontainer, ...styles.textcontainer}}>
                <View>
                    <Text style={styles.tile}>{weatherName}</Text>
                    <Text style={styles.tileinfo}>현재 날씨 {weatherName}, 기온은 {temp}° 입니다.</Text>
                </View>
                <View style={styles.weatherinfo}>
                    <View style={styles.info}>
                        <Text  style={styles.info_title}>습도</Text> 
                        <Text  style={styles.info_info}>{humidity}%</Text> 
                    </View>
                    <View style={styles.info}>
                        <Text  style={styles.info_title}>구름</Text> 
                        <Text  style={styles.info_info}>{clouds}%</Text> 
                    </View>
                    <View style={styles.info}>
                        <Text  style={styles.info_title}>풍속</Text> 
                        <Text  style={styles.info_info}>{speed}m/s</Text> 
                    </View>
                    <View style={styles.info}>
                        <Text  style={styles.info_title}>기압</Text> 
                        <Text  style={styles.info_info}>{pressure}hPa</Text> 
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

//지정한 날씨의 이름 이외의 값은 오류이다라고 타입 설정
Weather.propTypes = {
    condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Dust",
    "Haze",
    "Mist",
    "Fog",
    "Smoke",
    "Sand",
    "Ash",
    "Squall",
    "Tornado"]).isRequired,
}

//스타일링
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent:"center",
    },
    temp:{
        fontSize:42,
        color:"white"
    },
    city:{
        fontSize:20,
        color:"white",
        fontWeight:"600",
    },
    halfcontainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    textcontainer:{
        paddingLeft : 40,
        paddingRight : 40,
        alignItems : "flex-start" 
    },
    tile:{
        color:"white",
        fontWeight:"300",
        fontSize:54,
    },
    tileinfo:{
        color:"white",
        marginBottom:20,
    },
    weatherinfo:{
        flexWrap :"wrap",
        flexDirection : "row"	
    },
    info:{
        width:"50%",
        marginBottom:10,
        alignItems:"flex-start",
    },
    info_title:{
        color:"#eeeeee",
    },
    info_info:{
        color:"white",
        fontWeight:"600",
        fontSize:24,
        alignItems:"flex-start",
    },
  });
