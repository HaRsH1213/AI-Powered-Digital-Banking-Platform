const AuthPanel = ({children}) => {
  return (
    <section className=" flex flex-col justify-center p-6 sm:p-12 " aria-label="Sign In">
      {children}
    </section>
  )
}

export default AuthPanel
