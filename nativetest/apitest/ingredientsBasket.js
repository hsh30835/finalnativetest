import React from "react";
import { Button, FlatList, Text, View } from "react-native";

const IngredientsBasket = ({ clickedNames, setClickedNames, recommendedNames, setRecommendedNames }) => {
    // 검색으로 담은 데이터 삭제
    const removeItem = (nameToRemove) => {
        setClickedNames(prevClickedNames => prevClickedNames.filter(name => name !== nameToRemove));
    }
    // 버튼으로 담은 데이터 삭제
    const removeButton = (buttonToRemove) => {
        setRecommendedNames(prevClickedNames => prevClickedNames.filter(name => name !== buttonToRemove));
    }

    // clickedNames와 recommendedNames를 합친 배열
    const allNames = [...clickedNames, ...recommendedNames];

    return (
        <View>
            <Text>선택 재료 및 추천 메뉴 :</Text>
            <FlatList
                data={allNames}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item}</Text>
                        <Button onPress={() => {
                            if (clickedNames.includes(item)) {
                                removeItem(item);
                            } else if (recommendedNames.includes(item)) {
                                removeButton(item);
                            }
                        }} title="삭제" />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default IngredientsBasket;
