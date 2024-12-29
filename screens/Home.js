import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const Home = () => {
    const navigation = useNavigation();

    const addRecipe = () => {
        navigation.navigate('Add');
    };

    return (
        <Layout
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <View>
                <Text>My Recipes</Text>
                <Text>No recipes added (yet)</Text>
                <Button
                    onPress={addRecipe}
                    title="Add your first recipe"
                    accessibilityLabel="Click to add your first recipe"
                />
            </View>
        </Layout>
    );
};

export default Home;
