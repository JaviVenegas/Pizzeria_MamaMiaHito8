import { useContext, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    // Redirigir si no hay token
    if (!user || !user.token) {
        return <Navigate to="/login" />;
    }


    const getProfile = async () => {
        const response = await fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        if (!response.ok) throw new Error("Error fetching profile");
        return await response.json();
    };

   
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile(); 
                if (profile) {
                    setEmail(profile.email); 
                    setName(profile.name); 
                }
            } catch (error) {
                console.error("Error al obtener el perfil:", error);
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };
        fetchProfile();
    }, [user.token]); 


    if (loading) {
        return <p>Cargando perfil...</p>;
    }


    if (error) {
        return <p>Error: {error}</p>;
    }

    const logout = () => {
        setUser({ username: "", password: "", token: null });
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center mb-5">
                <div className="col-md-7">
                    <div className="card p-3 py-4">
                        <div className="text-center">
                            <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" className="rounded-circle" alt="Profile" />
                        </div>
                        <div className="text-center mt-3">
                            <span className="bg-secondary p-1 px-4 rounded text-white">🍕</span>
                            <h5 className="mt-2 mb-0">{name}</h5>
                            <span>Mail: {email} </span>
                            <div className="px-4 mt-1">
                                <p className="fonts">Miembro: 10/05/2008</p>
                            </div>
                            <div className="buttons">
                                <button onClick={logout} className="btn btn-primary px-4">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
