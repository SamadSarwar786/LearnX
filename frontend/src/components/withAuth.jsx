import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    if (typeof window !== 'undefined') {
      if (!isAuthenticated) {
        router.replace('/login');
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    // When rendering on the server, we don't want to redirect
    return null;
  };
};

export default withAuth;