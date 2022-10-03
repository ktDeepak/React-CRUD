import React, { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom"
import {toast} from "react-toastify"
import axios from "axios"

import useForm from "../middleware/Formvalidations";

const baseURL="http://localhost:4000"

function Update(props){
    
      //internal navigate
      const navigate = useNavigate()
      const params = useParams()
      const {contact,errors,readValue,setContact,initState}=useForm()

      //calling api for single data
      useEffect(()=>{
        const readContact =async()=>{
            await axios.get(`${baseURL}/contacts/${params.contactId}`)
            .then(res=>{
                console.log('single=',res.data)
                setContact(res.data)
            }).catch(err=>toast.error(err.message))
        }
        readContact()
      },[])
  
       //submit handler function
       const submitHandler= async(e)=>{
       e.preventDefault();
       console.log('update out=',contact)
       await axios.put(`${baseURL}/contacts/${params.contactId}`,contact)
         .then(res=>{
            setContact(initState)
            toast.success("tasks list updated");
            navigate('/');
         }).catch(err=>toast.error(err.message))
        }        

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3>Update</h3>
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
                                   
                                  </div>  
                                  <div className="form-group mt-2">
                                  <input type="submit" value="update" className="btn btn-outline-success" />
                                </div>  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Update