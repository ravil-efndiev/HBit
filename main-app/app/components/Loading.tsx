interface Props {
  className?: string;
  label?: string;
}

const Loading = ({ label = "Loading", className = "" }: Props) => {
  return (
    <div className={`flex items-center justify-center ${className}`} role="status">
      <div
        className="size-8 animate-spin rounded-full border-4 border-(--col-primary-light) border-t-(--col-primary-dark)"
        aria-label={label}
      />
    </div>
  );
};

export default Loading;
