import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import MultiInput from '../components/MultiInput';
import { useGlobalContext } from '../context';

const AddRecipe = () => {
    const { addRecipe } = useGlobalContext();
    const [newRecipe, setNewRecipe] = useState({
        name: undefined,
        categories: [],
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
        ingredients: [],
        method: [],
        notes: undefined,
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(undefined);
    const [tags, setTags] = useState([
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Dinner', value: 'dinner' },
        { label: 'Dessert', value: 'dessert' },
        { label: 'Snacks', value: 'snacks' },
        { label: 'Drinks', value: 'drinks' },
        { label: 'Other', value: 'other' },
    ]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [ingredientFields, setIngredientFields] = useState([]);
    const [methodFields, setMethodFields] = useState([]);

    const formSubmit = () => {
        setSubmitted(false);
        if (!newRecipe.name) {
            setError(undefined);
            setError('Recipe name is required');
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else if (value.length < 1) {
            setError(undefined);
            setError('Select at least one category for your recipe');
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
        } else if (ingredientFields.length < 1) {
            setError(undefined);
            setError(`Add at least one ingredient`);
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else if (methodFields.length < 1) {
            setError(undefined);
            setError(`Add at least one step`);
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else {
            addRecipe(newRecipe);
            console.log('Submitted newRecipe: ', newRecipe);
            setNewRecipe({
                name: undefined,
                categories: [],
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
                ingredients: [],
                method: [],
                notes: undefined,
            });
            setIngredientFields([]);
            setMethodFields([]);
            setValue([]);
            setSubmitted(true);
            setError(undefined);
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
        }
    };

    useEffect(() => {
        setNewRecipe({ ...newRecipe, categories: value });
    }, [value]);

    useEffect(() => {
        setNewRecipe({
            ...newRecipe,
            ingredients: Object.values(ingredientFields),
        });
    }, [ingredientFields]);

    useEffect(() => {
        setNewRecipe({
            ...newRecipe,
            method: Object.values(methodFields),
        });
    }, [methodFields]);

    return (
        <ScrollView nestedScrollEnabled={true}>
            <View /* style={styles.container} */>
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
                    <Text>Categories (required)</Text>
                    {value.map((item, index) => {
                        return <Text key={index}>{item}</Text>;
                    })}
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={tags}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setTags}
                        multiple={true}
                        min={0}
                        max={7}
                        listMode="SCROLLVIEW"
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
                    <Text>Ingredients (required)</Text>
                    <MultiInput
                        fields={ingredientFields}
                        setFields={setIngredientFields}
                        numbered={false}
                    />
                </View>
                <View>
                    <Text>Method (required)</Text>
                    <MultiInput
                        fields={methodFields}
                        setFields={setMethodFields}
                        numbered={true}
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
        </ScrollView>
    );
};

export default AddRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        backgroundColor: 'red',
    },
});
