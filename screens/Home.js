import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';

const Home = () => {
    const navigation = useNavigation();

    const addRecipe = () => {
        navigation.navigate('Add');
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
