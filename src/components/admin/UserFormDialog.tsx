import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser, useUpdateUser } from "@/hooks/useUsers";
import { Loader2 } from "lucide-react";
import type { User } from "@/types/auth";
import { toast } from "sonner";

interface UserFormDialogProps {
  user?: User | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserFormDialog({
  user,
  open,
  onClose,
  onSuccess,
}: UserFormDialogProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "readonly">("readonly");

  const createUser = useCreateUser();
  const updateUser = useUpdateUser(user?.id || "");

  const isEditing = !!user;

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email || "");
      setRole(user.role);
      setPassword("");
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("readonly");
    }
  }, [user, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateUser.mutateAsync({
          email: email || undefined,
          role,
        });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await createUser.mutateAsync({
          username,
          email: email || undefined,
          password,
          role,
        });
        toast.success("Usuário criado com sucesso!");
      }
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : isEditing
          ? "Erro ao atualizar usuário"
          : "Erro ao criar usuário"
      );
    }
  };

  const isPending = createUser.isPending || updateUser.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize as informações do usuário"
              : "Preencha os dados para criar um novo usuário"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-username">Usuário</Label>
            <Input
              id="form-username"
              placeholder="nome.usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isEditing || isPending}
              className="bg-slate-800 border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-email">E-mail</Label>
            <Input
              id="form-email"
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              className="bg-slate-800 border-slate-700"
            />
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="form-password">Senha</Label>
              <Input
                id="form-password"
                type="password"
                placeholder="Senha inicial"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
                className="bg-slate-800 border-slate-700"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="form-role">Função</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as "admin" | "readonly")}
              disabled={isPending}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="readonly">Somente Leitura</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Salvando..." : "Criando..."}
                </>
              ) : isEditing ? (
                "Salvar"
              ) : (
                "Criar Usuário"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
