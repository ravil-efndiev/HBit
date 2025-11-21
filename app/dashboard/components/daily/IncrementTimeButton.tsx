interface Props {
  currentValueMs: number;
  amountMs: number;
  onIncrement: (newValueMs: number) => void;
}

const IncrementTimeButton = ({
  currentValueMs,
  amountMs,
  onIncrement,
}: Props) => {
  const display =
    amountMs >= 1000 * 60 * 60
      ? `${Math.floor(amountMs / (1000 * 60 * 60))}h`
      : `${Math.floor(amountMs / (1000 * 60))}m`;

  return (
    <button
      className="btn btn-ghost text-(--col-text-secondary)"
      onClick={() => onIncrement(currentValueMs + amountMs)}
    >
      {display}
    </button>
  );
};

export default IncrementTimeButton;
