import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useGlobalContext } from '../context';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
    const { loading, initDB, recipes, clearDB } = useGlobalContext();
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Date (newest)', value: 'dateDes' },
        { label: 'Date (oldest)', value: 'dateAsc' },
        { label: 'A - Z', value: 'aToZ' },
        { label: 'Z - A', value: 'zToA' },
        { label: 'Time (most)', value: 'timeDes' },
        { label: 'Time (least)', value: 'timeAsc' },
    ]);

    const recipeList = [...recipes];

    useEffect(() => {
        initDB();
    }, []);

    useEffect(() => {
        console.log('Recipes reducer: ', recipes);
    }, [recipes]);

    const addRecipeHandle = () => {
        navigation.navigate('Add');
    };

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (recipeList.length < 1) {
        return (
            <View>
                <Text>My Recipes</Text>
                <Text>No recipes added (yet)</Text>
                <Button
                    onPress={addRecipeHandle}
                    title="Add your first recipe"
                    accessibilityLabel="Click to add your first recipe"
                />
            </View>
        );
    }

    return (
        <View>
            <Text>My Recipes</Text>
            <Button
                onPress={addRecipeHandle}
                title="Add recipe"
                accessibilityLabel="Click to add your first recipe"
            />
            <Text>Sort by:</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <FlatList
                data={recipeList}
                renderItem={({ item }) => <RecipeCard recipe={item} />}
                keyExtractor={(item) => item.id}
            />
            <Button onPress={clearDB} title="Clear db" />
        </View>
    );
};

export default Home;
