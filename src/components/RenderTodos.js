import React from 'react'
import { IconButton, Card, CardContent, Typography, CardActions, CardActionArea, Grid, Tooltip, } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch, useSelector } from 'react-redux'

import { EditTODOS } from '../actions/index'

import { auth, db } from '../firebase';
import Masonry from 'react-masonry-css';
import './style.css'

const styles = makeStyles(theme => ({
    wrap: {
        wordWrap: "break-word",
        padding: 10,
    },
    red: {
        border: "1px solid red"
    },

}))

const beakpoints = {
    default: 4,
    1500: 3,
    1100: 3,
    700: 2,
    500: 1
}

function RenderTodos() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.getUserData)

    const classes = styles();
    const uid = auth?.currentUser?.uid
    const updateChange = (id, value) => {
        db.collection('users').doc(uid).collection('todos').doc(id).update({
            status: !value,
        })
            .then(r => console.log('object updated'))
            .catch(e => console.log(e))
    }

    function deleteCurrent(id) {

        db.collection('users').doc(uid).collection('todos').doc(id).delete()
            .then(r => console.log('object deleted'))
            .catch(e => console.log(e))
    }

    if (data?.length === 0) {
        return <div style={{color:'white', height:'100vh'}}>
            <center>
            <h1> Nothing to show...</h1>
            <p>Wanna add something in your todo App?</p>
        </center>
        </div>

    }
    return (
        <div style={{ margin: "0px 20px" }}>
            <Masonry
                breakpointCols={beakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {
                    data?.map(cd => {
                        return (
                            <div key={cd.id} >
                                <Card className={cd?.d?.status === false ? classes.red : ""} variant="outlined">
                                    <CardActionArea onClick={() => dispatch(EditTODOS({ ...cd?.d, id: cd?.id }))}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {cd?.d?.title}
                                            </Typography>
                                            <Typography className={classes.wrap} variant="body2" color="textSecondary" component="p">
                                                {cd?.d?.description}
                                            </Typography>
                                        </CardContent>

                                    </CardActionArea>
                                    <CardActions>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item >
                                                <span onClick={() => updateChange(cd?.id, cd?.d?.status)}>
                                                    <Tooltip title={cd?.d?.status === true ? "Mark Undone" : "Mark Done"}>
                                                        <IconButton color="primary" aria-label="edit">
                                                            {cd?.d?.status === true ? <ClearIcon /> : <DoneIcon />}
                                                        </IconButton>
                                                    </Tooltip>
                                                </span>
                                            </Grid>
                                            <Grid item>
                                                <span onClick={() => deleteCurrent(cd?.id)}>
                                                    <Tooltip title="Delete">
                                                        <IconButton color="secondary" aria-label="delete" >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })
                }

            </Masonry>
        </div>
    )
}

export default RenderTodos
