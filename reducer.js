const defaultState = {
    recipes: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DB':
            console.log('Db initialised');
            return { ...state, recipes: [...action.payload] };
        case 'ADD_RECIPE':
            console.log('Recipe added to db');
            return { ...state, recipes: [...state.recipes, action.payload] };
        default:
            throw new Error('No matching type');
    }
};

export { reducer, defaultState };
