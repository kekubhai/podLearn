'use server';

import { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert('Sign up successful! Please check your email to confirm your account.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <div className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
}
