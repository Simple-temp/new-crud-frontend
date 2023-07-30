import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ShowData = () => {

    const [getTodo, setGetTodo] = useState([])
    console.log(getTodo)

    useEffect(() => {
        handleGetTodo()
    }, [])

    const handleGetTodo = async () => {
        try {

            const { data } = await axios.get("http://localhost:4000/todo/gettodo")
            setGetTodo(data)

        } catch (err) {
            console.log(err)
        }
    }

    const handleTodoDelete = async (id) => {
        try {

            await axios.delete(`http://localhost:4000/todo/deletetodo/${id}`)
            toast.success("Deleted Succesfully")
            window.location.reload(); 

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Row>
                {
                    getTodo.map((item) => {
                        return (
                            <Col lg={4} md={6} sm={12} className='my-2' key={item._id}>
                                <Card>
                                    <Card.Img variant="top" src={`http://localhost:4000/uploads/${item.img}`} />
                                    <Card.Body>
                                        <h4>Id: {item._id}</h4>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.des}
                                        </Card.Text>
                                        <Button variant="danger" className='me-2' onClick={() => handleTodoDelete(item._id)}>Delete</Button>
                                        <Link to={`/update/${item._id}`}>
                                            <Button variant="success">Update</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    );
};

export default ShowData;
