import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

const RecipeCard = ({ name, categories, prep_time, cook_time }) => {
    return (
        <View>
            <Text>{name}</Text>
            <Text>Categories: </Text>
            {/* <FlatList /> */}
        </View>
    );
};

export default RecipeCard;
