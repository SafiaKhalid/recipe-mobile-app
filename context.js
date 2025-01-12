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
            initDB();
            dispatch({ type: 'ADD_RECIPE', payload: newRecipe });
        } catch (error) {
            console.error('error:', error);
        }
    };

    const updateRecipe = async (updatedRecipe) => {
        try {
            const oldRecipe = state.recipes.filter(
                (recipe) => recipe.id == updatedRecipe.id
            )[0];
            console.log('old recipe: ', oldRecipe);

            const db = await SQLite.openDatabaseAsync('recipedb');
            const dbRecipe = await db.getFirstAsync(
                'SELECT * FROM recipes WHERE recipeObject = ?',
                JSON.stringify(oldRecipe)
            );
            console.log('db updated recipe: ', dbRecipe);

            await db.runAsync(
                'UPDATE recipes SET recipeObject = ? WHERE id = ?',
                JSON.stringify(updatedRecipe),
                dbRecipe.id
            );
            await db.closeAsync();
            initDB();
            dispatch({ type: 'UPDATE_RECIPE', payload: updatedRecipe });
        } catch (error) {
            console.error('error:', error);
        }
    };

    const deleteRecipe = async (recipe) => {
        try {
            const db = await SQLite.openDatabaseAsync('recipedb');
            const dbRecipe = await db.getFirstAsync(
                'SELECT * FROM recipes WHERE recipeObject = ?',
                JSON.stringify(recipe)
            );
            await db.runAsync('DELETE FROM recipes WHERE id = ?', dbRecipe.id);
            await db.closeAsync();
            initDB();
            dispatch({ type: 'DELETE_RECIPE', payload: recipe });
        } catch (error) {
            console.error('error:', error);
        }
    };

    const clearDB = async () => {
        try {
            const db = await SQLite.openDatabaseAsync('recipedb');
            await db.execAsync('DROP TABLE IF EXISTS recipes');
            await db.closeAsync();
            initDB();
            dispatch({ type: 'CLEAR_DB' });
        } catch (error) {
            console.error('error:', error);
        }
    };

    const setCurrentRecipe = (recipe) => {
        console.log('CUrrent Recipe: ', recipe);
        dispatch({ type: 'SET_CURRENT_RECIPE', payload: recipe });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                initDB,
                addRecipe,
                updateRecipe,
                deleteRecipe,
                clearDB,
                setCurrentRecipe,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
