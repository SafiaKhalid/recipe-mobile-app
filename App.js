import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import Home from './screens/Home';
import AddRecipe from './screens/AddRecipe';

const HomeStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: Home,
            options: {
                headerShown: false,
            },
        },
    },
});

const RootStack = createNativeStackNavigator({
    groups: {
        Home: {
            screens: {
                App: {
                    screen: HomeStack,
                    options: { title: 'My App' },
                },
            },
        },
        Modal: {
            screenOptions: {
                presentation: 'modal',
            },
            screens: {
                Add: AddRecipe,
            },
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Navigation />
        </ApplicationProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
