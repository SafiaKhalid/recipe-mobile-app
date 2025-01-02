import { Text, TextInput, View, Button } from 'react-native';

const MultiInput = ({ fields, setFields, numbered }) => {
    const handleChange = (e, index) => {
        let newFields = [...fields];

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
                        {numbered && <Text>{index + 1}</Text>}
                        <TextInput
                            placeholder={numbered ? `Method` : `Ingredients`}
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
            <Button
                onPress={addField}
                title={numbered ? `Add step` : `Add ingredient`}
            />
        </View>
    );
};

export default MultiInput;
