import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

const RecipeCard = ({ name, categories, prep_time, cook_time }) => {
    console.log(categories);

    return (
        <View>
            <Text>{name}</Text>
            <Text>Categories: </Text>
            {categories.map((category, index) => {
                return <Text key={index}>{category}</Text>;
            })}
        </View>
    );
};

export default RecipeCard;
