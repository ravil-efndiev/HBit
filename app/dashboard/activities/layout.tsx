const ActivitiesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="bg-gray-100 h-screen overflow-y-auto">{children}</div>;
};

export default ActivitiesLayout;
