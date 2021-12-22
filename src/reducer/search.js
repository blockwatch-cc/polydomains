export const searchReducer = (state, action) => {
    switch (action.state) {
        case 'LOADING':
            return { ...state, state: action.state, payload: null, errors: null }
        case 'QUERY_SUCCESS':
            return { ...state, state: action.state, payload: action.payload, errors: null }
        case 'QUERY_FAILED':
            return { ...state, state: action.state, payload: null, errors: action.errors }
        case 'UPDATE_DOMAIN':
            return { ...state, state: action.state, name: action.name }
        default:
            return
    }
}
