export const formStyles = {
  content: "form w-[60%] max-md:w-3/4 max-sm:w-[90%]",
  title: "text-3xl font-semibold mb-5",
  button: "btn btn-primary w-[min(75%,200px)] mb-4",
};

const FormLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="absolute left-0 top-0 w-full h-full bg-linear-to-tl from-(--col-accent-mint) to-(--col-primary-light)">
      <div
        className="
          bg-(--col-background) w-1/2 h-3/4 absolute left-1/2 top-1/2 rounded-xl
          shadow-xl transform -translate-1/2 flex items-center justify-center
          max-md:w-[80%] max-sm:w-[90%]"
      >
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
