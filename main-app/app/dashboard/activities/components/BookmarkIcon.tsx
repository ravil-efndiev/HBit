interface Props {
  color: string;
}

const BookmarkIcon = ({ color = "#000" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
    >
      <path d="M4 0h22v30l-11-6-11 6V0z" fill={color} />
    </svg>
  );
};

export default BookmarkIcon;
