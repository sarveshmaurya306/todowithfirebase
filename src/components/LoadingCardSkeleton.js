import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid } from '@material-ui/core'

let temparr = [];
temparr.length = 26;
temparr.fill(-1)
function LoadingCardSkeleton() {
    return (
        <Grid container wrap="wrap" spacing={3} justifyContent="center" >
                {
                    temparr.map((r, index) => {
                        return <Box width={390} key={index} marginRight={0.5} my={1}>
                             <Skeleton variant="rect" width={390} height={250} />
                        </Box> 
                    })
                }
        </Grid>
    )
}

export default LoadingCardSkeleton
