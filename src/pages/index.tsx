import { User } from "@prisma/client";
import Head from "next/head";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaTrash } from "react-icons/fa";
import CreateUserForm from "../components/sections/CreateUserForm";

async function deleteUser(id: string) {
  return fetch(`/api/users/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status !== 200 && res.status !== 204) {
      throw new Error("Error deleting user");
    }
  });
}

function Home(): JSX.Element {
  const client = useQueryClient();
  const { data } = useQuery<User[]>("/api/users", () =>
    fetch("/api/users").then((res) => res.json())
  );
  const { mutate } = useMutation("/api/users", deleteUser, {
    onSuccess() {
      client.invalidateQueries("/api/users");
    },
  });
  return (
    <>
      <Head>
        <title>Ho</title>
      </Head>
      <div className="min-h-screen bg-blue-100 pt-8">
        <div className="container mx-auto px-4">
          <section>
            <h1 className="py-12 text-4xl font-bold">Create user</h1>
            <CreateUserForm />
          </section>
          <section>
            <h2 className="py-8 text-2xl font-bold">Created users</h2>
            <ul className="px-5 bg-blue-50 rounded">
              {data?.map((user) => (
                <li
                  className="flex align-center gap-4 py-4 border-b border-b-gray-300 last:border-none"
                  key={user.id}
                >
                  <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white capitalize text-4xl">
                    {user.name?.length ? user.name[0] : ""}
                  </div>
                  <div>
                    <p>{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div className="ml-auto">
                    <button
                      className="p-3 text-xl text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                      onClick={() => mutate(user.id)}
                    >
                      <span className="sr-only">Delete</span>
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
