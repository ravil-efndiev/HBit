export const formStyles = {
  content: "w-full max-w-md",
  title: "mb-5 text-2xl font-semibold sm:text-3xl",
  button: "btn btn-primary mb-4 w-full",
};

const FormLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-tl from-(--col-primary-muted) to-(--col-primary-light) p-4">
      <div className="flex w-full max-w-lg items-center justify-center rounded-xl bg-(--col-background) p-6 shadow-xl sm:p-8">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
