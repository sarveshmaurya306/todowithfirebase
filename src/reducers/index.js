
import { combineReducers } from 'redux'

import {getUserData, editTodo} from "./reducer";

const rootReducer = combineReducers({
    getUserData,
    editTodo
})

export default rootReducer;