import React from 'react';
import Loading from "./Loading";
import {Alert} from "react-native";
import * as Location from 'expo-location';
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "dc268d54375d80e31acec86ab0bb116a"; //날씨 API키

//React-Native 날씨 정보APP
export default class extends React.Component {
  state  = {
    isLoading: true, //로딩중
  };

  //현재날씨를 가져오기 promise함수
  getWeather = async(latitude, longitude)=>{ 
    const {data} = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    ); //위도, 경도, API키로 날씨 정보를 가져오는 API (정보를 가져올때 까지 기다림)
    this.setState({ //state에 정보 추가, 수정
      isLoading:false, //로딩완료 
      temp: data.main.temp, //온도
      condition: data.weather[0].main, //현재날씨
      city: data.name, //현재위치
      speed:data.wind.speed, //풍속
      humidity:data.main.humidity, //습도
      pressure:data.main.pressure, //기압
      clouds:data.clouds.all}); //구름

    };

  //위치정보를 가져오기 위한 promise함수
  getLocation = async()=>{ 
    try{ //위치정보를 가져왔을때
      await Location.requestPermissionsAsync(); //함수 실행을 잠시 정지후 위치정보에 대한 권한을 가져올때 까지 기다림
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync(); //함수 실행을 잠시 정지후 위치정보의 접근 권한을 확인 후, 위도와 경도 값 가져올 때까지 기자림
      this.getWeather(latitude, longitude); //위치정보중 위도와 경도 값을 전달
    } catch(error){ //위치정보를 가져오지 못할 경우
      Alert.alert("can't find you.", "so sad"); //경고창 출력
    }
  }

  //render() 호출 이후 실행
  componentDidMount(){ 
    this.getLocation(); //현재위치를 가져오는 함수 호출
  }

  //출력될 화면
  render(){
    const {isLoading, temp, condition, city, speed, humidity, pressure, clouds} = this.state; //this.state."" 를 간소화
    return (
    isLoading ? <Loading/> : 
    <Weather temp={Math.round(temp)-273} condition={condition} city={city} speed={speed} humidity={humidity} pressure={pressure} clouds={clouds}/>
    ); //isLoading가 true인 경우 Loading컴포넌트 호출 아닐경우 Weather컴포넌트 호출(날씨정보 props를 전달)
  }
}

