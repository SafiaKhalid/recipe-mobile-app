import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import { useGlobalContext } from '../context';

const Home = () => {
    const { initDB, recipes } = useGlobalContext();
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
};

export default Home;
