import TopBar from "./components/TopBar";

const NotFoundPage = () => {
  return (
    <>
      <TopBar />
      <main>
        <h1 className="text-3xl mt-20 w-full text-center">
          Oops, this page doesn't exist
        </h1>
      </main>
    </>
  );
};

export default NotFoundPage;
