import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FoodApi from './apitest/apitest';

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <FoodApi/>
      </NavigationContainer>
    </>
  );
}
