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
                      toast.success("user created")
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
                                  <label htmlFor="name">Name</label>
                                  <input type="text" name="name" value={contact.name} onChange={readValue} id="name" minLength={3}
                                   className="form-control" required  />
                                   {
                                    errors && errors.name ? (
                                      <div className="alert alert-danger">{errors.name}</div>
                                    ) : null
                                   }
                                </div>
                                <div className="form-group mt-2">
                                  <label htmlFor="email">Email</label>
                                  <input type="email" name="email" value={contact.email} onChange={readValue} id="email" placeholder="user@gmail.com" 
                                  className="form-control" required/>
                                  {
                                    errors && errors.email?(
                                      <div className="alert alert-danger">{errors.email}</div>
                                    ):null
                                   }
                                </div>
                                <div className="form-group mt-2">
                                  <label htmlFor="image">Profile Image</label>
                                  <input type="url" name="image" value={contact.image} onChange={readValue} id="image" placeholder="enter  url or image link" 
                                  className="form-control"  required/>
                                  {
                                    errors && errors.image?(
                                      <div className="alert alert-danger">{errors.image}</div>
                                    ):null
                                   }
                                  </div>  
                                <div className="form-group mt-2">
                                  <label htmlFor="mobile">Mobile</label>
                                  <input type="number" name="mobile" value={contact.mobile} onChange={readValue} id="mobile"
                                   className="form-control" required/>
                                   {
                                    errors && errors.mobile?(
                                      <div className="alert alert-danger">{errors.mobile}</div>
                                    ):null
                                   }
                                  </div>  
                                <div className="form-group mt-2">
                                  <label htmlFor="address">Address</label>
                                  <textarea name="address" value={contact.address} onChange={readValue} id="address" cols="30" rows="5"
                                   className="form-control" required />
                                   {
                                    errors && errors.address?(
                                      <div className="alert alert-danger">{errors.address}</div>
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