// import type { NextApiRequest, NextApiResponse } from 'next';
// import { createUser } from '@/lib/db'; // Adjust the path as needed
// import { hashPassword } from '@/lib/hashPassword';
// import { NextResponse } from 'next/server';

// type UserRequestBody = {
//   email: string;
//   password: string;
//   name: string;
//   role: 'USER' | 'ADMIN'; // Ensure this matches your Prisma schema's Role enum
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {

//     const { email, password, name, role }: UserRequestBody = req.body;

//     // Basic validation
//     if (!email || !password || !name || !role) {
//       return NextResponse.json({ message: 'Missing fields', status: 400 });
//     }

//     try {
//       // Hash the password before saving to the database
//       const hashedPassword = await hashPassword(password);

//       // Create the user
//       const newUser = await createUser({
//         email,
//         password: hashedPassword,
//         name,
//         role,
//       });

//       return NextResponse.json({ message: 'User created', user: newUser, status: 201 });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       return NextResponse.json({ message: 'Error creating user', status: 500 });
//     }

// }


import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/db'; // Adjust the path as needed
import { hashPassword } from '@/lib/hashPassword';
import { NextResponse } from 'next/server';

type UserRequestBody = {
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN'; // Ensure this matches your Prisma schema's Role enum
};

export async function POST(request: Request) {

    const body = await request.json();
    const { email, password, name, role }: UserRequestBody = body;

    // Basic validation
    if (!email || !password || !name || !role) {
      return NextResponse.json({ message: 'Missing fields', status: 400 });
    }

    try {
      // Hash the password before saving to the database
      const hashedPassword = await hashPassword(password);

      // Create the user
      const newUser = await createUser({
        email,
        password: hashedPassword,
        name,
        role,
      });

      return NextResponse.json({ message: 'User created', user: newUser, status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ message: 'Error creating user', status: 500 });
    }

}
