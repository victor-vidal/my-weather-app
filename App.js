import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput 
} from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 50,
    borderRadius: 25,
    backgroundColor: "#7ad7ff",
  },
  textInputStyle: {
    marginTop: 25,
    padding: 25,
    borderRadius: 25,
    backgroundColor: "grey",
    color: "white"
  },  
  buttonContainer: {
    marginTop: 25,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "grey"
  },
  textStyle: {
    color: "white"
  },
  infoText: {
    backgroundColor: "grey",
    color: "white",
    padding: 25,
    borderRadius: 15,
    marginBottom: 10
  }
});


export default function App() {
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");

  const axiosInstance = axios.create({
    baseURL: "https://weather.contrateumdev.com.br/api/weather",
    timeout: 60000
  });

  const getLocation = async () => {
    axiosInstance.get(`/city/?city=${encodeURI(city.trim())}`).then(response => {
      if (response.data.cod !== 200) {
        alert("Couldn't get weather and temp!!");
        setWeather("");
        setTemp("");
        return;
      }

      setWeather(response.data.weather[0].description);
      setTemp(response.data.main.temp);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.infoText}>
            Weather: {weather? weather : "-"}
          </Text>
          <Text style={styles.infoText}>
            Temp: {temp? temp : "-"}
          </Text>
        </View>
        <TextInput 
          style={styles.textInputStyle} 
          placeholder="Type a city" 
          placeholderTextColor="white"
          value={city}
          onChangeText={text => setCity(text)}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={getLocation}
        >
          <Text style={styles.textStyle}>Press to get weather!</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
