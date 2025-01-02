const defaultState = {
    recipes: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DB':
            return { ...state, recipes: [action.payload] };
        case 'ADD_RECIPE':
            return { ...state };
        default:
            throw new Error('No matching type');
    }
};

export { reducer, defaultState };
