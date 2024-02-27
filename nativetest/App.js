import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from './apitest/main';

const Tap = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Main/>
      </NavigationContainer>
    </>
  );
}
