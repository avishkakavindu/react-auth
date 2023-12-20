'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

function LoginForm() {
  const { push } = useRouter();
  const cookies = new Cookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiErrors, setApiErrors] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setApiErrors(null);
    setIsLoading(true);
    try {
      // Send login data to the API endpoint
      const response = await axios.post('http://localhost:3002/v1/auth', data);
      if (response.data?.status === true && response.data?.node) {
        const { accessToken, refreshToken } = response.data.node;

        // Set tokens as HTTP-only cookies
        cookies.set('accessToken', accessToken, { path: '/' });
        cookies.set('refreshToken', refreshToken, {
          path: '/',
        });

        alert('Login successful!');
        push('/profile');
      } else {
        setApiErrors('Login failed');
      }
    } catch (error: any) {
      debugger;
      const errMsg = error.response?.data || 'Something went wrong';
      setApiErrors(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg rounded-lg border-t-4 border border-blue-500 p-4'>
        <h3 className='text-xl font-bold my-4'>SignIn</h3>

        <form
          className='flex flex-col gap-3 login'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor='email' className='text-sm'>
            Email
          </label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            className='border p-2'
            {...register('email', {
              required: 'Email is required',
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <p className='text-red-600'>{errors.email.message?.toString()}</p>
          )}

          <label htmlFor='password' className='text-sm'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='border p-2'
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className='text-red-600'>
              {errors.password.message?.toString()}
            </p>
          )}

          <button
            type='submit'
            className='bg-blue-500 text-white cursor-pointer px-6 py-2 rounded-md'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='flex my-4 items-center'>
          <span className='text-sm'>{`Don't have an account?`}</span>
          <Link href='/register'>
            <span className='text-blue-400 text-sm ml-1 underline'>SignUp</span>
          </Link>
        </div>

        {apiErrors && (
          <div className='bg-red-300 text-red-800 mt-4 p-4 text-sm'>
            {apiErrors}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
