import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import TextInput from "../../atoms/TextInput";

interface FormValues {
  email: string;
  name: string;
}

async function createUser(values: FormValues) {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(values),
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      return res.json();
    } else {
      throw new Error("Error creating user");
    }
  });
}

export default function CreateUserForm(): JSX.Element {
  const { mutateAsync: mutateUser } = useMutation("/api/users", createUser);
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>();
  async function onSubmit(values: FormValues) {
    mutateUser(values)
      .then(() => reset())
      .catch(() => alert("Error!"));
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("name", { required: "Name is required" })}
        error={errors.name?.message}
        label="Name"
      />
      <TextInput
        {...register("email", { required: "Email is required" })}
        error={errors.email?.message}
        label="Email"
      />
      <div className="text-right">
        <button
          className="rounded bg-indigo-600 text-white hover:bg-indigo-700 font-medium px-3 py-2"
          type="submit"
        >
          Create user
        </button>
      </div>
    </form>
  );
}
