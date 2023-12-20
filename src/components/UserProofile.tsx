'use client';

interface IUserProfileProps {
  email: string;
  username: string;
  handleLogout: () => never;
}

function UserProfile(props: IUserProfileProps) {
  const { email = '', username = '', handleLogout } = props;

  return (
    <div className='grid place-items-center h-screen sm:min-w-[500px]'>
      <div className='shadow-lg rounded-lg border-t-4 border border-blue-500 p-4'>
        <h3 className='text-xl font-bold my-4'>User Profile</h3>

        <div className='flex flex-col gap-3'>
          <div>
            <span className='font-semibold'>Email:</span> {email}
          </div>
          <div>
            <span className='font-semibold'>Username:</span> {username}
          </div>
          <button
            type='button'
            className='bg-red-400 text-white rounded-md p-2'
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
