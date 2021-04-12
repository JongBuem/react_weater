import React from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const WeatherOptions = {
    Thunderstorm:{
        iconName : "weather-lightning-rainy",
        color: ["#000000","#414345","#434343"]
    },
    Drizzle : {
        iconName : "weather-pouring",
        color: ["#536976", "#BBD2C5"]
    },
    Rain: {
        iconName : "weather-pouring",
        color: ["#292E49", "#536976", "#BBD2C5"]
    },
    Snow: {
        iconName : "weather-snowy-heavy",
        color: ["#D6A4A4","#ECE9E6","#fff"]
    },
    Atmosphere: {
        iconName : "weather-sunny-alert",
        color: ["#076585","#fff"]
    },
    Clear: {
        iconName : "weather-sunny",
        color: ["#f83600","#fe8c00","#fcb045"]
    },
    Clouds: {
        iconName : "weather-cloudy",
        color: ["#000046","#2980B9", "#f2fcfe", ]
    },
    Dust: {
        iconName : "weather-windy",
        color: ["#CAC531","#f7ff00","#F3F9A7"]
    },
    Haze: {
        iconName : "weather-fog",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Mist: {
        iconName : "weather-fog",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Fog: {
        iconName : "weather-fog",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Smoke: {
        iconName : "weather-fog",
        color: ["#859398","#757F9A","#D7DDE8"]
    },
    Sand: {
        iconName : "weather-windy",
        color: ["#CAC531","#f7ff00","#F3F9A7"]
    },
    Ash: {
        iconName : "weather-windy",
        color: ["#CAC531","#f7ff00","#F3F9A7"]
    },
    Squall: {
        iconName : "weather-windy",
        color: ["#CAC531","#f7ff00","#F3F9A7"]
    },
    Tornado: {
        iconName : "weather-hurricane",
        color: ["#0F2027", "#203A43"]
    },
}

export default function Weather({temp, condition}){
    let icon = WeatherOptions[condition].iconName;
    let backgroundColor = WeatherOptions[condition].color;
    return(
        <LinearGradient colors={backgroundColor} style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.halfcontainer}>
                <MaterialCommunityIcons name={icon} size={96} color="white" />
                <Text style={styles.temp}>{temp}°</Text>
            </View>
            <View style={{...styles.halfcontainer, ...styles.textontainer}}>
                <Text style={styles.tile}>asd</Text>
                <Text style={styles.subtile}>asd</Text>
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
        alignItems:"center",
    },
    temp:{
        fontSize:42,
        color:"white"
    },
    halfcontainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    textontainer:{
      marginLeft:-200,
      padding : 23
    },
    tile:{
        color:"white",
        fontWeight:"300",
        fontSize:54,
        marginBottom:10,
    },
    subtile:{
        color:"white",
        fontWeight:"600",
        fontSize:24,
        alignItems:"flex-start",

    },
  });
