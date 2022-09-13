import Head from "next/head";
import CreateUserForm from "../components/sections/CreateUserForm";

function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Ho</title>
      </Head>
      <div className="min-h-screen bg-blue-100 pt-8">
        <div className="container mx-auto px-4">
          <h1 className="py-12 text-4xl font-bold">Create user</h1>
          <CreateUserForm />
        </div>
      </div>
    </>
  );
}

export default Home;
