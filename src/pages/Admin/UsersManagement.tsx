
import { useState } from "react";
import { useAdminUsers, UserProfile } from "@/hooks/useAdminUsers";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import UserTable from "@/components/Admin/Users/UserTable";
import UserEditDialog from "@/components/Admin/Users/UserEditDialog";
import UserDeleteDialog from "@/components/Admin/Users/UserDeleteDialog";

const UsersManagement = () => {
  const { users, isLoading, isSubmitting, updateUserProfile, deleteUser } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);
  
  const handleEditClick = (user: UserProfile) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };
  
  const handleDeleteClick = (user: UserProfile) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = (formData: Partial<UserProfile>) => {
    if (editingUser) {
      updateUserProfile({ 
        id: editingUser.id, 
        ...formData
      });
    }
    
    setIsDialogOpen(false);
  };
  
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Gerenciar Usuários</h2>
          <p className="text-sm text-gray-500">
            Visualize e gerencie os usuários da plataforma.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <UserTable 
        users={users}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <UserEditDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={editingUser}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <UserDeleteDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={userToDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default UsersManagement;
