import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logout, selectUsername } from '@/app';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function AccountDropdown() {
  const dispatch = useAppDispatch();

  const useName = useAppSelector(selectUsername);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link to={`/profile/${useName}`}>
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        </Link>
        <Link to={`/settings`}>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => dispatch(logout())}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
