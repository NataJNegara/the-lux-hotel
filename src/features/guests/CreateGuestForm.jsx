import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateGuest } from "./useCreateGuest";
import { countries } from "../../utils/countries";

const countryOptions = countries.map((country) => {
  return {
    label: country.label,
    value: country.label,
    flag: country.countryId,
  };
});

const schema = z.object({
  fullName: string().min(1, { message: "This field is required" }),
  email: string().email({ message: "Please input a valid email" }),
  nationality: string({ required_error: "This field is required" }),
  nationalID: string().min(1, { message: "This field is required" }),
});

export default function CreateGuestForm({
  onCloseModal,
  setShowCreateGuestForm,
  setTempGuestName,
  setTempNationalId,
}) {
  const { createGuest, isCreateGuest } = useCreateGuest();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const { field } = useController({ name: "nationality", control });

  const handleSelectChange = (option) => {
    field.onChange(option.value);
  };

  function onSubmit(data) {
    if (!field.value) return;
    const countryId = countryOptions
      .find((option) => option.label === field.value)
      .flag.toLocaleLowerCase();

    const countryFlag = `https://flagcdn.com/${countryId}.svg`;

    createGuest(
      { ...data, countryFlag },
      {
        onSuccess: () => {
          reset();
          setShowCreateGuestForm(true);
          setTempGuestName(data.fullName);
          setTempNationalId(data.nationalID);
        },
      }
    );
    // console.log({ ...data, countryFlag });
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Guest Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName")}
          disabled={isCreateGuest}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email")}
          disabled={isCreateGuest}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Select
          value={countryOptions.find((option) => option.value === field.value)}
          options={countryOptions}
          onChange={handleSelectChange}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          {...register("nationalID")}
          disabled={isCreateGuest}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={() => onCloseModal?.()}
          disabled={isCreateGuest}>
          Cancel
        </Button>
        <Button disabled={isCreateGuest}>Next</Button>
      </FormRow>
    </Form>
  );
}
