import { APP_NAME } from "@/constants";
import { Container } from "./container";
import { useAppSelector } from "@/hooks";
import { selectIsAuthenticated } from "@/app";
import { ThemeToggle } from "@/features/theme";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { AccountDropdown } from "@/features/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";


export function NavOptions()
{
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    if(isAuthenticated)
    {
       return (
       <div className="flex items-center gap-3">
             <Button variant={"ghost"} onClick={() => navigate("/editor")}>
                 <Pencil className="h-4 w-4 mr-2" />
                 <span
                 className={pathname.startsWith("/editor")? "text-primary font-semibold": "text-muted-foreground"}
                >
                    Write
                </span>
             </Button>
             <AccountDropdown />
             <ThemeToggle />
        </div>
        );
    }

    return (
        <div className="flex items-center">
            <Button variant={"ghost"} onClick={()=> navigate("/")}>
                <span
                 className={pathname == "/" ? "text-primary font-semibold": "text-muted-foreground"}
                >
                    Home
                </span>
            </Button>
            <Button variant={"ghost"} onClick={()=> navigate("/login")}>
            <span
                 className={pathname.startsWith("/login")? "text-primary font-semibold": "text-muted-foreground"}
                >
                    Sign In
                </span>
            </Button>
            <Button variant={"ghost"} onClick={()=> navigate("/register")}>
            <span
                 className={pathname.startsWith("/register")? "text-primary font-semibold": "text-muted-foreground"}
                >
                    Sign up
                </span>
            </Button>
            <ThemeToggle />
       </div>
    )
}

export default function Navbar() {
   

  return (
    <nav className="px-4 xl:px-0 py-2">
        <Container>
            <div className="flex items-center justify-between">
                <Link to={`/`}>
                <h2 className="text-2xl text-primary font-semibold">{APP_NAME}</h2>
                </Link>
                <NavOptions />
            </div>
        </Container>
    </nav>
  )
}
