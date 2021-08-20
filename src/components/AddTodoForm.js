import React, { useState } from 'react'
import { TextField, Select, MenuItem, Grid, ButtonGroup, Divider, Fab, Tooltip } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { db } from '../firebase';
import { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RestoreIcon from '@material-ui/icons/Restore';
import { auth } from '../firebase'
import { useSelector } from 'react-redux';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2EFF2E'
        }
    }
})

function AddTodo({ initialData,children }) {
    const d = useSelector(state => state.editTodo)
    //use redux here reading data;

    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [status, setStatus] = useState("uncompleate");
    const [id, setId] = useState('');

    useEffect(() => {
        // console.log(d);
        setName(d?.title)
        setdescription(d?.description)
        setId(d?.id);
        if (d?.status) {
            setStatus("compleate")
        } else {
            setStatus("uncompleate")
        }
    }, [d])
    const resetAll = e => {
        setName('')
        setdescription('')
        setStatus("uncompleate")
        setId('')
    }

    const submit = (e) => {
        e.preventDefault();

        if (!auth.currentUser) {
            return alert("Login First...");
        }
        const uid = auth.currentUser?.uid
        let ans = false;
        if (status === 'compleate')
            ans = true;

        if (!id) {
            db.collection('users').doc(uid).collection('todos').add({
                title: name,
                description: description,
                status: ans,
                timestamp: Date.now()
            }).then(r => console.log('created'))
        } else {
            db.collection('users').doc(uid).collection('todos').doc(id).update({
                title: name,
                description: description,
                status: ans,
                timestamp: Date.now()
            }).then(r => console.log('updated'))
        }
    }
    return (

        <form onSubmit={submit} onReset={resetAll} style={{ marginTop: '40px' }}>
            <Grid container spacing={3} justifyContent="space-evenly" alignItems="center">
                <Grid item  >
                    <TextField value={name} onChange={e => setName(e.target.value)} label="Title" variant="outlined" />
                </Grid>
                <Grid item  >
                    <TextField value={description} onChange={e => setdescription(e.target.value)} label="Description" variant="outlined" />
                </Grid>
                <Grid item  >
                    <Select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >

                        <MenuItem value={"compleate"}>Compleate</MenuItem>
                        <MenuItem value={"uncompleate"}>Not Compleate</MenuItem>
                    </Select>
                </Grid>
                <Grid item  >
                    <ThemeProvider theme={theme}>
                        <ButtonGroup>
                        <Tooltip title={id ? "Edit" : "Add"} >
                            <Fab variant="contained" color="primary" type="submit"> {id ? <EditIcon /> : <AddIcon />} </Fab>

                        </Tooltip>
                        <Tooltip title="Reset | Undo Selection">
                            <Fab variant="contained" color="secondary" type="reset" > <RestoreIcon /> </Fab>

                        </Tooltip>
                        </ButtonGroup>
                    </ThemeProvider>
                </Grid>
                <Grid item>
                    {children}
                </Grid>
            </Grid>
            <br /><br />
            <Divider />
        </form>
    )
}

export default AddTodo
