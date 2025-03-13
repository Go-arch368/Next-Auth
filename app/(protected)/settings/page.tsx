"use client"

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession,signOut } from "next-auth/react";
//import { logout } from "@/actions/logout";

const SettingsPage =  () => {
  const user = useCurrentUser()


  const onClick = ()=>{
      signOut()
  }

  return (
    <div className="bg-white p-10 rounded-xl">
     
      <form >
         <button type="submit" onClick={onClick}>Sign Out</button>
      </form>
    </div> 
  );
};

export default SettingsPage;
