//saves GET data to redux, create selected [] for details

const detailReducer = (state = {items:[], selected:[]}, action) => {
    console.log(action);
    let result;
    switch (action.type) {
        case 'SET_DETAILS':
            return {
                items:[...action.payload]};
        case 'GET_ITEM_DETAIL':
            console.log(state.items.length);
            result = state.items.filter (item => {
                // console.log(item.title, action.payload);
                return item.title === action.payload;
            });
            console.log(action, result);
            return {
                ...state,
                selected: result
            };
        default: return {...state};
    }
}

export default detailReducer;