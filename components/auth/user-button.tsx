"use client";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { 
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

export const UserButton = () => {
    const user = useCurrentUser()
    return (
       <DropdownMenu>
         <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image||""} alt="User Avatar" />
                <AvatarFallback className="bg-sky-500">
                    <FaUser  className="text-white"/>
                </AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-40" align="end">
           <LogoutButton>
            <DropdownMenuItem>
                <FaSignOutAlt className="h-4 w-4 mr-2"/>
                Logout
            </DropdownMenuItem>
           </LogoutButton>
         </DropdownMenuContent>
       </DropdownMenu>
    );
};
