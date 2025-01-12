import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ScrollView,
    Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

import MultiInput from '../components/MultiInput';
import { useGlobalContext } from '../context';

const EditRecipe = () => {
    const { currentRecipe, updateRecipe } = useGlobalContext();
    const [updatedRecipe, setUpdatedRecipe] = useState({ ...currentRecipe });
    const [tags, setTags] = useState([
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Dinner', value: 'dinner' },
        { label: 'Dessert', value: 'dessert' },
        { label: 'Snacks', value: 'snacks' },
        { label: 'Drinks', value: 'drinks' },
        { label: 'Other', value: 'other' },
    ]);
    const [value, setValue] = useState([...currentRecipe.categories]);
    const [open, setOpen] = useState(false);
    const [ingredientFields, setIngredientFields] = useState([
        ...currentRecipe.ingredients,
    ]);
    const [methodFields, setMethodFields] = useState([...currentRecipe.method]);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(undefined);
    const [image, setImage] = useState(currentRecipe.image);

    const formSubmit = () => {
        setSubmitted(false);
        if (!updatedRecipe.name) {
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
            (updatedRecipe.prep_time.hr &&
                !Number(updatedRecipe.prep_time.hr)) ||
            (updatedRecipe.prep_time.min &&
                !Number(updatedRecipe.prep_time.min))
        ) {
            setError(undefined);
            setError(`Prep time isn't an integer`);
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else if (
            (updatedRecipe.cook_time.hr &&
                !Number(updatedRecipe.cook_time.hr)) ||
            (updatedRecipe.cook_time.min &&
                !Number(updatedRecipe.cook_time.min))
        ) {
            setError(undefined);
            setError(`Prep time isn't an integer`);
            setTimeout(() => {
                setError(undefined);
            }, 2000);
        } else if (updatedRecipe.servings && !Number(updatedRecipe.servings)) {
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
            updateRecipe(updatedRecipe);
            console.log('Submitted updatedRecipe: ', updatedRecipe);
            setSubmitted(true);
            setError(undefined);
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
        }
    };

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log('image result: ', result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        setUpdatedRecipe({ ...updatedRecipe, categories: value });
    }, [value]);

    useEffect(() => {
        setUpdatedRecipe({
            ...updatedRecipe,
            ingredients: Object.values(ingredientFields),
        });
    }, [ingredientFields]);

    useEffect(() => {
        setUpdatedRecipe({
            ...updatedRecipe,
            method: Object.values(methodFields),
        });
    }, [methodFields]);

    useEffect(() => {
        setUpdatedRecipe({ ...updatedRecipe, image: image });
    }, [image]);

    return (
        <ScrollView>
            <Text>Edit Recipe</Text>
            <View>
                <Text>Name (required)</Text>
                <TextInput
                    placeholder="name"
                    onChangeText={(e) =>
                        setUpdatedRecipe({ ...updatedRecipe, name: e })
                    }
                    value={updatedRecipe.name}
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
                        setUpdatedRecipe({
                            ...updatedRecipe,
                            prep_time: { ...updatedRecipe.prep_time, hr: e },
                        })
                    }
                    value={updatedRecipe.prep_time.hr}
                    inputMode="numeric"
                />
                <Text>Minutes</Text>
                <TextInput
                    placeholder="prep_time_min"
                    onChangeText={(e) =>
                        setUpdatedRecipe({
                            ...updatedRecipe,
                            prep_time: { ...updatedRecipe.prep_time, min: e },
                        })
                    }
                    value={updatedRecipe.prep_time.min}
                    inputMode="numeric"
                />
            </View>
            <View>
                <Text>Cook Time</Text>
                <Text>Hours</Text>
                <TextInput
                    placeholder="cook_time_hr"
                    onChangeText={(e) =>
                        setUpdatedRecipe({
                            ...updatedRecipe,
                            cook_time: { ...updatedRecipe.cook_time, hr: e },
                        })
                    }
                    value={updatedRecipe.cook_time.hr}
                    inputMode="numeric"
                />
                <Text>Minutes</Text>
                <TextInput
                    placeholder="cook_time_min"
                    onChangeText={(e) =>
                        setUpdatedRecipe({
                            ...updatedRecipe,
                            cook_time: { ...updatedRecipe.cook_time, min: e },
                        })
                    }
                    value={updatedRecipe.cook_time.min}
                    inputMode="numeric"
                />
            </View>
            <View>
                <Text>Servings</Text>
                <TextInput
                    placeholder="servings"
                    onChangeText={(e) =>
                        setUpdatedRecipe({ ...updatedRecipe, servings: e })
                    }
                    value={updatedRecipe.servings}
                    inputMode="numeric"
                />
            </View>
            <View>
                <Text>Description</Text>
                <TextInput
                    placeholder="description"
                    onChangeText={(e) =>
                        setUpdatedRecipe({ ...updatedRecipe, description: e })
                    }
                    value={updatedRecipe.description}
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
                        setUpdatedRecipe({ ...updatedRecipe, notes: e })
                    }
                    value={updatedRecipe.notes}
                    inputMode="text"
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <View>
                <Button
                    title="Select image from camera roll"
                    onPress={addImage}
                />
                {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                )}
            </View>

            <Button onPress={formSubmit} title="Edit Recipe" />
            {submitted && <Text>Recipe updated!</Text>}
            {error && <Text>{error}</Text>}
        </ScrollView>
    );
};

export default EditRecipe;

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
});
