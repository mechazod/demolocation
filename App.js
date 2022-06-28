/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {askForLocation} from './permission';
import Geolocation from '@react-native-community/geolocation';

import MapView from 'react-native-maps';

const Section = ({children, title, event = () => {}}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity style={styles.sectionContainer} onPress={event}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const App: () => Node = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [initialPos, setInitialPos] = useState('unknown');
  const [lastPos, setLastPos] = useState('unknown');
  const [mapRenderComplete, setMapRenderComplete] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onGetAddress = async () => {
    const geoInfo = JSON.parse(lastPos.lastPosition);
    const {latitude, longitude} = geoInfo?.coords;
    console.log(`lat: ${latitude}, lon: ${longitude}`);
    await this.mapView
      .addressForCoordinate({latitude, longitude})
      .then(address => {
        console.log('address: ', address);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  };

  const onRequestPermission = () => {
    console.log('onRequestPermission');
    askForLocation();
    Geolocation.requestAuthorization();
  };

  const onStartObserving = () => {
    console.log('onStartObserving');
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      console.log('LASTPOS: ', lastPosition);
      setLastPos({lastPosition});
    });
  };

  const onStopObserving = () => {
    console.log('onStopObserving: ', this.watchID);
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  };

  const onGetCurrentPosition = () => {
    console.log('onGetCurrentPosition: ', this.watchID);
    Geolocation.getCurrentPosition(
      success => {
        console.log('CURRENT>POS: ', success);
        setInitialPos(success);
      },
      error => {
        console.log('ERROR: ', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One" event={() => onRequestPermission()}>
            Request <Text style={styles.highlight}>permission</Text> for
            location access
          </Section>
          <Section title="Step Two" event={() => onStartObserving()}>
            Start to <Text style={styles.highlight}>observe</Text> when you need
            location data
          </Section>
          <Section title="Step Three" event={() => onStopObserving()}>
            <Text style={styles.highlight}>Stop</Text> observing when you have
            what you need
          </Section>
          <Section
            title="Current Position"
            event={() => onGetCurrentPosition()}>
            Geolocation.getCurrentPosition()
          </Section>
          <Section title="Geo Reverse Coding" event={() => onGetAddress()}>
            addressForCoordinate() using react-native-maps
          </Section>
        </View>
        <View>
          <MapView
            ref={ref => {
              this.mapView = ref;
            }}
            showsPointsOfInterest
            toolbarEnabled
            loadingEnabled
            zoomEnabled
            zoomTapEnabled
            showsCompass
            showsMyLocationButton
            showsUserLocation
            minZoomLevel={17}
            maxZoomLevel={18}
            onRegionChangeComplete={() => {
              setTimeout(() => {
                if (!mapRenderComplete) {
                  onGetAddress();
                }
                setMapRenderComplete(true);
              }, 1500);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
