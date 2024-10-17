import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      // Se não houver token, redirecione para a página de login
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    // Se o token estiver presente, renderiza o componente
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;