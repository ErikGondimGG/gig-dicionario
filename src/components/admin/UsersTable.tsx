import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useResetUserPassword, useUsersPaginated } from "@/hooks/useUsers";
import { put } from "@/lib/apiClient";
import type { UserResponse, User as UserType } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Copy,
  KeyRound,
  MoreHorizontal,
  Pencil,
  Shield,
  User,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import UserFormDialog from "./UserFormDialog";

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const { data, isLoading, isError, refetch } = useUsersPaginated(page, limit);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [resettingUser, setResettingUser] = useState<UserType | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const resetPassword = useResetUserPassword(resettingUser?.id || "");

  const toggleActive = useMutation({
    mutationFn: (user: UserType) =>
      put<UserResponse>(`/api/v1/users/${user.id}`, { active: !user.active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleToggleActive = async (user: UserType) => {
    try {
      await toggleActive.mutateAsync(user);
      toast.success(
        user.active
          ? "Usuário desativado com sucesso!"
          : "Usuário ativado com sucesso!"
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao alterar status do usuário"
      );
    }
  };

  const handleResetPassword = async () => {
    if (!resettingUser) return;
    try {
      const response = await resetPassword.mutateAsync();
      if (response.success && response.data?.password) {
        setNewPassword(response.data.password);
      }
      toast.success("Senha resetada com sucesso!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao resetar senha"
      );
      setResettingUser(null);
    }
  };

  const copyPassword = () => {
    if (newPassword) {
      navigator.clipboard.writeText(newPassword);
      toast.success("Senha copiada!");
    }
  };

  const closePasswordDialog = () => {
    setResettingUser(null);
    setNewPassword(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm text-center">
        <p className="text-red-500">Erro ao carregar usuários</p>
        <Button variant="outline" onClick={() => refetch()} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    );
  }

  const users = data?.data.data || [];

  return (
    <>
      <div className="rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-neutral-800">
              <TableHead className="w-12"></TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-slate-500"
                >
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-200 dark:border-neutral-800"
                >
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-green-600 text-white text-sm">
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      {user.last_login && (
                        <p className="text-xs text-slate-500">
                          Último login:{" "}
                          {new Date(user.last_login).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {user.email || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className={
                        user.role === "admin"
                          ? "bg-amber-600 hover:bg-amber-600"
                          : ""
                      }
                    >
                      {user.role === "admin" ? (
                        <>
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </>
                      ) : (
                        <>
                          <User className="mr-1 h-3 w-3" />
                          Somente Leitura
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.active ? "default" : "destructive"}
                      className={
                        user.active ? "bg-green-600 hover:bg-green-600" : ""
                      }
                    >
                      {user.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString("pt-BR")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setResettingUser(user)}
                        >
                          <KeyRound className="mr-2 h-4 w-4" />
                          Resetar Senha
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleToggleActive(user)}
                          className={
                            user.active
                              ? "text-red-600 focus:text-red-600"
                              : "text-green-600 focus:text-green-600"
                          }
                        >
                          {user.active ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination for users */}
      {data?.data?.pagination && (
        <div className="mt-4">
          <Pagination
            page={page}
            totalPages={data.data.pagination.total_pages}
            totalItems={data.data.pagination.total}
            limit={limit}
            onPageChange={(p) => setPage(p)}
            onLimitChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
          />
        </div>
      )}

      {/* Edit User Dialog */}
      <UserFormDialog
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={() => {
          setEditingUser(null);
          refetch();
        }}
      />

      {/* Reset Password Dialog */}
      <Dialog open={!!resettingUser} onOpenChange={closePasswordDialog}>
        <DialogContent className="bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle>
              {newPassword ? "Nova Senha Gerada" : "Resetar Senha"}
            </DialogTitle>
            <DialogDescription>
              {newPassword ? (
                <>
                  A nova senha para{" "}
                  <span className="font-semibold text-white">
                    {resettingUser?.username}
                  </span>{" "}
                  foi gerada. Copie e envie ao usuário.
                </>
              ) : (
                <>
                  Deseja resetar a senha de{" "}
                  <span className="font-semibold text-white">
                    {resettingUser?.username}
                  </span>
                  ? Uma nova senha será gerada automaticamente.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {newPassword ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg font-mono">
                <span className="flex-1">{newPassword}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyPassword}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={closePasswordDialog} className="w-full">
                Fechar
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={closePasswordDialog}>
                Cancelar
              </Button>
              <Button
                onClick={handleResetPassword}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Resetar Senha
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
