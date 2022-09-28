import { User } from "@prisma/client";
import { FaTrash } from "react-icons/fa";
import { useQueryClient, useQuery, useMutation } from "react-query";

async function deleteUser(id: string) {
  return fetch(`/api/users/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status !== 200 && res.status !== 204) {
      throw new Error("Error deleting user");
    }
  });
}

export default function UserList(): JSX.Element {
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
    <ul className="px-5 bg-blue-50 rounded">
      {data?.map((user) => (
        <li
          className="flex align-center gap-4 py-4 border-b border-b-gray-300 last:border-none"
          key={user.id}
        >
          <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white capitalize text-4xl">
            {user.name?.[0]}
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
              <FaTrash aria-roledescription="Trash can icon" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
