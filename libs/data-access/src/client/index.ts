import * as auth from "./modules/auth";
import * as leaderboard from "./modules/leaderboard";

export const client = {
  auth: {
    signUp: {
      useMutation: auth.useSignUpMutation,
      mutationFn: auth.signUp
    },
    signIn: {
      useMutation: auth.useSignInMutation,
      mutationFn: auth.signIn
    },
    signOut: {
      useMutation: auth.useSignOutMutation,
      mutationFn: auth.signOut
    },
    getActiveUser: {
      useSuspenseQuery: auth.useActiveUserQuery,
      queryFn: auth.getActiveUser
    }
  },
  leaderboard: {
    getAll: {
      useQuery: leaderboard.useLeaderboard,
      queryFn: leaderboard.getLeaderboard
    }
  }
};
