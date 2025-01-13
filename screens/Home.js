import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    FlatList,
    VirtualizedList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useGlobalContext } from '../context';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
    const { loading, initDB, recipes, clearDB } = useGlobalContext();
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('aToZ');
    const [items, setItems] = useState([
        { label: 'Date (newest)', value: 'dateDes' },
        { label: 'Date (oldest)', value: 'dateAsc' },
        { label: 'A - Z', value: 'aToZ' },
        { label: 'Z - A', value: 'zToA' },
        { label: 'Time (most)', value: 'timeDes' },
        { label: 'Time (least)', value: 'timeAsc' },
    ]);
    const [recipeList, setRecipeList] = useState(recipes);

    useEffect(() => {
        initDB();
    }, []);

    useEffect(() => {
        console.log('Recipes reducer: ', recipes);
        console.log('recipeList: ', recipeList);
        setRecipeList(recipes);
    }, [recipes]);

    //Time sorting doesn't work, if no time put at bottom for both time asc and des
    /*  useEffect(() => {
        switch (value) {
            case 'dateDes':
                setRecipeList(
                    [...recipeList].sort(
                        (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
                    )
                );
                break;
            case 'dateAsc':
                setRecipeList(
                    [...recipeList].sort(
                        (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
                    )
                );
                break;
            case 'aToZ':
                setRecipeList(
                    [...recipeList].sort((a, b) => a.name.localeCompare(b.name))
                );
                break;
            case 'zToA':
                setRecipeList(
                    [...recipeList].sort((a, b) => b.name.localeCompare(a.name))
                );
                break;
            case 'timeAsc':
                setRecipeList(
                    [...recipeList].sort((a, b) =>
                        (a.prep_time + a.cook_time).localeCompare(
                            b.prep_time + b.cook_time
                        )
                    )
                );
                break;
            case 'timeDes':
                setRecipeList(
                    [...recipeList].sort((a, b) =>
                        (b.prep_time + b.cook_time).localeCompare(
                            a.prep_time + a.cook_time
                        )
                    )
                );
                break;
            default:
                console.error('no matching sort option');
        }
    }, [value]); */

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
        <View style={{ flex: 1 }}>
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
                listMode="SCROLLVIEW"
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
