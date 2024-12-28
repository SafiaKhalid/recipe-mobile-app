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
    const [submitted, setSubmitted] = useState(false);

    const formSubmit = () => {
        setSubmitted(false);
        console.log('Submitted newRecipe: ', newRecipe);
        setNewRecipe({
            name: undefined,
            prep_time: null,
            cook_time: null,
            servings: null,
            description: undefined,
            notes: undefined,
        });

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 2000);
    };

    return (
        <View>
            <View>
                <Text>Name</Text>
                <TextInput
                    placeholder="name"
                    onChangeText={(e) =>
                        setNewRecipe({ ...newRecipe, name: e })
                    }
                    value={newRecipe.name}
                />
            </View>
            <View>
                <Text>Prep Time</Text>
                <TextInput
                    placeholder="prep_time"
                    onChangeText={(e) =>
                        setNewRecipe({ ...newRecipe, prep_time: e })
                    }
                    value={newRecipe.prep_time}
                />
            </View>
            <View>
                <Text>Cook Time</Text>
                <TextInput
                    placeholder="cook_time"
                    onChangeText={(e) =>
                        setNewRecipe({ ...newRecipe, cook_time: e })
                    }
                    value={newRecipe.cook_time}
                />
            </View>
            <View>
                <Text>Servings</Text>
                <TextInput
                    placeholder="servings"
                    onChangeText={(e) =>
                        setNewRecipe({ ...newRecipe, servings: e })
                    }
                    value={newRecipe.servings}
                />
            </View>
            <View>
                <Text>Description</Text>
                <TextInput
                    placeholder="description"
                    onChangeText={(e) =>
                        setNewRecipe({ ...newRecipe, description: e })
                    }
                    value={newRecipe.description}
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <View>
                <Text>Notes</Text>
                <TextInput
                    placeholder="notes"
                    onChangeText={(e) =>
                        setNewRecipe({ ...newRecipe, notes: e })
                    }
                    value={newRecipe.notes}
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <Button onPress={formSubmit} title="Add Recipe" />
            {submitted && <Text>New recipe added!</Text>}
        </View>
    );
};

export default AddRecipe;
