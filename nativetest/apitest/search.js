import { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import IngredientsBasket from "./ingredientsBasket";
import RecommendButton from "./recommendButton";

const SearchName = () => {
    const [name, setName] = useState('');
    const [groupNames, setGroupNames] = useState([]); //여러 데이터를 담기위해 배열로 만듬
    const [clickedNames, setClickedNames] = useState([]);
    const [onButtonClicked, setOnButtonClicked] = useState();
    const [recommendedNames, setRecommendedNames] = useState([]);

    const FindGroupName = () => {
        const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/20/DESC_KOR=${name},`

        fetch(apiUrl) // api에 요청보냄
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) {
                    const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length);
                    const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1}`); // 리스트 뽑는 곳 
                    console.log("======================================================================")
                    console.log("순서바뀐 목록");
                    console.log(names)
                    console.log("======================================================================")
                    setGroupNames(names); // React 컴포넌트에서 가져온 함수로 추정
                } else { // 검색한 data가 존재하지 않을시
                    const updatedName = apiUrl.slice(0, -1); // 맨끝자리를 빼고 재요청
                    console.log(updatedName)
                    console.log("재검색")
                    fetch(updatedName)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) {
                                // const items = data.I2790.row;
                                // const names = items.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${"탄수화물 : " + item.NUTR_CONT2} ${"단백질 : " + item.NUTR_CONT3} ${"지방 : " + item.NUTR_CONT4} ${"나트륨 : " + item.NUTR_CONT6}`);

                                // console.log(names)
                                // setGroupNames(names);
                                const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length);
                                const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1}`);
                                console.log("======================================================================")
                                console.log("순서바뀐 목록");
                                console.log(names)
                                console.log("======================================================================")
                                setGroupNames(names);
                            }
                        });
                }
            });
    }

    // 요청 보내는 곳
    const OnChangeHandler = (text) => {
        setName(text); // 요청시 뒤에 ,붙임
    };

    // 리스트 클릭시 재료박스에 담는 곳
    const ListClickHandler = (clickedName) => {
        console.log(clickedName);
        if (!clickedNames.includes(clickedName)) { // 이미 선택된 항목이 아닌 경우에만 추가합니다.
        setClickedNames(prevClickedNames => [...prevClickedNames, clickedName]);
    }
    };

    // 버튼 클릭시 재료박스에 담는 곳
    const handleRecommendations = (recommendedNames) => {
        console.log("데이터 : " + recommendedNames)
        setRecommendedNames(recommendedNames);
    };

    // 버튼은 보통 한번만 처리되기 때문에 조건을 걸 이유가 없음

    return (
        <>
            <View>
            <IngredientsBasket clickedNames={clickedNames} setClickedNames={setClickedNames} recommendedNames={recommendedNames} setRecommendedNames={setRecommendedNames} />
            </View>
            <View>
            <RecommendButton onButtonClicked={handleRecommendations} />
            </View>
            <View>
                <Text>식품</Text>
                <TextInput onChangeText={OnChangeHandler} blurOnSubmit={true} placeholder="재료 입력"
                    keyboardType="default" value={name} />
                <Button onPress={FindGroupName} title="검색" />
                <Text>{name}</Text>
                {/* groupNames의 길이가 0보다 클때 실행 */}
                {groupNames.length > 0 ? (
                    <FlatList
                        data={groupNames}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => ListClickHandler(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : null}
            </View>
        </>
    )
};

export default SearchName;