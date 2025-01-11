import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider } from './context';
import Home from './screens/Home';
import AddRecipe from './screens/AddRecipe';
import ViewRecipe from './screens/ViewRecipe';

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
                View: ViewRecipe,
            },
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return (
        <AppProvider>
            <Navigation />
        </AppProvider>
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
