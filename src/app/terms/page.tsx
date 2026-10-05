import Link from 'next/link';
export default function TermsPage() {
  return (
    <div className="container-custom max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#0a192f' }}>Terms of Use</h1>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        By using this website and submitting your abstract or registration through the IC-MEMS 2027 portal, you agree to provide accurate and complete information.
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Registration fees are non-refundable. Papers submitted must be original and unpublished.
        The organising committee reserves the right to modify programme and schedule details.
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        For queries, contact <a href="mailto:icmems2027@gmail.com" className="text-teal-600 hover:underline">icmems2027@gmail.com</a>.
      </p>
      <Link href="/" className="text-teal-600 hover:underline text-sm">&larr; Back to Home</Link>
    </div>
  );
}
