const AccountDetails = ({account}) => {
  return (
    <section className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
      {/* Section Heading */}
      <h2 className="text-2xl font-semibold">
        Account details
      </h2>

      <p className="mt-1 text-slate-400">
        Details for {account.accountName}
      </p>

      {/* Details list */}
      <dl className="mt-6 grid gap-x-10 md:grid-cols-2">
        <div className="flex justify-between gap-4 py-4 border-b border-slate-500">
          <dt className="text-slate-400">

            Account Number

          </dt>
          
          <dd className="text-right font-medium">
            {account.accountNumber}
          </dd>

        </div>
        <div className="flex justify-between gap-4 py-4 border-b border-slate-500">

          <dt className="text-slate-400">

            Status

          </dt>
          
          <dd className=" rounded-lg px-3 py-1 bg-emerald-500/15 text-sm font-medium text-emerald-400">
            {account.status}
          </dd>
        </div>


        <div className="flex justify-between gap-4 py-4 border-b border-slate-500">
          <dt className="text-slate-400">

            IFSC Code

          </dt>
          
          <dd className="text-right font-medium">
            {account.ifscCode}
          </dd>
        </div>
        <div className="flex justify-between gap-4 py-4 border-b border-slate-500">
          <dt className="text-slate-400">

            Account Type

          </dt>
          
          <dd className="text-right font-medium">
            {account.accountType}
          </dd>
        </div>
        <div className="flex justify-between gap-4 py-4 border-b border-slate-500">
          <dt className="text-slate-400">

            Opened Date

          </dt>
          
          <dd className="text-right font-medium">
            {account.createdAt}
          </dd>
        </div>
      </dl>

    </section>
  )
}

export default AccountDetails
