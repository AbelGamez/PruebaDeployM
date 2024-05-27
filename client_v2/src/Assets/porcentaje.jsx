function IconPercentage(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M18 17 A1 1 0 0 1 17 18 A1 1 0 0 1 16 17 A1 1 0 0 1 18 17 z" />
      <path d="M8 7 A1 1 0 0 1 7 8 A1 1 0 0 1 6 7 A1 1 0 0 1 8 7 z" />
      <path d="M6 18L18 6" />
    </svg>
  );
}

export default IconPercentage;