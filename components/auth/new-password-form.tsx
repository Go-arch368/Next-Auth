"use client"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition,useState } from "react"
import {useForm} from "react-hook-form"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "../ui/form"
import { NewPasswordSchema } from "@/schemas"
import { Input } from "../ui/input"
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { newPassword } from "@/actions/new-password"



export const NewPasswordForm = ()=>{
  
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [isPending,startTransition] = useTransition()
    const [error,setError] = useState<string|undefined>("")
    const [success,setSuccess] = useState<string|undefined>("")
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
         resolver:zodResolver(NewPasswordSchema),
         defaultValues:{
         password:""
         },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
      setError("");
      setSuccess("");

      console.log(values);
      

      startTransition(() => {
        newPassword(values,token)
            .then((data) => {
              setError(data?.error);
              setSuccess(data?.success)
            })
    });
    
  };
      
    return(
        <CardWrapper 
         headerLabel="Enter a new password"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
      
        > 
         <Form {...form}> 
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input  {...field} placeholder="******" type="password" disabled={isPending}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />
                
              
             </div>
             <FormError message={error}/>
             <FormSuccess message={success}/>
             <Button type="submit" className="w-full" disabled={isPending}>Reset password</Button>
           </form>
        </Form>
        </CardWrapper>
    )
}