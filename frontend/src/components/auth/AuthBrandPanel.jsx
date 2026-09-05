const AuthBrandPanel = () => {
  return (
    <section className="flex flex-col justify-between bg-linear-to-br from-blue-800 to-cyan-700 h-full p-8 sm:p-12 ">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <span>▥</span>
        Bank
      </div>

      <div className="my-10 max-w-sm lg:my-0">
        <h1 className="text-4xl font-semibold leading-tight">
          Banking that 
          <br />
          moves with you 
        </h1>
        <p className="mt-5 leading-7 text-lg text-blue-50">
          Access your accounts, transfer
          <br />
          securely, and keep your financial
          life organised in one place.
        </p>

      </div>


      <div className=" lg:mt-55 flex items-center gap-2 text-sm text-blue-50">
        <span>♢</span>
        Protected with secure account access

      </div>

    </section>
  )
}

export default AuthBrandPanel
