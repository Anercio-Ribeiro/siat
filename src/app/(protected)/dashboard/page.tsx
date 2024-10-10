import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";

export default function DashboardPage() {

  return (
    <PageWithBreadcrumb
      title="Dashboard"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard" },
      ]}
    >
      {/* Conteúdo do dashboard será renderizado aqui */}
      <p>Welcome to the dashboard!</p>
    </PageWithBreadcrumb>
  );
}




///


// import SignOutButton from '@/components/SignOutButton'
// import { getUser } from '@/lib/lucia'
// import Image from 'next/image'
// import { redirect } from 'next/navigation'
// import React from 'react'

// const DashboardPage = async () => {
//     // protected!!!
//     const user = await getUser()
//     if (!user) {
//         redirect('/authenticate')
//     }
//     return (
//         <>
//             <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
//                 <div className="flex items-center gap-2 border p-4 rounded-lg bg-gray-100 transition-all cursor-pointer hover:shadow-xl">
//                     {user.picture && (
//                         <Image src={user.picture} className='rounded-full size-16' height={40} width={40} />
//                     )}
//                     <div className="flex flex-col">
//                         <span className='font-semibold text-xl'>{user.name}</span>
//                         <span className='text-gray-500'>{user.email}</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="absolute right-4 top-4">
//                 <SignOutButton >Sign Out</SignOutButton>
//             </div>
//         </>
//     )
// }

// export default DashboardPage



// import SignOutButton from '@/components/SignOutButton';
// import { Button } from '@/components/ui/button';
// import { getUser } from '@/lib/lucia';
// import Image from 'next/image';
// import { redirect } from 'next/navigation';
// import React from 'react';

// const DashboardPage = async () => {
//     // Check user authentication
//     const user = await getUser();
//     if (!user) {
//         redirect('/authenticate');
//     }

//     return (
//         <div className='relative'>
//             <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
//                 <div className="flex items-center gap-2 border p-4 rounded-lg bg-gray-100 transition-all cursor-pointer hover:shadow-xl">
//                     {user.picture && (
//                         <Image src={user.picture} className='rounded-full' height={40} width={40} alt={''} />
//                     )}
//                     <div className="flex flex-col">
//                         <span className='font-semibold text-xl'>{user.name}</span>
//                         <span className='text-gray-500'>{user.email}</span>
//                         <span>{user.role }</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="absolute right-4 top-4">
//                 <SignOutButton>Sign Out</SignOutButton>
//             </div>

//             {/* Role-based buttons */}
//             <div className="">
//                 {user.role === 'INQUILINO' && (
//                     <Button variant="outline">Inquilino</Button>
//                 )}
//                 {user.role === 'PROPRIETARIO' && (
//                     <Button variant="outline">Proprietário</Button>
//                 )}
//                 {user.role === 'ADMIN' && (
//                     <Button variant="outline">Admin</Button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;

