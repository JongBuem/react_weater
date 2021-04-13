# react_weater

- React-Native로 제작한 날씨 애플리케이션<br>
- 노마더코더사이트에서 진행한 클론코딩
- React-Native 실행을 expo를 이용

---

## **React Native 란?**

- React의 접근 방법을 모바일로 확장하는 페이스북의 오픈소스 프로젝트
- 자바스크립트로 작업하지만 Interface는 Native Widget으로 표시하는 방법
- iOS 와 Android 에서 모두 자바스크립트 환경에서 Native로 개발(실행) 가능
- iOS와 Android를 동시에 이해하는 브릿지를 만들지만 이브릿지가 항상 필요하며, 브릿지로 많은 데이터를 보내면 성능저하 (부하) 이슈 발생

---

## **React Native CLI**

- CLI 방식은 Native 파일들을 많이 컨트롤 하고 싶을 때 사용
- 우리대신 Xcode(ios)파일, Android파일을 생성하고 파일들을 React Native 에서 실행
- 설치 : npm install -g expo-cli

---

## **expo**

- 장점 : windows에서 ios 앱을 빌드 가능, 편리한 CLI 활용
- 단점 : 크기가 큰 Native 파일들을 제어 할 수 없다는 것(빌드 파일 크기가 매우 크다), 제공하는 API만 이용이 가능
- 설치 : 설치위치 - expo init 프로젝트명 - 옵션 선택
- 실행 : npm start

---

## **동작화면**

<img width="180px" height="300px" src="https://user-images.githubusercontent.com/75786010/114592985-842e0c00-9cc6-11eb-9420-e050ef6e21e8.jpg"></img>
<img width="180px" height="300px" src="https://user-images.githubusercontent.com/75786010/114592870-5f399900-9cc6-11eb-9674-b0f3f5c1e46b.jpg"></img>
<img width="180px" height="300px" src="https://user-images.githubusercontent.com/75786010/114587973-22b76e80-9cc1-11eb-9ded-43c15412d621.jpg"></img>
<img width="180px" height="300px" src="https://user-images.githubusercontent.com/75786010/114592925-74162c80-9cc6-11eb-960a-247cd793dcfe.jpg"></img>

---

## **코드리뷰**

<br>

## App컴포넌트

> expo에서 제공하는 API 중 현재위치(위도,경도)값 을 가지고 "openweathermap"사이트에서 제공하는 날씨 API에 현재위치(위도,경도)값을 이용하여 지금위치의 날씨 정보를 가져옵니다.<br> 혹시라도 현재위치를 가져오지 못하는 경우를 대비하여 경고창이 출력되게 하였습니다.<br>날씨 정보를 가져오기전엔 로딩중으로 Loading컴포넌트를 호출하고, 로딩중이 끝나면 Weather컴포넌트 호출(날씨정보 props를 전달) 합니다.

```js
const API_KEY = "dc268d54375d80e31acec86ab0bb116a"; //날씨 API키

//React-Native 날씨 정보APP
export default class extends React.Component {
  state = {
    isLoading: true, //로딩중
  };

  //현재날씨를 가져오기 promise함수
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    ); //위도, 경도, API키로 날씨 정보를 가져오는 API (정보를 가져올때 까지 기다림)
    this.setState({
      //state에 정보 추가, 수정
      isLoading: false, //로딩완료
      temp: data.main.temp, //온도
      condition: data.weather[0].main, //현재날씨
      city: data.name, //현재위치
      speed: data.wind.speed, //풍속
      humidity: data.main.humidity, //습도
      pressure: data.main.pressure, //기압
      clouds: data.clouds.all,
    }); //구름
  };

  //위치정보를 가져오기 위한 promise함수
  getLocation = async () => {
    try {
      //위치정보를 가져왔을때
      await Location.requestPermissionsAsync(); //함수 실행을 잠시 정지후 위치정보에 대한 권한을 가져올때 까지 기다림
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync(); //함수 실행을 잠시 정지후 위치정보의 접근 권한을 확인 후, 위도와 경도 값 가져올 때까지 기자림
      this.getWeather(latitude, longitude); //위치정보중 위도와 경도 값을 전달
    } catch (error) {
      //위치정보를 가져오지 못할 경우
      Alert.alert("can't find you.", "so sad"); //경고창 출력
    }
  };

  //render() 호출 이후 실행
  componentDidMount() {
    this.getLocation(); //현재위치를 가져오는 함수 호출
  }

  //출력될 화면
  render() {
    const {
      isLoading,
      temp,
      condition,
      city,
      speed,
      humidity,
      pressure,
      clouds,
    } = this.state; //this.state."" 를 간소화
    return isLoading ? (
      <Loading />
    ) : (
      <Weather
        temp={Math.round(temp) - 273}
        condition={condition}
        city={city}
        speed={speed}
        humidity={humidity}
        pressure={pressure}
        clouds={clouds}
      />
    ); //isLoading가 true인 경우 Loading컴포넌트 호출 아닐경우 Weather컴포넌트 호출(날씨정보 props를 전달)
  }
}
```

<br>

## Weather컴포넌트

