export const getProblems = (q = '') => {
    return (dispatch) => {
        return fetch('/api/problems/search?q=' + q)
            .then(results => results.json())
            .then(data => {
                if (data.ok === true) {
                    dispatch({
                        type: 'LOAD_PROBLEMS',
                        data: data.data
                    });
                }
            });
    }
};
