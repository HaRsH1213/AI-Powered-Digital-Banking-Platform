const DashboardLayout = ({ children }) => {
  return (

    <main className="min-h-screen bg-slate-950 text-slate-100  ">


      <div className="mx-auto max-w-[1600px] min-h-screen grid lg:grid-cols-[250px_1fr]">


        {children}


      </div>


    </main>)
}

export default DashboardLayout