> App컴포넌트로 전달받은 props를 이용하여 해당 날씨에 맞게 "아이콘", "이름", "배경색"을 다르게 출력하게 하였습니다.<br>날씨 정보로 온도, 위치, 현재날씨, 날씨와 맞는 아이콘, 습도, 구름, 풍속, 기압 대한 수치나 값을 제공 중입니다.

```js
//현재 날씨의 따른 아이콘, 이름, 배경색을 제공한다
const WeatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning-rainy",
    weatherName: "번개",
    color: ["#000000", "#414345", "#434343"],
  },
  Drizzle: {
    iconName: "weather-pouring",
    weatherName: "비 조금",
    color: ["#536976", "#BBD2C5"],
  },
  Rain: {
    iconName: "weather-pouring",
    weatherName: "비",
    color: ["#292E49", "#536976", "#BBD2C5"],
  },
  Snow: {
    iconName: "weather-snowy-heavy",
    weatherName: "눈",
    color: ["#D6A4A4", "#ECE9E6", "#fff"],
  },
  Atmosphere: {
    iconName: "weather-sunny-alert",
    weatherName: "맑음",
    color: ["#076585", "#fff"],
  },
  Clear: {
    iconName: "weather-sunny",
    weatherName: "맑음",
    color: ["#f83600", "#fe8c00", "#fcb045"],
  },
  Clouds: {
    iconName: "weather-cloudy",
    weatherName: "구름",
    color: ["#000046", "#2980B9", "#f2fcfe"],
  },
  Dust: {
    iconName: "weather-windy",
    weatherName: "먼지",
    color: ["#CAC531", "#f7ff00", "#F3F9A7"],
  },
  Haze: {
    iconName: "weather-fog",
    weatherName: "먼지",
    color: ["#859398", "#757F9A", "#D7DDE8"],
  },
  Mist: {
    iconName: "weather-cloudy",
    weatherName: "흐림",
    color: ["#859398", "#757F9A", "#D7DDE8"],
  },
  Fog: {
    iconName: "weather-fog",
    weatherName: "흐림(안개)",
    color: ["#859398", "#757F9A", "#D7DDE8"],
  },
  Smoke: {
    iconName: "weather-fog",
    weatherName: "흐림(안개)",
    color: ["#859398", "#757F9A", "#D7DDE8"],
  },
  Sand: {
    iconName: "weather-fog",
    weatherName: "흐림(황사)",
    color: ["#859398", "#757F9A", "#D7DDE8"],
  },
  Ash: {
    iconName: "weather-windy",
    weatherName: "바람",
    color: ["#CAC531", "#f7ff00", "#F3F9A7"],
  },
  Squall: {
    iconName: "weather-windy",
    weatherName: "돌풍",
    color: ["#CAC531", "#f7ff00", "#F3F9A7"],
  },
  Tornado: {
    iconName: "weather-tornado",
    weatherName: "폭풍",
    color: ["#0F2027", "#203A43"],
  },
};

//로딩이 완료되면 출력되는 날씨 정보
export default function Weather({
  temp,
  condition,
  city,
  speed,
  humidity,
  pressure,
  clouds,
}) {
  let icon = WeatherOptions[condition].iconName; //날씨아이콘
  let backgroundColor = WeatherOptions[condition].color; //배경색
  let weatherName = WeatherOptions[condition].weatherName; //현재날씨
  return (
    <LinearGradient colors={backgroundColor} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.halfcontainer}>
        <MaterialCommunityIcons name={icon} size={96} color="white" />
        <Text style={styles.temp}>{temp}° </Text>
        <Text style={styles.city}>{city} </Text>
      </View>
      <View style={{ ...styles.halfcontainer, ...styles.textcontainer }}>
        <View>
          <Text style={styles.tile}>{weatherName}</Text>
          <Text style={styles.tileinfo}>
            현재 날씨 {weatherName}, 기온은 {temp}° 입니다.
          </Text>
        </View>
        <View style={styles.weatherinfo}>
          <View style={styles.info}>
            <Text style={styles.info_title}>습도</Text>
            <Text style={styles.info_info}>{humidity}%</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.info_title}>구름</Text>
            <Text style={styles.info_info}>{clouds}%</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.info_title}>풍속</Text>
            <Text style={styles.info_info}>{speed}m/s</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.info_title}>기압</Text>
            <Text style={styles.info_info}>{pressure}hPa</Text>
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
    "Tornado",
  ]).isRequired,
};

//스타일링
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  temp: {
    fontSize: 42,
    color: "white",
  },
  city: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  halfcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textcontainer: {
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: "flex-start",
  },
  tile: {
    color: "white",
    fontWeight: "300",
    fontSize: 54,
  },
  tileinfo: {
    color: "white",
    marginBottom: 20,
  },
  weatherinfo: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  info: {
    width: "50%",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  info_title: {
    color: "#eeeeee",
  },
  info_info: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
    alignItems: "flex-start",
  },
});
```

<br>

## Loading컴포넌트

> Weather컴포넌트가 날씨 정보를 받기전까지 user에게 제공하는 로딩 화면입니다.

```js
//로딩중일 경우 출력 되는 화면
export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>Gotting the fucking weater...</Text>
    </View>
  );
}

//스타일링
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 40,
  },
});
```

---
