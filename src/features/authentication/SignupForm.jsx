import { useForm } from "react-hook-form";

import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/
// test : /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const { isSignup, signup } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              // value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please input a valid email address",
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 caharcters",
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password is not matched",
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isSignup}
          onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
