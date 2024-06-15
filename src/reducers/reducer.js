
export const intialState = {
    data: []
}

const rootReducer = (state = intialState, action) => {
    switch (action.type) {
        case "SetData":
            return { ...state, data: action.payload }
        case "CreateData":
            return { ...state, data: state.data.concat(action.payload) }
        case "EditData": {
            const item = state.data.find(x => x._id === action.payload._id)
            if (item) {
                item.title = action.payload.title
                // sample code
            }
            return { ...state }
        }
        default:
            return state
    }
}
export default rootReducer