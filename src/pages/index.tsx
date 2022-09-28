import Head from "next/head";
import CreateUserForm from "../components/sections/CreateUserForm";
import UserList from "../components/sections/UserList";

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Chorez</title>
      </Head>
      <div className="min-h-screen bg-indigo-100 pt-8">
        <div className="container mx-auto px-4">
          <section>
            <h1 className="py-12 text-4xl font-bold">Create user</h1>
            <CreateUserForm />
          </section>
          <section>
            <h2 className="py-8 text-2xl font-bold">Created users</h2>
            <UserList />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
