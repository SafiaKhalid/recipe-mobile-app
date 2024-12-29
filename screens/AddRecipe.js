import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

const AddRecipe = () => {
    const [newRecipe, setNewRecipe] = useState({
        name: undefined,
        prep_time: {
            hr: null,
            min: null,
        },
        cook_time: {
            hr: null,
            min: null,
        },
        servings: null,
        description: undefined,
        notes: undefined,
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(undefined);

    const formSubmit = () => {
        setSubmitted(false);
        if (!newRecipe.name) {
            setError(undefined);
            setError('Recipe name is required');
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else if (
            (newRecipe.prep_time.hr && !Number(newRecipe.prep_time.hr)) ||
            (newRecipe.prep_time.min && !Number(newRecipe.prep_time.min))
        ) {
            setError(undefined);
            setError(`Prep time isn't an integer`);
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else if (
            (newRecipe.cook_time.hr && !Number(newRecipe.cook_time.hr)) ||
            (newRecipe.cook_time.min && !Number(newRecipe.cook_time.min))
        ) {
            setError(undefined);
            setError(`Prep time isn't an integer`);
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else if (newRecipe.servings && !Number(newRecipe.servings)) {
            setError(undefined);
            setError(`Servings isn't an integer`);
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else {
            console.log('Submitted newRecipe: ', newRecipe);
            setNewRecipe({
                name: undefined,
                prep_time: {
                    hr: null,
                    min: null,
                },
                cook_time: {
                    hr: null,
                    min: null,
                },
                servings: null,
                description: undefined,
                notes: undefined,
            });

            setSubmitted(true);
            setError(undefined);
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
        }
    };

    return (
        <View>
            <View>
                <Text>Name (required)</Text>
                <TextInput
                    placeholder="name"
                    onChangeText={(e) =>
                        setNewRecipe({ ...newRecipe, name: e })
                    }
                    value={newRecipe.name}
                    inputMode="text"
                />
            </View>
            <View>
                <Text>Prep Time</Text>
                <Text>Hours</Text>
                <TextInput
                    placeholder="prep_time_hr"
                    onChangeText={(e) =>
                        setNewRecipe({
                            ...newRecipe,
                            prep_time: { ...newRecipe.prep_time, hr: e },
                        })
                    }
                    value={newRecipe.prep_time.hr}
                    inputMode="numeric"
                />
                <Text>Minutes</Text>
                <TextInput
                    placeholder="prep_time_min"
                    onChangeText={(e) =>
                        setNewRecipe({
                            ...newRecipe,
                            prep_time: { ...newRecipe.prep_time, min: e },
                        })
                    }
                    value={newRecipe.prep_time.min}
                    inputMode="numeric"
                />
            </View>
            <View>
                <Text>Cook Time</Text>
                <Text>Hours</Text>
                <TextInput
                    placeholder="cook_time_hr"
                    onChangeText={(e) =>
                        setNewRecipe({
                            ...newRecipe,
                            cook_time: { ...newRecipe.cook_time, hr: e },
                        })
                    }
                    value={newRecipe.cook_time.hr}
                    inputMode="numeric"
                />
                <Text>Minutes</Text>
                <TextInput
                    placeholder="cook_time_min"
                    onChangeText={(e) =>
                        setNewRecipe({
                            ...newRecipe,
                            cook_time: { ...newRecipe.cook_time, min: e },
                        })
                    }
                    value={newRecipe.cook_time.min}
                    inputMode="numeric"
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
                    inputMode="numeric"
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
                    inputMode="text"
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
                    inputMode="text"
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <Button onPress={formSubmit} title="Add Recipe" />
            {submitted && <Text>New recipe added!</Text>}
            {error && <Text>{error}</Text>}
        </View>
    );
};

export default AddRecipe;
