import { Loader } from 'lucide-react';

export function AppLoader() {
  return (
    <div className="fixed flex items-center justify-center bg-background top-0 left-0 h-full w-full text-primary">
      <Loader className="h-6 w-6 animate-spin" />
    </div>
  );
}
