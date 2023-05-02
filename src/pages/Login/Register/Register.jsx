import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Register = () => {
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [accepted, setAccepted] = useState(false)
    const { createUser,updateUserProfile } = useContext(AuthContext);
    const handleRegister = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const photoUrl = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        setSuccess('')

        updateUserProfile(name, photoUrl)
            .then(()=>{})
            .catch(error => console.log(error.message))

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                if (loggedUser) {
                    setSuccess('User Register Successfull')
                    setError('')
                    console.log(loggedUser)
                }
            })
            .catch(error => {
                if (error) {
                    setSuccess('')
                    setError(error.message)
                }
            })
    }

    const handleAccepted = event =>{
       setAccepted(event.target.checked)
    }
    return (
        <Container className='mx-auto w-25'>
            <h3>Register your account</h3>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name='name' required placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoto">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control type="text" name='photo' required placeholder="Enter Photo Url" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' required placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' required
                        placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onClick={handleAccepted} type="checkbox" name='accept' label={<>Accept <Link to='/terms'>Term & Conditions</Link></>} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!accepted}>
                    Register
                </Button>
                <br />
                <Form.Text className="text-secondary">
                    Have An Account ? <Link to='/login'>Login</Link>
                </Form.Text>
                <Form.Text className="text-success">
                </Form.Text>
                <Form.Text className="text-danger">
                </Form.Text>
                <p className='text-success'>{success}</p>
            <p className='text-danger'>{error}</p>
            </Form>
           
        </Container>
    );
};

export default Register;