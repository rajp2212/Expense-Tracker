import React,{useContext} from 'react'
import {List as MUIList,Slide,ListItem,ListItemAvatar,ListItemText,Avatar,ListItemSecondaryAction,IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import { BiRupee } from "react-icons/bi";
import { TrackerContext } from '../../context/Context';
import useStyles from './styles'


const List = () => {

  const{deleteTransaction,transactions}=useContext(TrackerContext);

  const classes=useStyles(); 
 
  return (
    <MUIList dense={false} className={classes.list} >
        {transactions.map((transaction)=>{
                return(
                    <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id} >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={transaction.type==='Income'?classes.avatarIncome:classes.avatarExpense}>
                                    <BiRupee/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={transaction.category} secondary={`₹${transaction.amount} - ${transaction.date}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge='end' aria-label='delete' onClick={()=>{deleteTransaction(transaction.id)}} > 
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                                

                        </ListItem>
                    </Slide>
                )
        })}
    </MUIList>
  )
}

export default List