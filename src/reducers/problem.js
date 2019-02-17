const problemReducerDefaultState = {
    problem:[]
}

export default (state = problemReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOAD_PROBLEMS':
            return {...state,problem:action.payload};
        default:
            return state;
    }
}