import { selectIsAuthenticated } from "@/app";
import { useAppSelector } from "@/hooks";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
    children?: React.ReactNode
}

export function ProtectedRoute({children}: Props) {

   const {search} = useLocation();
   const isAuthenticated = useAppSelector(selectIsAuthenticated);

   if(!isAuthenticated)
   {
    return <Navigate to={`/login${search}`}  replace />
   }

   
 return (
    <>{children}</>
  )
}
