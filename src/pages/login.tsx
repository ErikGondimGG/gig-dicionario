import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";

const LoginPage: React.FC = () => {
  return (
    <div className="flex z-50 fixed top-0 left-0 w-screen h-screen justify-center items-center">
      <BlurFade duration={2}>
        <MagicCard className="h-[300px] w-[250px] ">
          <h1 className="text-2xl font-bold">Login</h1>
        </MagicCard>
      </BlurFade>
    </div>
  );
};

export default LoginPage;
