
import { UserProfile } from "@/hooks/useAdminUsers";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, Pencil, Trash } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface UserTableProps {
  users: UserProfile[];
  isLoading: boolean;
  searchTerm: string;
  onEdit: (user: UserProfile) => void;
  onDelete: (user: UserProfile) => void;
}

const UserTable = ({
  users,
  isLoading,
  searchTerm,
  onEdit,
  onDelete
}: UserTableProps) => {
  const { user: currentUser } = useAuth();
  
  const filteredUsers = users.filter(user => 
    (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (user.username?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (user.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Carregando usuários...</div>;
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum usuário encontrado</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email/Usuário</TableHead>
            <TableHead>Nome Completo</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.email || user.username || "Sem email"}
                </div>
              </TableCell>
              <TableCell>{user.full_name || "-"}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                </span>
              </TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onEdit(user)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onDelete(user)}
                    disabled={currentUser?.id === user.id}
                    title={currentUser?.id === user.id ? "Não é possível excluir seu próprio usuário" : ""}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
