import React,{ createContext,useReducer } from "react";
import ContextReducer from "./ContextReducer";
const initialState=JSON.parse(localStorage.getItem('transactions')) || [];
export const TrackerContext=createContext(initialState)

export const Provider=({children})=>{
    const [transactions, dispatch] = useReducer(ContextReducer,initialState );
    

    //Action creators
    const addTransaction=(transaction)=>{
        dispatch({type:'ADD_TRANSACTION', payload : transaction}) ;
    };
    const deleteTransaction=(id)=>{
        dispatch({type:'DELETE_TRANSACTION', payload : id}); 
    };
    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);
    /* console.log(transactions); */
    return(
          <TrackerContext.Provider value={{addTransaction,deleteTransaction,transactions,balance}}>
            {children}
          </TrackerContext.Provider>  
        
    )
}