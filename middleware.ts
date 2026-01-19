import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // future logic (role, permission) এখানে যোগ করা যাবে
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // token থাকলে logged in
      },
    },
  }
);

export const config = {
  matcher: [
    "/my-bookings/:path*",
    "/services/:path*/booking",
  ],
};
