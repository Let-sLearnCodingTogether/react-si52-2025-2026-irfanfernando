import { useState, type ChangeEvent, type FormEvent } from "react"
import { Form } from "react-bootstrap"
import {Button} from "react-bootstrap"
import ApiClient from "../../../utils/ApiClient"
import { NavLink } from "react-router"

interface SignInForm {
    
    email : string,
    password : string,
}

function SignIn(){
    const [form, setform] = useState<SignInForm>({
        email: "",
        password: "",
    })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = event.target

        setform({
            ...form,
            [name]:value
        })
    }
    const onSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try{
            const response = await ApiClient.post("/signin",form)

            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    return <div className="container mx-auto  " >Sign In Page
 <Form onSubmit={onSubmit}>
           <Form.Group className="mb-3" controlId="formemail">
              <Form.Label>email</Form.Label>
              <Form.Control onChange={onHandleChange}
              value={form.email}
                  name="email"
                  type="text"
                  placeholder="email" />
          </Form.Group>
           <Form.Group className="mb-3" controlId="formpassword">
              <Form.Label>password</Form.Label>
              <Form.Control onChange={onHandleChange}
              value={form.password}
                  name="password"
                  type="password"
                  placeholder="password" />
          </Form.Group>
          <Button type = "submit" variant = "primary">Sign In</Button>
          <NavLink to="/signin">Sign In</NavLink>

      </Form>
    </div>
}


export default SignIn