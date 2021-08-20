
const data = []

const getUserData = (state = data, action) => {
    switch (action.type) {
        case 'UPDATE': return action.payload;
        case "RESET": return data;
        default: return state;
    }
}

const currentEdit = {
    title: '', 
    description: '', 
    status: false, 
    id: ""
}

const editTodo = (state = currentEdit, action) => {
    switch (action.type) {
        case "EDIT": return action.payload;
        default: return state;
    }
}
export { getUserData , editTodo};