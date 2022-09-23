import React from 'react';

const isIncome = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div elevation={3} style={{ textAlign: 'center', fontSize:'95%' }}>
     <span style={{textDecoration:"underline",fontWeight:"bold"}}>Try saying:</span>  <br /> 
      Add {isIncome ? 'Income ' : 'Expense '} 
      for {isIncome ? '₹100 ' : '₹5000 '}  
      in Category {isIncome ? 'Salary ' : 'Travel '}
      for {isIncome ? 'Monday ' : 'Thursday '}
    </div>
  );
};

export default InfoCard;