import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    setIsLoading(true);
    logout();
    setIsLoading(false);
    history.push('/');
  }, []);

  return <>{isLoading && <p>Logging you out...</p>}</>;
};

export default Logout;
