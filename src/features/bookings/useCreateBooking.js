import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isCreateBooking, mutate: createBooking } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("new booking has been added successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreateBooking, createBooking };
}
