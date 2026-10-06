'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchCandidates = async (user: string, pass: string) => {
    setFetchLoading(true);
    try {
      const authHeader = 'Basic ' + Buffer.from(user + ':' + pass).toString('base64');
      const res = await fetch('/api/admin/candidates', {
        headers: {
          'Authorization': authHeader
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate');
      }
      setCandidates(data.candidates || []);
      setIsLoggedIn(true);
      setErrorMsg('');
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsLoggedIn(false);
    } finally {
      setFetchLoading(false);
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchCandidates(username, password);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              {errorMsg && (
                <div className="bg-red-50 text-red-700 p-3 rounded text-sm">
                  {errorMsg}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1">
                  <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1">
                  <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  {loading ? 'Authenticating...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Registered Candidates Dashboard</h1>
          <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Log Out
          </button>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {fetchLoading ? (
            <div className="p-8 text-center text-gray-500">Loading candidates...</div>
          ) : candidates.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No candidates registered yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category & Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paper ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Ref</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate, idx) => (
                    <tr key={candidate._id || idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(candidate.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{candidate.fullName}</div>
                        <div className="text-sm text-gray-500">{candidate.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {candidate.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {candidate.institution}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800 break-words max-w-[200px] whitespace-normal">
                          {candidate.category}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{candidate.presentationType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {candidate.paperId || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {candidate.paymentReference || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
