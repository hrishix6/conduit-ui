import { useRouteError } from "react-router-dom"

export function ErrorPage() {
    const error = useRouteError();
    console.log(error);

  return (
    <div className="h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Oops! Something isn't quite right.</h1>
    </div>
  )
}
