import { Text, TextInput, View, Button } from 'react-native';

const MultiInput = ({ fields, setFields }) => {
    const handleChange = (e, index) => {
        console.log('e: ', e);
        console.log('e.item: ', e.item);
        console.log('index: ', index);

        let newFields = [...fields];
        console.log('newFields: ', newFields);

        newFields[index].item = e;
        setFields(newFields);
    };

    const addField = () => {
        setFields([...fields, { item: '' }]);
    };

    const removeField = (index) => {
        let newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    return (
        <View>
            {fields.map((e, index) => {
                return (
                    <View key={index}>
                        <TextInput
                            placeholder="Ingredient"
                            value={e.item || ''}
                            onChangeText={(e) => handleChange(e, index)}
                        />
                        <Button
                            title="Remove"
                            onPress={() => removeField(index)}
                        />
                    </View>
                );
            })}
            <Button onPress={addField} title="Add Ingrdient" />
        </View>
    );
};

export default MultiInput;
