import React, { useState } from "react";
import { Text, View } from "react-native";

const FoodApi = () => {
    const [name, setName] = useState('');
    const [groupNames, setGroupNames] = useState([]); //여러 데이터를 담기위해 배열로 만듬
    const [clickedNames, setClickedNames] = useState([]);

    const findGroupName = () => {
        fetch(`http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/5/DESC_KOR=${name}`) // api에 요청보냄
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) { // 검색한 data가 존재할시
                    const names = data.I2790.row.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${"탄수화물 : " + item.NUTR_CONT2} ${"단백질 : " + item.NUTR_CONT3} ${"지방 : " + item.NUTR_CONT4} ${"나트륨 : " + item.NUTR_CONT6}`); // 해당데이터를 출력한다
                    // map : 각 요소를 변환하여 새로운 배열로 매핑하는 역할
                    // 여기서 map을 사용한 이유는 DESC_KOR에 해당하는 값을 꺼내 새로운 배열을 생성했음
                    setGroupNames(names);
                } else { // 검색한 data가 존재하지 않을시
                    const updatedName = name.slice(0, -1); // 맨끝자리를 빼고 재요청
                    console.log("재검색")
                    fetch(`http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/5/DESC_KOR=${updatedName}`)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) {
                                const items = data.I2790.row;
                                const names = items.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${"탄수화물 : " + item.NUTR_CONT2} ${"단백질 : " + item.NUTR_CONT3} ${"지방 : " + item.NUTR_CONT4} ${"나트륨 : " + item.NUTR_CONT6}`);
                                setGroupNames(names);
                            }
                        });
                }
            });
    };

    const onChangeHandler = (e) => {
        setName(e.target.value + ","); // 요청시 뒤에 ,붙임
    };

    const Item = ({ clickedName, removeItem }) => {
        const removeList = () => {
            removeItem(clickedName);
        }

        return (
            <>
                <button onClick={removeList}>삭제</button>
            </>
        )
    }

    const removeItem = (nameToRemove) => {
        setClickedNames(prevClickedNames => prevClickedNames.filter(name => name !== nameToRemove));
    }


    // 리스트 클릭시 재료박스 공간으로 이동
    // 이동하면 이름 옆에 x있고 누르면 삭제
    const ListClickHandler = (clickedName) => {
        console.log(clickedName);
        setClickedNames(prevClickedNames => [...prevClickedNames, clickedName]);
    };

    const [clickedName, setClickedName] = useState('');

    return (
        <>
            <View>
                <Text>선택 재료 :</Text>
                <ul>
                    {clickedNames.map((name, index) => (
                        <li key={index}>
                            {name}
                            <Item clickedName={name} removeItem={removeItem} />
                        </li>
                    ))}
                </ul>
            </View>

            <View>
                <Text>식품</Text>
                <input type="text" onChange={onChangeHandler} />
                <button onClick={findGroupName}>검색</button>
                <h3>{name}</h3>
                {/* groupNames의 길이가 0보다 클때 실행 */}
                {groupNames.length > 0 ? (
                    <ul>
                        {groupNames.map((groupName, index) => (
                            <li key={index} onClick={() => ListClickHandler(groupName)}>{groupName}</li>
                        ))}
                    </ul>
                ) : null}
            </View>

        </>
    );
};

export default FoodApi;