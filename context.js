import React, { useContext, useReducer } from 'react';
import * as SQLite from 'expo-sqlite';

import { reducer, defaultState } from './reducer';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const initDB = async () => {
        try {
            const db = await SQLite.openDatabaseAsync('recipedb');
            await db.execAsync(
                'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, recipeObject TEXT NOT NULL)'
            );
            const rows = await db.getAllAsync(
                'SELECT id, recipeObject FROM recipes'
            );
            console.log('rows: ', rows);
            await db.closeAsync();
            let recipeList = [];
            if (rows.length > 0) {
                rows.forEach((row) => {
                    recipeList.push(JSON.parse(row.recipeObject));
                });
            }
            dispatch({ type: 'INIT_DB', payload: recipeList });
        } catch (error) {
            console.error('error:', error);
        }
    };

    const addRecipe = async (newRecipe) => {
        try {
            const db = await SQLite.openDatabaseAsync('recipedb');
            await db.runAsync(
                'INSERT INTO recipes (recipeObject) VALUES (?)',
                JSON.stringify(newRecipe)
            );
            await db.closeAsync();
            dispatch({ type: 'ADD_RECIPE', payload: newRecipe });
        } catch (error) {
            console.error('error:', error);
        }
    };

    const clearDB = async () => {
        try {
            const db = await SQLite.openDatabaseAsync('recipedb');
            await db.execAsync('DROP TABLE IF EXISTS recipes');
            await db.closeAsync();
            dispatch({ type: 'CLEAR_DB' });
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <AppContext.Provider value={{ ...state, initDB, addRecipe, clearDB }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
