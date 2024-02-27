import React from 'react';
import { Button } from 'react-native';

const IngredientsBasket = ({ route }) => {
    const { jsonData } = route.params;

    const removeList = () => {
        // 클릭된 이름을 삭제하는 작업
    }

    return (
        <>
            <Button onPress={removeList} title="삭제" />
        </>
    )
}

export default IngredientsBasket;
