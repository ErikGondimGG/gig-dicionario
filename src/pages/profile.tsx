import { Header } from "@/components/header";
import { BlurFade } from "@/components/ui/blur-fade";
import ProfileForm from "@/components/profile/ProfileForm";
import PasswordForm from "@/components/profile/PasswordForm";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Shield, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      <Header />

      <main className="pt-32 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Gerencie suas informações pessoais e configurações de conta
                </p>
              </div>
              <Badge
                variant={user?.role === "admin" ? "default" : "secondary"}
                className={
                  user?.role === "admin"
                    ? "bg-amber-600 hover:bg-amber-600"
                    : ""
                }
              >
                {user?.role === "admin" ? (
                  <>
                    <Shield className="mr-1 h-3 w-3" />
                    Administrador
                  </>
                ) : (
                  <>
                    <User className="mr-1 h-3 w-3" />
                    Usuário
                  </>
                )}
              </Badge>
            </div>
          </BlurFade>

          <div className="space-y-6">
            <BlurFade delay={0.2}>
              <ProfileForm />
            </BlurFade>

            <BlurFade delay={0.3}>
              <PasswordForm />
            </BlurFade>
          </div>
        </div>
      </main>
    </div>
  );
}
