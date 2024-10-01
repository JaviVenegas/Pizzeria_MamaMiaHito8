import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

const Register = () => {
    const { register } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const validarDatos = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Las contraseñas no coinciden.");
            return;
        } else if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        } else {
            setError(''); 
            register(email, password);
        }
    };

    return (
        <div>
            <h2 className="mb-3 text-center">Registrar Usuario</h2>
            <form className="formulario m-5" onSubmit={validarDatos}>
                {error && <p className="text-danger">{error}</p>} {/* Mostrar mensaje de error si existe */}
                
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirmar Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-primary mt-4">Registrar</button>
                </div>
            </form>
        </div>
    );
}

export default Register;




