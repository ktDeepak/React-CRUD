import React,{useState} from "react"
import {omit} from 'lodash'


//useForm =>form validate custom hook
const initState={
    
        name:"",
        description:""
      }


function useForm(){

    const[contact,setContact]=useState(initState)
      const[errors,setErrors]=useState({})



      //error printing logic
      const errPrint =(prop,msg)=>{
        setErrors({ ...errors,[prop]:msg})
      }

      //validate function
    const validate =(event,name,value)=>{
        switch(name){
            case "name":
                if(value.length === 0){
                    errPrint(name, "Name filed must be filled")
                }else if (value.length<3){
                    errPrint(name, "Name atleast have 3 letters")
                }else if(!new RegExp(/^[A-Z a-z\s]+$/).test(value)){
                    errPrint(name, "Invalid Name")
                }else{
                    let newOb=omit(errors,name);
                    setErrors(newOb);
                }
                break;
            default:
                break;            
        }
    };

    const readValue=(e)=>{
      //  console.log('event=',e.target.name+"-"+e.target.value)
        const {name,value}= e.target;
        validate(e,name,value)
        setContact({...contact,[name]:value})
    }


    return{
        contact,
        errors,
        readValue,
        setContact,
        initState
    }

}

export default useForm