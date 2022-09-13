import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import TextInput from "../components/TextInput";

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

function Home(): JSX.Element {
  const { mutateAsync: mutateUser } = useMutation("/api/users", createUser);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  async function onSubmit(values: FormValues) {
    mutateUser(values)
      .then(() => reset())
      .catch(() => alert("Error!"));
  }
  return (
    <div className="container mx-auto px-4">
      <h1 className="py-12 mt-8 text-4xl font-bold">Create user</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register("name", { required: true })} label="Name" />
        <TextInput {...register("email", { required: true })} label="Email" />
        <div className="text-right">
          <button
            className="rounded bg-indigo-600 text-white hover:bg-indigo-700 font-medium px-3 py-2"
            type="submit"
          >
            Create user
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
