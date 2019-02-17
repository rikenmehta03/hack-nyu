const experienceReducerDefaultState = {
    experience:[]
}

export default (state = experienceReducerDefaultState, action) => {

    switch (action.type) {
        case 'LOAD_EXPERIENCES':
            return {
                ...state,
                experience: action.data
            };
        default:
            return state;
    }
}