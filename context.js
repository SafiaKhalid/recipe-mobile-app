import React, { useContext, useReducer } from 'react';
import * as SQLite from 'expo-sqlite';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const initDB = async () => {
        try {
            const db = await SQLite.openDatabaseAsync('recipedb');
            await db.execAsync(
                'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, recipeObject TEXT NOT NULL)'
            );
            const rows = await db.getAllAsync('SELECT id, name FROM names');
            console.log('rows: ', rows);

            dispatch({ type: 'INIT_DB', payload: rows });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AppContext.Provider value={{ initDB }}>{children}</AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
