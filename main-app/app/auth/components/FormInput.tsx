interface Props {
  name: string;
}

const FormInput = ({ name }: Props) => {
  return (
    <input
      required
      className="input input-secondary mb-3"
      type={name === "name" || "username" ? "text" : name}
      name={name}
      placeholder={name[0].toUpperCase() + name.slice(1)}
    />
  );
};

export default FormInput;
