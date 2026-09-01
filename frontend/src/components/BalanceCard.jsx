const BalanceCard = () => {
  return (
    <section className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-900  p-6 sm:p-8">
      <p className=" text-sm text-blue-100/80">Total balance accross all accounts</p>


      <div className=" mt-3 flex flex-wrap items-center justify-between  ">
        <p className="text-4xl font-semibold tracking-tight sm:text-5xl">₹1,24,500.00</p>

        <span className="rounded-full bg-emerald-950/50 text-sm px-4 py-2 font-medium text-emerald-300"> ↗ +₹6,250 this month </span>
      </div>

    </section>
  )
}

export default BalanceCard
