import Link from 'next/link';
export default function PrivacyPage() {
  return (
    <div className="container-custom max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0a192f' }}>Privacy Policy</h1>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        IC-MEMS 2027 collects personal information only for the purpose of conference registration, abstract submission, and official communications.
        Your data will not be shared with third parties without your consent, except as required for payment processing through the AIET portal.
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        All data is stored securely. You may contact us at <a href="mailto:icmems2027@gmail.com" className="text-teal-600 hover:underline">icmems2027@gmail.com</a> for any privacy-related queries.
      </p>
      <Link href="/" className="text-teal-600 hover:underline text-sm">&larr; Back to Home</Link>
    </div>
  );
}
