import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const { getUser, user} = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
      navigate("/")
      setUser ({ username: "", password: "", token: false })
  }
  
    useEffect(() => {
      getUser();
    }, []);
  
    return (
      <div>
        <div>
          {user ? (
            <>
            <p>Email: {user.email}</p>

            </>
  
          ) : (
            <p>Please login to view your profile.</p>
          )}
        </div>
        <div className="buttons">
          <button onClick={() => (logout())} className="btn btn-primary px-4">Logout</button>
        </div>
      </div>
    );
  };
  export default Profile;

