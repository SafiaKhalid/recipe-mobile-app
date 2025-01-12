const defaultState = {
    recipes: [],
    currentRecipe: {},
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DB':
            console.log('Db initialised');
            return { ...state, recipes: [...action.payload] };
        case 'ADD_RECIPE':
            console.log('Recipe added to db');
            return { ...state, recipes: [...state.recipes, action.payload] };
        case 'UPDATE_RECIPE':
            console.log('Recipe updated');
            recipesCopy = [...state.recipes];
            const index = recipesCopy.findIndex(
                (recipe) => recipe.id == action.payload.id
            );
            recipesCopy[index] = action.payload;
            return {
                ...state,
                currentRecipe: { ...action.payload },
                recipes: [...recipesCopy],
            };
        case 'DELETE_RECIPE':
            console.log('Recipe deleted from db');
            return {
                ...state,
                recipes: state.recipes.filter(
                    (recipe) => recipe.id !== action.payload.id
                ),
            };
        case 'CLEAR_DB':
            return { ...state, recipes: [] };
        case 'SET_CURRENT_RECIPE':
            return { ...state, currentRecipe: action.payload };
        default:
            throw new Error('No matching type');
    }
};

export { reducer, defaultState };
