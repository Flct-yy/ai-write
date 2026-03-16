import { Bot, Loader2 } from "lucide-react";
import { useLocale } from "/@/hooks/use-locale";
import { Button } from "/@/components/inputs/button";

const LoadingScreen = ({ isError }: { isError: boolean }) => {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto">
          <Bot className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm text-muted-foreground">
              {t('loading')}
            </p>
          </div>
        </div>
        {isError && (
          <Button onClick={() => window.location.reload()}>
            {t('reload')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;