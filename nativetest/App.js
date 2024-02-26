import { StatusBar } from 'expo-status-bar';
import FoodApi from './apitest/apitest';
import { NavigationContainer } from '@react-navigation/native';

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
