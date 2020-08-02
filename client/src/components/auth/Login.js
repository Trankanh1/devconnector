import React, { Fragment, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        
        const user = {
            email,
            password
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            const body = JSON.stringify(user);

            const res = await axios.post('api/auth/login', body, config);
            console.log(res.data);
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
              
                <div className="form-group">
                    <input type="email" placeholder="Email Address" value={email} name="email" onChange={e => onChange(e)} required />
                    <small className="form-text"
                    ></small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6" value={password}
                        onChange={e => onChange(e)}
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </Fragment>
    )
}

export default Login