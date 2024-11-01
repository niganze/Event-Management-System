
// "use client"; 

// import { useRouter } from 'next/navigation'; 
// import React, { useState } from 'react'; 

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => { 
//     e.preventDefault();
//     const res = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     });
//     if (res.ok) {
//       router.push('/admin');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
//       <form onSubmit={handleLogin} className="flex flex-col gap-2">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           className="border p-2"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="border p-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react'; 
import { UserIcon, LockClosedIcon } from '@heroicons/react/outline'; 
import '../../../globals.css'


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => { 
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Left side for the illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-white justify-center items-center">
        <img 
          src="https://niganzealain.vercel.app/assets/login-CUyTes9e.png" 
          alt="Login Illustration" 
          className="w-3/4 h-auto" 
        />
      </div>

      {/* Right side for the login form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Welcome Back</h1>
        <p className="text-center mb-4 text-gray-400">Please enter your credentials to log in.</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">Username</label>
            <div className="flex items-center border border-gray-500 rounded-lg p-1 bg-black">
              <UserIcon className="w-6 h-6 text-[#0A1F95] mr-2" />
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="flex-1 p-4 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#0A1F95]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">Password</label>
            <div className="flex items-center border border-gray-500 rounded-lg p-1 bg-black">
              <LockClosedIcon className="w-6 h-6 text-[#0A1F95] mr-2" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1 p-4 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#0A1F95]"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="bg-[#0A1F95] text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-center items-center mt-6">
          <span className="text-sm text-gray-400">Or log in with:</span>
          <button className="flex items-center justify-center bg-gray-800 p-2 rounded-md ml-4 hover:bg-gray-700 transition duration-200">
            <UserIcon className="w-6 h-6 text-[#0A1F95]" />
            <span className="text-white ml-2">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
