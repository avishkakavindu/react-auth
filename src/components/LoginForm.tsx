import Link from 'next/link';

function LoginForm() {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg rounded-lg border-t-4 border border-blue-500 p-4'>
        <h3 className='text-xl font-bold my-4'>SignIn</h3>

        <form className='flex flex-col gap-3 login'>
          <label htmlFor='email' className='text-sm'>
            Email
          </label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            className='border p-2'
          />

          <label htmlFor='password' className='text-sm'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='border p-2'
          />

          <button
            type='button'
            className='bg-blue-500 text-white cursor-pointer px-6 py-2 rounded-md'
          >
            Login
          </button>
        </form>

        <div className='flex my-4 items-center'>
          <span className='text-sm'>{`Don't have an account?`}</span>
          <Link href='/register'>
            <span className='text-blue-400 text-sm ml-1 underline'>SignUp</span>
          </Link>
        </div>

        <div className='bg-red-300 text-red-800 mt-4 p-4 text-sm'>Error</div>
      </div>
    </div>
  );
}

export default LoginForm;
