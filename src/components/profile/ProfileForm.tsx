import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateProfile } from "@/hooks/useUsers";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfileForm() {
  const { user, updateUser } = useAuth();
  const updateProfile = useUpdateProfile();

  const [email, setEmail] = useState(user?.email || "");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateProfile.mutateAsync({
        email: email || undefined,
      });
      if (response.success && response.data) {
        updateUser(response.data);
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar perfil"
      );
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-neutral-800 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Informações do Perfil</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-green-500/20">
            <AvatarFallback className="bg-green-600 text-white text-2xl">
              {getInitials(user?.username || "U")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-medium">{user?.username}</h3>
            <p className="text-sm text-slate-500">
              {user?.role === "admin" ? "Administrador" : "Usuário"}
            </p>
            {user?.last_login && (
              <p className="text-xs text-slate-500 mt-1">
                Último login: {new Date(user.last_login).toLocaleString("pt-BR")}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              value={user?.username || ""}
              disabled
              className="bg-slate-800/30 border-slate-700 opacity-60"
            />
            <p className="text-xs text-slate-500">
              O nome de usuário não pode ser alterado
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/50 border-slate-700"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
