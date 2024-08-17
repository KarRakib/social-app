import {authMiddleware} from '@clerk/nextjs'

export default authMiddleware({
    pulicRoutes:['/api/webhook']
});
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };
   