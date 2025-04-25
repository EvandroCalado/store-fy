import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-5'>
      <Loader className='size-20 animate-spin' />

      <h1 className='text-4xl font-semibold'>
        Store<span className='text-primary'>Fy</span>
      </h1>
    </div>
  );
};

export default Loading;
