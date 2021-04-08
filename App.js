import React from 'react';
import Loading from "./Loading";
import {Alert} from "react-native";
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY = "dc268d54375d80e31acec86ab0bb116a";

export default class extends React.Component {
  state  = {
    isLoading: true
  };
  getWeather = async(latitude, longitude)=>{
    const {data} = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    console.log(data);
  }

  getLocation = async()=>{
    try{
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false});
    } catch(error){
      Alert.alert("can't find you.", "so sad");
    }
  }

  componentDidMount(){
    this.getLocation();
  }
  render(){
    const {isLoading} = this.state;
    return (
    isLoading ? <Loading/> : null
    );
  }
}

