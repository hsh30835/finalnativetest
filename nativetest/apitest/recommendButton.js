import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecommendButton = ({ jsonData }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('IngredientsBasket', { jsonData });
        console.log(jsonData);
    };

    return (
        <Button title="닭가슴살" onPress={handlePress} />
    );
};

export default RecommendButton;
