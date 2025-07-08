import React from 'react'
import TextInput from '~/components/form/TextInput';
import Icon from '~/components/Icon';
import Panel from '~/components/surfaces/Panel';


export default function LoginForm() {

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would handle authentication here.
    // For this example, we'll just log the details to the console.
    // You could show a success message or redirect the user.
  };

  return (
    <Panel width='full' className='font-mono'>
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text dark:text-text-dark font-mono">Adeptus Munitorum</h1>
        <p className="text-text-secondary dark:text-text-secondary-dark mt-2 font-mono">Standard Issue Cogitator Access</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-6">

        {/* Email Input */}
        <TextInput
          type="email"
          id="email"
          placeholder="example@administratum.gov"
          label="Identification (Email)"
          required
          icon={<Icon path="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z" className=" text-text dark:text-text-dark" />}
        />
        {/* Password Input */}
        <TextInput
          type="password"
          id="password"
          placeholder="••••••••••••"
          label="Access Code (Password)"
          required
          icon={<span className="absolute inset-y-0 left-0 text-text-dark flex items-center pl-3">
            <Icon path="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z" />
          </span>}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark rounded focus:ring-[#8FB162] focus:ring-2 appearance-none checked:bg-[#8FB162] checked:border-transparent transition duration-300"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
              Retain Access Key
            </label>
          </div>
          <a href="#" className="text-sm text-secondary dark:text-secondary-dark hover:underline">
            Lost Access Code?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white cursor-pointer bg-primary dark:bg-primary-dark hover:bg-black- font-mono focus:ring-4 focus:outline-none focus:ring-[#8FB162]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
        >
          Authenticate
        </button>
      </form>

    </Panel >
  )
}
