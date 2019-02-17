export const getProblems = (payload) => {
        return fetch('/api/problems/search?q=""')
            .then(results => results.json())
            .then(data => {
                if (data.ok === true) {
                    dispatch({
                        type: 'LOAD_PROBLEMS',
                        tasks: data.data
                    });
                }
            });
};
