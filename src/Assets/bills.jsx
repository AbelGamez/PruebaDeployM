function IconBillLine(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M20 22H4a1 1 0 01-1-1V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1zm-1-2V4H5v16h14zM8 9h8v2H8V9zm0 4h8v2H8v-2z" />
    </svg>
  );
}

export default IconBillLine;