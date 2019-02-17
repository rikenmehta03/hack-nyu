const experienceReducerDefaultState = {
    experience:[]
}

export default (state = experienceReducerDefaultState, action) => {

    switch (action.type) {
        case 'CHANGE_STATE':
            let removed;
            const sourceTasks = Array.from(state[action.source]);
            const destTasks = Array.from(state[action.destination]);
            [removed] = sourceTasks.splice(action.droppableSource.index, 1);

            destTasks.splice(action.droppableDestination.index, 0, removed);
            return {
                ...state,
                [action.source]: sourceTasks,
                [action.destination]: destTasks
            };
        case 'REORDER_ITEM':
            let removedItem;
            const result = Array.from(state[action.source]);
            [removedItem] = result.splice(action.startIndex, 1);
            result.splice(action.endIndex, 0, removedItem);

            return {
                ...state,
                [action.source]: result
            };
        case 'LOAD_TASKS':
            return {
                ...action.tasks
            };
        case 'LOAD_EXPERIENCES':
            return {
                ...state,experience:action.payload
            }
        default:
            return state;
    }
}