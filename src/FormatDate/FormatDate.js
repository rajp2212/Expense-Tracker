const FormatDate=(date)=>{
    const newDate=new Date();
    let day=`${newDate.getDate()}`;
    let month=`${newDate.getMonth()+1}`;
    let year=`${newDate.getFullYear()}`;

    if(day.length<2){
        day=`0${day}`
    }
    if(month.length<2){
        month=`0${month}`
    }

    return [year,month,day].join('-');
}

export default FormatDate;