import { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../context';

const ViewRecipe = () => {
    const { recipes, currentRecipe, deleteRecipe } = useGlobalContext();
    const navigation = useNavigation();
    const {
        id,
        name,
        categories,
        prep_time,
        cook_time,
        servings,
        description,
        ingredients,
        method,
        notes,
    } = {
        ...currentRecipe,
    };
    const [showAlert, setShowAlert] = useState(false);

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

    const handleEdit = () => {
        navigation.navigate('Edit');
    };

    const handleDelete = () => {
        navigation.goBack();
        deleteRecipe(recipes.find((recipe) => recipe.id == id));
        setShowAlert(false);
    };

    const changeAlert = () => {
        setShowAlert(!showAlert);
    };

    timeCheck(prep_time.hr, prepObject, 'hours');
    timeCheck(prep_time.min, prepObject, 'mins');
    timeCheck(cook_time.hr, cookObject, 'hours');
    timeCheck(cook_time.min, cookObject, 'mins');

    return (
        <View>
            <Text>{name}</Text>
            {categories.map((category, index) => {
                return <Text key={index}>{category}</Text>;
            })}
            {(prepObject.hours || prepObject.mins) && <Text>Prep Time</Text>}
            {prepObject.hours && <Text>Hours: {prepObject.hours}</Text>}
            {prepObject.mins && <Text>Mins: {prepObject.mins}</Text>}
            {(cookObject.hours || cookObject.mins) && <Text>Cook Time</Text>}
            {cookObject.hours && <Text>Hours: {cookObject.hours}</Text>}
            {cookObject.mins && <Text>Mins: {cookObject.mins}</Text>}
            {servings && (
                <View>
                    <Text>Servings:</Text>
                    <Text>{servings}</Text>
                </View>
            )}
            {description && <Text>{description}</Text>}
            <Text>Ingredients:</Text>
            {ingredients.map((ingredient, index) => {
                return <Text key={index}>-{ingredient.item}</Text>;
            })}
            <Text>Method:</Text>
            {method.map((step, index) => {
                return (
                    <Text key={index}>
                        {index + 1}){step.item}
                    </Text>
                );
            })}
            {notes && (
                <View>
                    <Text>Notes:</Text>
                    <Text>{notes}</Text>
                </View>
            )}
            {showAlert && (
                <View>
                    <Text>Are you sure you want to delete this recipe?</Text>
                    <Button onPress={handleDelete} title="Yes" />
                    <Button onPress={changeAlert} title="No" />
                </View>
            )}
            <Button onPress={handleEdit} title="Edit" />
            {!showAlert && <Button onPress={changeAlert} title="Delete" />}
        </View>
    );
};

export default ViewRecipe;
