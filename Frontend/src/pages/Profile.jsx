import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

const Profile = () => {
    const { getUser, user} = useContext(UserContext);
  
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
      </div>
    );
  };
  export default Profile;

