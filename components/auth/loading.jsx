import Image from "next/image";

const Loading = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <Image
        src='/logo.svg'
        alt='logo'
        width={100}
        height={100}
        className='animate-pulse duration-700'
      />
    </div>
  );
};

export default Loading;
