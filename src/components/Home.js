import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {toast}from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
const baseURL='http://localhost:4000'

function Home(props){
    const [contacts,setContacts]=useState([])
    const navigate=useNavigate()

    //states of pagination
    const [curItem,setCurItem]=useState([])
    const [pageCount,setPageCount]=useState(0);
    const [itemOff,setItemOff]=useState(0);

    useEffect(()=>{
        const getContacts=async()=>{
            await axios.get(`${baseURL}/contacts`)
            .then(res=>{
                console.log('contacts=',res)
                setContacts(res.data)

                const endOff=itemOff+ props.itemCount;
                setCurItem(contacts.slice(itemOff,endOff))
                setPageCount(Math.ceil(contacts.length/props.itemCount))
            }).catch(err=>toast.error(err.message))
        }
        getContacts()
    },[contacts,props.itemCount,itemOff])
    const deleteHandler=async(id)=>{
        if (window.confirm(`Are you sure to delete contact item ${id}?`)){
            await axios.delete(`${baseURL}/contacts/${id}`)
            .then(res=>{
                toast.success("Contact delete successfully")
                navigate('/')
            }).catch(err=>toast.error(err.message))
        }else {
            toast.warning('delete terminated')
        }
    }

    //pagination handler
    const handleClick=(event,value)=>{
        const newOff=(event.selected * props.itemCount)
        setItemOff(newOff)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h5 className="display-5">Contacts List</h5>
                </div>
            </div>

            <div className="row">
                {
                    curItem && curItem.map((item,index)=>{
                        return (
                            <div className="col-md-6 mt-2" key={index}>
                                <div className="card mb-2">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={item.image} alt={item.name} className="card-img-top"/>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="text-center text-uppercase">{item.name}{item.id}</h5>
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                    <strong>Email</strong>
                                                    <span className="float-end">{item.email}</span>
                                                    </li>
                                                    <li className="list-group-item">
                                                    <strong>Mobile</strong>
                                                    <span className="float-end">{item.mobile}</span>
                                                    </li>
                                                    <li className="list-group-item">
                                                       <details>
                                                        <summary>Address</summary>
                                                        <p>{item.address}</p>
                                                       </details>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-footer">
                                                <NavLink to={`/update/${item.id}`} className="btn btn-sm btn-info">
                                                    <i className="bi bi-pen"></i>
                                                </NavLink>
                                                <button onClick={()=>deleteHandler(item.id)} className="btn btn-sm btn-danger float-end">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ReactPaginate
                      pageCount={pageCount}
                      className={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                      activeLinkClassName={"active"}
                      onPageChange={handleClick}
                      />
                </div>
            </div>
        </div>
    )
}
export default Home