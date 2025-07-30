import React from 'react';

const ChatSkeleton = () => (
  <section id='chat' className='w-full h-screen flex flex-col'>
    {/* Header Skeleton */}
    <div className='h-[62px] bg-white'></div>

    <div className='grid grid-cols-1 md:grid-cols-[1.3fr_3fr] gap-2 p-[10px] flex-1'>
      {/* MyChats Skeleton */}
      <div className='bg-white p-[15px] space-y-4 rounded-md  h-[86.5vh]'>
        {/* Header items */}
        <div className='h-6 w-28 bg-gray-100 rounded'></div>
        {[...Array(2)].map((_, i) => (
          <div className='flex items-center space-x-3 h-14 bg-gray-50 p-2 rounded' key={i}>
            <div className='h-10 w-10 bg-gray-100 rounded-full'></div>
            <div className='flex-1 h-4 bg-gray-100 rounded'></div>
          </div>
        ))}
      </div>

      {/* ChatBox Skeleton */}
      <div className='bg-white p-[15px] flex-col justify-end rounded-md md:flex hidden  h-[86.5vh]'>
     
        {/* Input area */}
        <div className='h-10 bg-gray-100 rounded mt-4'></div>
      </div>
    </div>
  </section>
);

export default ChatSkeleton;
