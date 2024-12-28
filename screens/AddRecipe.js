import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

const AddRecipe = () => {
    const [newRecipe, setNewRecipe] = useState({
        name: undefined,
        prep_time: null,
        cook_time: null,
        servings: null,
        description: undefined,
        notes: undefined,
    });

    return (
        <View>
            <Text>Add Recipe</Text>
            <TextInput placeholder="name" />
            <TextInput placeholder="prep_time" />
            <TextInput placeholder="cook_time" />
            <TextInput placeholder="servings" />
            <TextInput
                placeholder="description"
                multiline={true}
                numberOfLines={4}
            />
            <TextInput placeholder="notes" multiline={true} numberOfLines={4} />
        </View>
    );
};

export default AddRecipe;
