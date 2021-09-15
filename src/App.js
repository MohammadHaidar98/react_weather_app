import React from 'react'
import Weather from './components/weather'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css'
import Form from './components/form';


const Api_key="639ae731acf84a34df7a47251974d0d5";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;











/* api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key} */
// const App = () => {
//   const [city,setCity]= useState("");
//   const [country,setCountry]= useState("");
//   const [c,setC]= useState("");
//   const [co,setCo]= useState("");
//   const [icon,setIcon]= useState();
//   const [celisus,setCelisus]= useState();
//   const [temp_max,setTemp_max]= useState();
//   const [temp_min,setTemp_min]= useState();
//   const [decription,setdescription]= useState("");
//   const [error,setError]= useState(false);

//  let calCelisus=(t)=>{
//   let cell=Math.floor(t-273.15)
//   return cell;
//  }
//  let getIcon=(weicon,rangeId)=>{
//     switch(true){
//       case rangeId >=200 && rangeId <=232:
//         setIcon(weatherIcon.Thunderstorm);
//         break;
//       case rangeId >=300 && rangeId <=321:
//         setIcon(weatherIcon.Drizzle);
//         break;
//       case rangeId >=500 && rangeId <=531:
//         setIcon(weatherIcon.Rain);
//         break;
//       case rangeId >=600 && rangeId <=622:
//         setIcon(weatherIcon.Snow);
//         break;
//       case rangeId >=701 && rangeId <=781:
//         setIcon(weatherIcon.Atmospher);
//         break;
//       case rangeId >=800:
//         setIcon(weatherIcon.Clear);
//         break;
//       case rangeId >=801 && rangeId<=804:
//         setIcon(weatherIcon.Clouds);
//         break;
//         default:
//           setIcon(weatherIcon.Clouds);
//     }
//  }

//  let weatherIcon={
//    Thunderstorm:"wi-thunderstorm",
//    Drizzle:"wi-sleet",
//    Rain:"wi-storm-showers",
//    Snow:"wi-snow",
//    Atmospher:"wi-fog",
//    Clear:"wi-day-sunny",
//    Clouds:"wi-day-fog"
//  }
//  const GetWeather=async(v1,v2)=>{
//   // e.preventDefault();
//    let city=v1;
//    let country=v2;
//    if(city && country){
     
//    const Api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}`); 
//    const response=await Api_call.json();
//    console.log(response);
//    setCity(response.name)
//    setCountry(response.sys.country)
//    setCelisus(calCelisus(response.main.temp))
//    setTemp_max(calCelisus(response.main.temp_max))
//    setTemp_min(calCelisus(response.main.temp_min))
//     setdescription(response.weather[0].description)
//     setIcon(weatherIcon.Thunderstorm)
//    getIcon(weatherIcon,response.weather[0].id)
//    }
//    else{
//      setError(true);
//    }
//   }
   
 
 
  
  
//   return (
//     <div className="App">
     
//       <Form getCity={e=>setC(e)} getCountry={e=>setCo(e)}  error={error}/>
//       <GetWeather v1={c} v2={co}/>
//       <Weather city={city} country={country} 
//       temp_celisus={celisus}
//       temp_max={temp_max}
//       temp_min={temp_min}
//       decription={decription}
//       weathericon={icon}
//        />
      
//     </div>
//   )
// }

// export default App
