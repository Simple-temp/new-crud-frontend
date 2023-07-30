import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name:"", des:"", img:null})

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
            const { data } = await axios.post("http://localhost:4000/todo/posttodo", inputData)
            if(data){
                navigate("/showdata")
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Container>
            <Row>
                <Col lg={6} md={6} sm={12} className='mx-auto'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="des" placeholder="Description" onChange={handleChange} />
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
            </Row>
        </Container>
    );
};

export default Home;
