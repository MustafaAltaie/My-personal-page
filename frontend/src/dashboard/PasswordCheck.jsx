import '../styles/passwordCheck.css';
import { useCheckPasswordMutation } from '../features/portfolioApi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordCheck = () => {
    const [password, setPassword] = useState('');
    const [checkPassword] = useCheckPasswordMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('authenticated');
        if (auth === 'true') {
            navigate('/dashboard-4435966-mustafa');
        }
    }, [navigate]);

    const handlePasswordCheck = async (e) => {
        e.preventDefault();
        try {
            const res = await checkPassword(password).unwrap();
            if(res.valid) {
                localStorage.setItem('authenticated', 'true');
                navigate('/dashboard-4435966-mustafa');
            }
            else {
                alert('Wrong password');
            }
        } catch (err) {
            alert('Error while checking password');
        }
    }

    return (
        <>
        <section className="passwordWrapper flexMiddle">
            <form onSubmit={handlePasswordCheck}>
                <input type="password" placeholder="Password" title="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit'>Check</button>
            </form>
        </section>
        </>
    )
}

export default PasswordCheck;