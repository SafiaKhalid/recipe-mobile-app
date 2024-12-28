import { useState, useEffect } from 'react';
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

    useEffect(() => {
        console.log('newRecipe: ', newRecipe);
    }, [newRecipe]);

    return (
        <View>
            <Text>Add Recipe</Text>
            <TextInput
                placeholder="name"
                onChangeText={(e) => setNewRecipe({ ...newRecipe, name: e })}
                value={newRecipe.name}
            />
            <TextInput
                placeholder="prep_time"
                onChangeText={(e) =>
                    setNewRecipe({ ...newRecipe, prep_time: e })
                }
                value={newRecipe.prep_time}
            />
            <TextInput
                placeholder="cook_time"
                onChangeText={(e) =>
                    setNewRecipe({ ...newRecipe, cook_time: e })
                }
                value={newRecipe.cook_time}
            />
            <TextInput
                placeholder="servings"
                onChangeText={(e) =>
                    setNewRecipe({ ...newRecipe, servings: e })
                }
                value={newRecipe.servings}
            />
            <TextInput
                placeholder="description"
                onChangeText={(e) =>
                    setNewRecipe({ ...newRecipe, description: e })
                }
                value={newRecipe.description}
                multiline={true}
                numberOfLines={4}
            />
            <TextInput
                placeholder="notes"
                onChangeText={(e) => setNewRecipe({ ...newRecipe, notes: e })}
                value={newRecipe.notes}
                multiline={true}
                numberOfLines={4}
            />
        </View>
    );
};

export default AddRecipe;
