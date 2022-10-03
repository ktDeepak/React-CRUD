import React,{useState} from 'react';
import useForm from '../middleware/Formvalidations';
import {toast} from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const baseURL="http://localhost:4000"

function Create(props){
      //internal navigate
      const navigate=useNavigate()

    const {contact,errors,readValue,setContact,initState}=useForm()

             //submit handler function
             const submitHandler= async(e)=>{
              e.preventDefault();//to avoid page refresh
              if (Object.keys(errors).length===0 && Object.keys(contact).length!==0){
                  console.log('new contact=',contact)
                  //post handler 
                  await axios.post(`${baseURL}/contacts`,contact)
                    .then(res=>{
                      setContact(initState)
                      toast.success("Task created")
                      navigate('/');
                    }).catch(err=>toast.error(err.message))
              }else {
                  toast.error("some Errors are in form")
              }   
          }
    
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className='display-4'>Create</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className='card'>
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                  <label htmlFor="name">Task Name</label>
                                  <input type="text" name="name" value={contact.name} onChange={readValue} id="name" minLength={3}
                                   className="form-control" required  />
                                   {
                                    errors && errors.name ? (
                                      <div className="alert alert-danger">{errors.name}</div>
                                    ) : null
                                   }
                                </div>
                                
                                <div className="form-group mt-2">
                                  <label htmlFor="description">Description</label>
                                  <textarea name="description" value={contact.description} onChange={readValue} id="description" cols="30" rows="5"
                                   className="form-control" required />
                                   {
                                    errors && errors.description?(
                                      <div className="alert alert-danger">{errors.description}</div>
                                    ):null
                                   }
                                  </div>  
                                  <div className="form-group mt-2">
                                  <input type="submit" value="create" className="btn btn-outline-success" />
                                </div>  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    )
}
export default Create