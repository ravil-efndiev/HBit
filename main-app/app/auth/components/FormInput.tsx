interface Props {
  name: string;
}

const FormInput = ({ name }: Props) => {
  const label = name[0].toUpperCase() + name.slice(1);

  return (
    <input
      id={name}
      required
      className="input input-secondary mb-3 w-full"
      type={name === "name" || name === "username" ? "text" : name}
      name={name}
      placeholder={label}
      aria-label={label}
    />
  );
};

export default FormInput;
