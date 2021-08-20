
import {db, auth} from '../firebase'

export const UpdateUserData = (cuser) => {
    return (dispatch) => {
        if (!cuser) {
            dispatch({
                type:'RESET'
            })
        }
        db.collection('users').doc( auth.currentUser?.uid).collection('todos').orderBy("timestamp",'desc').onSnapshot(snapshot => {
            const items = [];
            snapshot.forEach(doc => items.push({ d: doc.data(), id: doc.id }))
            
            dispatch({
                type: "UPDATE",
                payload:items
            })
        })
    }  
}

export const EditTODOS = (editData) => {
    return {
        type: "EDIT",
        payload:editData
    }
}