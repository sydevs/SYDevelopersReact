export default function Page() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 border-b pb-4 text-3xl font-bold">Policies</h1>
      <p className="mb-8">This page provides the required privacy and terms of service policies.</p>

      <h2 className="mb-3 text-xl font-semibold">Privacy Policy</h2>
      <p className="mb-3">
        Payment processing for donating via <strong>www.sydevelopers.com</strong> is handled by
        Stripe, Inc.
      </p>
      <p className="mb-3">
        No private information is stored by <strong>www.sydevelopers.com</strong> (in fact this
        website has no database). All data handled for the purposes of payment processing is stored
        by Stripe, Inc. and handled in accordance with their{' '}
        <a href="https://stripe.com/gb/privacy" className="text-indigo-600 hover:underline">
          privacy policy.
        </a>
      </p>
      <p className="mb-8">
        Data stored by Stripe is requested by <strong>www.sydevelopers.com</strong> in order to
        display the most recent donations. No personal information is displayed.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Terms of Service</h2>
      <p className="mb-3">No service is offered in exchange for the donations given.</p>
      <p className="mb-3">
        You will always be able to cancel your recurring donations through this site. If you have
        any trouble, please write to us at{' '}
        <a href="mailto:contact@sydevelopers.com" className="text-indigo-600 hover:underline">
          contact@sydevelopers.com
        </a>
      </p>
    </div>
  )
}
