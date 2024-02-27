import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchName from './search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Main = () => {

    const Tap = createBottomTabNavigator();

    return (
        <>
            <SearchName/>
        </>
    )
}

export default Main;