import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading: isSignup, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      // console.log(user);
      toast.success(
        "New user has been added, please verify your account from email"
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { isSignup, signup };
}
