import Image from 'next/image';
import AuthImg from '@assetImages/auth-image.png';

export default function Layout({children}: {children: React.ReactNode}) {
  // This component serves as a layout for the auth routes.

  return (
    <div className="grid md:grid-cols-2 h-screen bg-white overflow-hidden">
      <div className="hidden md:flex justify-center items-center">
        <Image src={AuthImg} alt="background" className="h-full" />
      </div>
      <div className="max-h-screen overflow-y-auto grid place-items-center">
        <div className="flex flex-col justify-center xl:min-w-[510px]">{children}</div>
      </div>
    </div>
  );
}
