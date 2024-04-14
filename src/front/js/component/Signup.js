import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/signup.css";

// 1 models
// 2 endpoints + Postman
// 3 flux 
// 4 front (usar context para traer el flux) 

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const success = await actions.addUser(email, password);
            if (success) {
                navigate("/");

            } else {
                setErrorMessage("Error: User already exist");       
            }

        } catch (error) {
            setErrorMessage("Error: There was a problem processing your request. Please try again later.");
        }
    };


    return (
        <>
            <div className="jumbotron jumbotron-fluid background-signup">
                <div className='container-signup'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='exampleInputEmail1' className='form-label'>Email adress</label>
                            <input type='email' className='form-control' id='inputEmail' name='email' placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            >
                            </input>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className='mb-3'>
                                <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
                                <input type='password' className='form-control' id='inputPassword' name='password' placeholder='Enter your password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                >
                                </input>
                        </div>
                        <div className='mb-3 form-check'>
                                <input type='checkbox' className='form-check-input' id='isActive' name='is_active' 
                                    onChange={(e) => setIsActive(e.target.value)}
                                    value={isActive}
                                >
                                </input>
                                <label className="form-check-label" htmlFor="isActive">Is active?</label>
                        </div>
                        <div className='buttons text-center'>
                            <button type='submit' value={isActive} className='btn btn-success' style={{marginRight: "10px"}}>Sumbit</button>
                            <Link to={"/"}>
                                <button type='button' className='btn btn-secondary'>Back home</button>
                            </Link>
                        </div>
                    </form>
                    {errorMessage !== null && <div className="alert alert-danger">{errorMessage}</div>}
                </div>
            </div>
        
        
        </>

    );
};

export default Signup;