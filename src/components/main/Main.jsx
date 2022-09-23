import React,{useContext} from 'react'
import {Card,CardHeader,CardContent,Typography,Divider,Grid} from '@material-ui/core'
import useStyles from './styles'
import Form from './form/Form';
import List from '../list/List';
import { TrackerContext } from '../../context/Context';
import InfoCard from '../InfoCard';


const Main = () => {
    const classes=useStyles();
    const {balance}=useContext(TrackerContext);
  return (
    <Card className={classes.root}>
        <CardHeader title="Expense Tracker" subheader="Made by Rajwardhan Pawar"  />
        <CardContent>
            <Typography variant='h5' align='center' >Total balance ₹{balance}</Typography>
                <Typography variant='subtitle2' style={{lineHeigh:"2rem",marginTop:"15px"}} >
                    <InfoCard/>
                </Typography>
            <Divider className={classes.divider} />
            <Form/>
        </CardContent>
        <CardContent className={classes.cartContent} > 
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List/>
                </Grid>

            </Grid>
        </CardContent>
    </Card>
  )
}

export default Main