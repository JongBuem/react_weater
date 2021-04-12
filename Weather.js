import React from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function Weather({temp, condition, city, speed, humidity, pressure}){
    let icon = WeatherOptions[condition].iconName;
    let backgroundColor = WeatherOptions[condition].color;
    let weatherName = WeatherOptions[condition].weatherName;
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
                <Text style={styles.info}>풍속 : {speed}m/s</Text>
                <Text style={styles.info}>습도 : {humidity}%</Text>
                <Text style={styles.info}>기압 : {pressure}hPa</Text>
            </View>
        </LinearGradient>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
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
    info:{
        color:"white",
        fontWeight:"600",
        fontSize:24,
        alignItems:"flex-start",
        marginBottom:5,
    },
  });
