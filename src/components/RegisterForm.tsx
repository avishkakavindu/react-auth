'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { IRegisterUserData } from '../interfaces/user.interface';
import { registerUser } from '../services/user.service';

function RegisterForm() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegisterUserData>();

  // keeps api errors
  const [apiErrors, setApiErrors] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Register user
   * @param {IRegisterUserData} data - Register form data
   */
  const onSubmit = async (data: IRegisterUserData) => {
    setApiErrors(null);
    setIsLoading(true);
    try {
      const response = await registerUser(data);

      if (response.status === true) {
        alert('Registered successfully!');
        push('/');
      } else {
        setApiErrors('Registration Failed');
      }
    } catch (error: any) {
      setApiErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  //  watching the input field named 'password' and retrieving its current value
  const password = watch('password', '');

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg rounded-lg border-t-4 border border-blue-500 p-4'>
        <h3 className='text-xl font-bold my-4'>SignUp</h3>

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

          <label htmlFor='username' className='text-sm'>
            Username
          </label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            className='border p-2'
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className='text-red-600'>
              {errors.username.message?.toString()}
            </p>
          )}

          <label htmlFor='password' className='text-sm'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='border p-2'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should have at least 6 characters',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                message:
                  'Password must have at least one lowercase letter, one uppercase letter, one number, and one special character',
              },
            })}
          />
          {errors.password && (
            <p className='text-red-600'>
              {errors.password.message?.toString()}
            </p>
          )}

          <label htmlFor='confirmPassword' className='text-sm'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='ConfirmPassword'
            className='border p-2'
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className='text-red-600'>
              {errors.confirmPassword.message?.toString()}
            </p>
          )}

          <button
            type='submit'
            className='bg-blue-500 text-white cursor-pointer px-6 py-2 rounded-md'
            disabled={isLoading}
          >
            Register
          </button>
        </form>

        <div className='flex my-4 items-center'>
          <span className='text-sm'>{`Don't have an account?`}</span>
          <Link href='/'>
            <span className='text-blue-400 text-sm ml-1 underline'>SignIn</span>
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

export default RegisterForm;
