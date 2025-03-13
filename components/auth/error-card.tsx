
import { CardWrapper } from "./card-wrapper";
import { FaExclamation } from "react-icons/fa";

export const ErrorCard = ()=>{
    return(
       <CardWrapper
        headerLabel="Oops something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Back to Login"
       >
           <div className="w-full flex justify-center items-center"> 
             <FaExclamation className="text-destructive"/>
           </div>
       </CardWrapper>
    )
}