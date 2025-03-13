"use client"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition,useState } from "react"
import {useForm} from "react-hook-form"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "../ui/form"
import { useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { LoginSchema } from "@/schemas"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import Link from "next/link"


export const LoginForm = ()=>{
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error")==="OAuthAccountNotLinked"?"Email already in use with differnent provider":""
    const [isPending,startTransition] = useTransition()
    const [showTwoFactor,setShowTwoFactor] = useState(false)
    const [error,setError] = useState<string|undefined>("")
    const [success,setSuccess] = useState<string|undefined>("")
    const form = useForm<z.infer<typeof LoginSchema>>({
         resolver:zodResolver(LoginSchema),
         defaultValues:{
         email:"",
         password:"",
         code:""
         },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("");
      startTransition(() => {
        login(values)
            .then((data) => {
              if(data?.error){
                form.reset()
                setError(data.error)
              }
              if(data?.success){
                form.reset();
                setSuccess(data.success)
              }
              if(data?.twoFactor){
                setShowTwoFactor(true)
              }
            })
            .catch(()=>setError("Something went wrong"))
    });
    
  };
      
    return(
        <CardWrapper 
         headerLabel="Welocome back"
         backButtonLabel="Don't have an account"
         backButtonHref="/auth/register"
         showSocial
        > 
         <Form {...form}> 
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             <div className="space-y-4">
              {showTwoFactor && (
                  <FormField
                  control={form.control}
                  name="code"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                            <Input  {...field} placeholder="123456"  disabled={isPending}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input  {...field} placeholder="johndoe@gmail.com" type="email" disabled={isPending}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="password"
                  render={({field})=>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input  {...field} placeholder="******" type="password" disabled={isPending}/>
                        </FormControl>
                        <Button size="sm" variant="link" asChild className="px-0 font-normal text-sm">
                           <Link href="/auth/reset">Forgot Password?</Link>
                        </Button>
                        <FormMessage/>
                    </FormItem>
                  )}
                /></>)}
             </div>
             <FormError message={error}/>
             <FormSuccess message={success}/>
             <Button type="submit" className="w-full" disabled={isPending}>{showTwoFactor?"Confirm":"Login"}</Button>
           </form>
        </Form>
        </CardWrapper>
    )
}