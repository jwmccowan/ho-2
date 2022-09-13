import { useMutation, useQuery } from "react-query";

async function createUser(email: string) {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ email }),
  }).then((res) => res.json());
}

function Home(): JSX.Element {
  const { mutate: mutateUser } = useMutation("/api/posts", createUser);
  return (
    <div>
      <div>
        <button onClick={() => mutateUser("hello world")}>Create user</button>
      </div>
    </div>
  );
}

export default Home;
