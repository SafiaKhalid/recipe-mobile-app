import { StyleSheet, Text, View, Button } from 'react-native';

const Home = () => {
    const addRecipe = () => {
        console.log('add recipe');
    };

    return (
        <View>
            <Text>My Recipes</Text>
            <Text>No recipes added (yet)</Text>
            <Button
                onPress={addRecipe}
                title="Add your first recipe"
                accessibilityLabel="Click to add your first recipe"
            />
        </View>
    );
};

export default Home;
