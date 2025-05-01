
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";

const Dashboard = () => {
  const { session, user } = useAuth();
  
  // Se não estiver logado, redireciona para login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo(a)!</h2>
          <p className="text-gray-600">
            Você está logado com o email: <span className="font-medium">{user?.email}</span>
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">O que você pode fazer:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Explorar os produtos do Achados da Vovó</li>
              <li>Gerenciar seu perfil e preferências</li>
              <li>Acompanhar seus pedidos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
