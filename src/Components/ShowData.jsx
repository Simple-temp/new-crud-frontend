import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, data: action.payload };
        case 'FETCH_ERROR':
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error('Invalid action type');
    }
};

const initialState = {
    data: null,
    isLoading: false,
    error: null,
};

const ShowData = () => {

    const [state, dispatch] = useReducer(dataFetchReducer, initialState);
    const { data, isLoading, error } = state;
    const [getTodo, setGetTodo] = useState([])
    console.log(getTodo)

    useEffect(() => {
        handleGetTodo()
    }, [])

    const handleGetTodo = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {

            const { data } = await axios.get("https://new-crud-backend.onrender.com/todo/gettodo")
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            setGetTodo(data)

        } catch (err) {
            dispatch({ type: 'FETCH_ERROR', payload: 'Error fetching data' });
            console.log(err)
        }
    }

    const handleTodoDelete = async (id) => {
        try {

            await axios.delete(`https://new-crud-backend.onrender.com/todo/deletetodo/${id}`)
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
                    isLoading ? <p>Loading..</p>
                        : error ? <p>{error}</p>
                            : data && (
                                data.map((item) => {
                                    return (
                                        <Col lg={4} md={6} sm={12} className='my-2' key={item._id}>
                                            <Card>
                                                <Card.Img variant="top" src={`https://new-crud-backend.onrender.com/uploads/${item.img}`} />
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
                            )
                }
            </Row>
        </Container>
    );
};

export default ShowData;
