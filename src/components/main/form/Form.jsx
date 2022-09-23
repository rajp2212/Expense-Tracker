import React,{useContext,useState,useEffect} from 'react'
import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import useStyles from './styles'
import { TrackerContext } from '../../../context/Context'
import {incomeCategories,expenseCategories} from '../../../Constants/categories'
import {v4 as uuidv4} from "uuid"
import FormatDate from '../../../FormatDate/FormatDate'
import { useSpeechContext } from "@speechly/react-client";
import CustomizedSnackbar from '../../snackbar/CustomizedSnackbar'


const Form = () => {


  const initialState={
    type:"Income",
    amount:"",
    category:"",
    date: FormatDate(new Date()),
  }

  const [formData, setformData] = useState(initialState)
  /* console.log(formData); */
  const classes=useStyles();
  const {addTransaction}=useContext(TrackerContext)
  const [open, setOpen] = React.useState(false);


  const createTransaction=()=>{
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

    const transaction={...formData,amount:Number(formData.amount),id:uuidv4()};

    addTransaction(transaction);
    setformData(initialState);
    setOpen(true)
  }



  //constants
 const selectedType= formData.type==="Income" ?incomeCategories :expenseCategories;

 //Speechly
 const {segment}=useSpeechContext();

 useEffect(()=>{
    if(segment){
     if(segment.intent.intent==="add_expense"){
       setformData({...formData,type:"Expense"})
    }else if(segment.intent.intent==="add_income"){
      setformData({...formData,type:"Income"})
   }else if(segment.isFinal && segment.intent.intent==='create_transaction'){
     return createTransaction();
   }else if(segment.isFinal && segment.intent.intent==='cancel_transaction'){
    return setformData(initialState);
  }

  segment.entities.forEach((e)=>{
    const category=`${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
    switch (e.type) {
      case "amount":
        setformData({...formData,amount:e.value})
        break;
      case "category":
        if (incomeCategories.map((iC) => iC.type).includes(category)) {
          setformData({ ...formData, type: 'Income', category });
        } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
          setformData({ ...formData, type: 'Expense', category });
        }
        break;
      case "date":
        setformData({...formData,date:e.value})
        break;
    
      default:
        break;
    }
  })

    if(segment.isFinal && formData.type && formData.category && formData.amount && formData.date){
      createTransaction();
    }

  }
 },[segment])

  return (
    <Grid container spacing={2}>
     <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12} >
        <Typography align='center' gutterBottom variant='subtitle2' >
          {
            segment &&(segment.words.map((w)=>w.value).join(" "))
          }
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formData.type} onChange={(e)=>{setformData({...formData,type:e.target.value})}}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>

      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={formData.category} onChange={(e)=>{setformData({...formData,category:e.target.value})}} >
            {selectedType.map((c)=>{
              return(
                <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

      </Grid>
      <Grid item xs={6}>
          <TextField label='Amount' fullWidth type='number' value={formData.amount} onChange={(e)=>{setformData({...formData,amount:e.target.value})}} />
      </Grid>
      <Grid item xs={6}>
          <TextField  type='date' label="Date" fullWidth value={formData.date} onChange={(e)=>{setformData({...formData,date:e.target.value})}}/>

      </Grid>
      <Button variant='outlined' color='primary' className={classes.Button} fullWidth onClick={createTransaction} >Create</Button>
    </Grid>
  )
}

export default Form