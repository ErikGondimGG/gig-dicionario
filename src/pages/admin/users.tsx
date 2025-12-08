import { useState } from "react";
import { Header } from "@/components/header";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UsersTable from "@/components/admin/UsersTable";
import UserFormDialog from "@/components/admin/UserFormDialog";
import { Plus, Search, Users } from "lucide-react";

export default function AdminUsersPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      <Header />

      <main className="pt-32 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-600/20">
                  <Users className="h-6 w-6 text-amber-500" />
                </div>
                <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Administre os usuários do sistema, suas permissões e credenciais
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar usuários..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700"
                />
              </div>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Usuário
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <UsersTable />
          </BlurFade>
        </div>
      </main>

      <UserFormDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSuccess={() => {
          setShowCreateDialog(false);
          window.location.reload();
        }}
      />
    </div>
  );
}
