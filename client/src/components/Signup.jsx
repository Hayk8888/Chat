import React, {useState, useEffect} from 'react';
import axios from "axios";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  handleSubmit  = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:5000/signup', {email, password});


            console.log('Signup successful', response.data);

            setEmail('')
            setPassword('');

        }catch(err) {
            console.error("Error  logining", err)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>email</label>

                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                <br/>
                <label>Password</label>

                <input id="password" value={password}  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                <button
                    type="submit" style={{ width: "100px", borderRadius: "20px", backgroundColor: "cyan" }}>Send</button>
            </form>
        </div>
    );
};

export default Signup;