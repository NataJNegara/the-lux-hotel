import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import { differenceInDays, parseISO } from "date-fns";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import CreateGuestForm from "../guests/CreateGuestForm";
import SliderComponent from "../../ui/SliderComponent";
import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";
import { useSettings } from "../settings/useSettings";

export default function CreateBookingForm({ onCloseModal }) {
  const [showCreateGuestForm, setShowCreateGuestForm] = useState(false);
  const [tempGuestName, setTempGuestName] = useState("");
  const [tempNationalId, setTempNationalId] = useState("");

  const { guests } = useGuests();
  const { cabins } = useCabins();
  const { settings } = useSettings();
  const { createBooking, isCreateBooking } = useCreateBooking();

  const cabinOptions = cabins?.map((cabin) => {
    return {
      label: `${cabin.name} - capacity ${cabin.maxCapacity}`,
      value: cabin.id,
    };
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();

  function onAddBooking(data) {
    if (!data.cabinId) return;

    const cabinPrice =
      cabins.find((cabin) => cabin.id === data.cabinId.value).regularPrice *
      countNights(data.endDate, data.startDate);

    const guestId = guests.find(
      (guest) => guest.nationalID.toLowerCase() === tempNationalId.toLowerCase()
    ).id;

    const numNights = countNights(data.endDate, data.startDate);
    const numGuests = data.numGuests + 1;
    const extrasPrice =
      (data.extrasPrice + settings.breakfastPrice * numNights) * numGuests;

    const newBooking = {
      startDate: data.startDate,
      endDate: data.endDate,
      numNights,
      numGuests,
      cabinPrice,
      totalPrice: cabinPrice + extrasPrice,
      status: "unconfirmed",
      hasBreakfast: data.hasBreakfast,
      isPaid: false,
      observations: data.observations,
      cabinId: data.cabinId.value,
      guestId,
      extrasPrice,
    };

    createBooking(newBooking, {
      onSuccess: () => {
        reset();
        onCloseModal();
        setTempGuestName("");
        setTempNationalId("");
      },
    });

    // console.log(newBooking);
  }

  function countNights(endDate, startDate) {
    return differenceInDays(parseISO(endDate), parseISO(startDate));
  }

  return (
    <>
      {!showCreateGuestForm && (
        <CreateGuestForm
          onCloseModal={onCloseModal}
          setShowCreateGuestForm={setShowCreateGuestForm}
          setTempGuestName={setTempGuestName}
          setTempNationalId={setTempNationalId}
        />
      )}

      {showCreateGuestForm && (
        <Form
          type={onCloseModal ? "modal" : "regular"}
          onSubmit={handleSubmit(onAddBooking)}>
          <FormRow label="Guest full name">
            <Input
              defaultValue={tempGuestName}
              id="guestId"
              disabled
              {...register("guestId")}
            />
          </FormRow>

          <FormRow label="Additional guest">
            <Controller
              control={control}
              name="numGuests"
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <>
                  <SliderComponent
                    id="numGuests"
                    axis={"x"}
                    xmax={settings.maxGuestsPerBooking - 1}
                    xmin={0}
                    xstep={1}
                    onChange={onChange}
                    value={value}
                    disabled={isCreateBooking}
                  />
                  <span>
                    {tempGuestName} + {value} Guests
                  </span>
                </>
              )}
            />
          </FormRow>

          <FormRow label="Check-in" error={errors?.startDate?.message}>
            <Input
              type="date"
              id="startDate"
              {...register("startDate", { required: "This field is required" })}
              disabled={isCreateBooking}
            />
          </FormRow>

          <FormRow label="Check-out" error={errors?.endDate?.message}>
            <Input
              type="date"
              id="endDate"
              {...register("endDate", { required: "This field is required" })}
              disabled={isCreateBooking}
            />
          </FormRow>

          <FormRow
            label="Cabin"
            error={errors.cabinId && "This field is required"}>
            <Controller
              name="cabinId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select
                  id="cabinId"
                  value={value}
                  options={cabinOptions}
                  onChange={onChange}
                  maxMenuHeight={200}
                  disabled={isCreateBooking}
                />
              )}
            />
          </FormRow>

          <FormRow label="Include Breakfast">
            <Input
              type="checkbox"
              id="hasBreakfast"
              {...register("hasBreakfast")}
              disabled={isCreateBooking}
            />
          </FormRow>

          <FormRow label="Observation">
            <Textarea
              type="text"
              id="observations"
              defaultValue=""
              {...register("observations")}
              disabled={isCreateBooking}
            />
          </FormRow>

          <FormRow label="Extras Price">
            <Input
              type="number"
              id="extrasPrice"
              defaultValue={0}
              {...register("extrasPrice", {
                valueAsNumber: true,
              })}
              disabled={isCreateBooking}
            />
          </FormRow>

          <FormRow>
            <Button
              type="reset"
              variation="secondary"
              onClick={onCloseModal}
              disabled={isCreateBooking}>
              Cancel
            </Button>
            <Button disabled={isCreateBooking}>Create new Booking</Button>
          </FormRow>
        </Form>
      )}
    </>
  );
}
