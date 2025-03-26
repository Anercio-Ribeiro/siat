import { cookies } from 'next/headers';
import { lucia } from '@/lib/lucia';
import { RentalService } from '@/app/services/aluguelService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Extract page and pageSize from query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Validate session
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
      return new Response(null, { status: 401 });
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      cookies().delete(lucia.sessionCookieName);
      return new Response(null, { status: 401 });
    }

    // Use rental service
    const rentalService = new RentalService();
    const rentals = await rentalService.getRentalsByUserId(user.id, page, pageSize);
    const total = await rentalService.getTotalRentalsByUserId(user.id);
    const totalPages = Math.ceil(total / pageSize);

    const response = {
      rentals,
      total,
      totalPages,
      currentPage: page,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error retrieving user rentals:', error);
    return new Response(null, { status: 500 });
  }
}