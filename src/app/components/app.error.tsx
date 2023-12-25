interface ErrorProps {
  message?: string;
}

export function AppError({
  message = "Oops, Something isn't right.",
}: ErrorProps) {
  return (
    <div className="fixed flex flex-col gap-2 items-center justify-center bg-background top-0 left-0 h-full w-full text-destructive">
      <h3 className="font-semibold p-2 border border-muted bg-accent">
        {message}
      </h3>
    </div>
  );
}
