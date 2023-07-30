import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Update = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name:"", des:"", img:null})
    const [getData, setGetData] = useState({})

    useEffect(()=>{
        handlegetData()
    },[])

    useEffect(()=>{
        setFormData(getData)
    },[getData])

    const handlegetData = async () => {
        try{
            const { data } =await axios.get(`http://localhost:4000/todo/gettodobyid/${id}`)
            setGetData(data)
        }catch(err){
            console.log(err)
        }
    }

    const handleChange = async (e) =>{
        const { name, value, files } = e.target
        setFormData({
            ...formData,
            [name] : files ? files[0] : value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const inputData = new FormData()
        inputData.append("name", formData.name)
        inputData.append("des", formData.des)
        inputData.append("img", formData.img)

        try{
            const { data } = await axios.put(`http://localhost:4000/todo/updatetodo/${id}`, inputData)
            if(data){
                toast.success("Updated Succesfully")
                navigate("/showdata")
            }
        }catch(err){
            console.log(err)
        }
    }


    return (
        <Container>
            <Row>
                <Col lg={6} md={6} sm={12}>
                    <h4>Id: {id}</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="des" placeholder="Description" onChange={handleChange} value={formData.des}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="img" onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </Form>
                </Col>
                <Col lg={6} md={6} sm={12}>
                    <img src={`http://localhost:4000/uploads/${getData.img}`} alt="this is a avater image" className='img-fluid w-100 d-block' />
                </Col>
            </Row>
        </Container>
    );
};

export default Update;
