import { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../context';

const RecipeCard = ({ recipe }) => {
    const { setCurrentRecipe } = useGlobalContext();
    const { id, name, categories, prep_time, cook_time } = { ...recipe };
    const [focus, setFocus] = useState(undefined);
    const navigation = useNavigation();

    const prepObject = { hours: '', mins: '' };
    const cookObject = { hours: '', mins: '' };

    const timeCheck = (time, object, objectKey) => {
        if (time) {
            if (time == 0) {
                object[objectKey] = '';
            } else {
                object[objectKey] = time;
            }
        }
    };

    const handleView = () => {
        setCurrentRecipe(recipe);
        navigation.navigate('View');
    };

    timeCheck(prep_time.hr, prepObject, 'hours');
    timeCheck(prep_time.min, prepObject, 'mins');
    timeCheck(cook_time.hr, cookObject, 'hours');
    timeCheck(cook_time.min, cookObject, 'mins');

    return (
        <View>
            <Text>{name}</Text>
            <Text>Categories: </Text>
            {categories.map((category, index) => {
                return <Text key={index}>{category}</Text>;
            })}
            {(prepObject.hours || prepObject.mins) && <Text>Prep Time</Text>}
            {prepObject.hours && <Text>Hours: {prepObject.hours}</Text>}
            {prepObject.mins && <Text>Mins: {prepObject.mins}</Text>}
            {(cookObject.hours || cookObject.mins) && <Text>Cook Time</Text>}
            {cookObject.hours && <Text>Hours: {cookObject.hours}</Text>}
            {cookObject.mins && <Text>Mins: {cookObject.mins}</Text>}
            <Button onPress={handleView} title="View Recipe" />
        </View>
    );
};

export default RecipeCard;
