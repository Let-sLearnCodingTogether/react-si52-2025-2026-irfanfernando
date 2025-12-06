import { useState, type ChangeEvent, type FormEvent } from "react"
import { Form } from "react-bootstrap"
import {Button} from "react-bootstrap"
import ApiClient from "../../../utils/ApiClient"
import { NavLink, useNavigate } from "react-router"

interface SignInForm {
    
    email : string,
    password : string,
}

function SignIn(){
    const navigate = useNavigate()
    const[isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)

        try{
            const response = await ApiClient.post("/signin",form)

            console.log(response.data);

            if(response.status === 200){
                //redirect user ke halaman movie
                localStorage.setItem("AuthToken", response.data.data.token)
                navigate("/movie", {
                    replace : true
                })
            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
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
          <Button 
            type = "submit" 
            variant = "primary" 
            disabled= {isLoading}> 
            {isLoading ? "Loading..." : "Sign In" } </Button>
          <NavLink to="/signin">Sign In</NavLink>

      </Form>
    </div>
}


export default SignIn