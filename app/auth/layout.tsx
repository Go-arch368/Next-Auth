const AuthLayout = ({children}:{children:React.ReactNode})=>{
  return(
    <div className="h-full flex items-center justify-center bg-sky-500 text-white">
        {children}
    </div>
  )
}

export default AuthLayout