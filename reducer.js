const defaultState = {
    recipes: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DB':
            return { ...state, recipes: [...action.payload] };
        case 'ADD_RECIPE':
            console.log('Recipe added to state: ', action.payload);

            return { ...state, recipes: [...state.recipes, action.payload] };
        default:
            throw new Error('No matching type');
    }
};

export { reducer, defaultState };
