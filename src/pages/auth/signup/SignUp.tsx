import { useState, type ChangeEvent, type FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router";
import ApiClient from '../../../utils/ApiClient';

interface SignUpForm{
    username : string,
    email : string,
    password : string
}

function SignUp(){
    //return <h1>Sign Up Page</h1>

    const[form, setForm] = useState<SignUpForm>({
        username: "",
        email: "",
        password: ""
    })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target

        setForm({
            ...form,
            [name]:value
        })


    }
    const onSubmit = async (event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        try{
            const response = await ApiClient.post("/signup", form)

            console.log(response);
        }catch(error){
            console.log(error);
        }
    }
    return (
    <div className= "container mx-auto">
        <h1>Sign Up Page</h1>
        
    <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formusername">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={onHandleChange} value={form.username} name="username" type="text" placeholder="Enter Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formemail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onHandleChange} value={form.email} type="email" placeholder="Enter email address" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formpassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onHandleChange} value={form.password} type="password" placeholder="Enter Password" />
      </Form.Group>

      
    </Form>

    <NavLink to="/" className="btn btn-primary">Sign Up</NavLink>
    </div>
  );
}


export default SignUp