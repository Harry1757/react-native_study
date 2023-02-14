/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
const {width: SCREENWIDTH} = Dimensions.get('window');
import * as Location from 'expo-location';

function App(): JSX.Element {
  const [city, setCity] = useState<any>('');
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: {latitude, longitude},
    } = await Location.getCurrentPositionAsync({accuracy: 5});
    const nowLocation = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps: false},
    );
    setCity(nowLocation[0].city);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="tomato" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  cityName: {
    fontSize: 60,
    fontWeight: '500',
    color: 'black',
  },
  city: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {},
  day: {
    width: SCREENWIDTH,
    alignItems: 'center',
  },
  temp: {
    fontSize: 178,
    marginTop: 50,
    color: 'black',
  },
  description: {
    fontSize: 60,
    color: 'black',

    marginTop: -40,
  },
});

export default App;
