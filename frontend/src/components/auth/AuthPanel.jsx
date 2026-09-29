const AuthPanel = ({children, isRegistering}) => {
  return (
    <section
      className={`flex flex-col p-6 sm:p-12 ${
        isRegistering ? "justify-start" : "justify-center"
      }`}
      aria-label="Sign In"
    >
      {children}
    </section>
  )
}

export default AuthPanel
