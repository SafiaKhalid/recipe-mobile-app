import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

import { useGlobalContext } from '../context';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
    const { loading, initDB, recipes, clearDB } = useGlobalContext();
    const navigation = useNavigation();

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

    return (
        <View>
            <Text>My Recipes</Text>
            <Text>No recipes added (yet)</Text>
            <Button
                onPress={addRecipeHandle}
                title="Add your first recipe"
                accessibilityLabel="Click to add your first recipe"
            />
            <FlatList
                data={recipes}
                renderItem={({ item }) => <RecipeCard recipe={item} />}
                keyExtractor={(item) => item.id}
            />
            <Button onPress={clearDB} title="Clear db" />
        </View>
    );
};

export default Home;
