const ReferFriendsIcon = ({
  color = "currentColor",
  width = "38px",
  height = "38px",
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M29.9678 10.9783C29.9678 4.92482 25.0427 0 18.9896 0C12.9361 0 8.01128 4.92482 8.01128 10.9783C8.01128 14.7278 9.90125 18.0439 12.7778 20.0251C10.092 20.952 7.63004 22.4831 5.56177 24.5513C1.9752 28.1379 0 32.9067 0 37.9788H2.96701C2.96701 29.1442 10.1546 21.9566 18.9896 21.9566C25.0427 21.9566 29.9678 17.0318 29.9678 10.9783ZM18.9896 18.9896C14.5721 18.9896 10.9783 15.3958 10.9783 10.9783C10.9783 6.56082 14.5721 2.96701 18.9896 2.96701C23.4067 2.96701 27.0005 6.56082 27.0005 10.9783C27.0005 15.3958 23.4067 18.9896 18.9896 18.9896ZM38 27.2974L31.0168 34.2807L28.9186 32.1825L32.3945 28.7067H29.8212C26.2662 28.7067 23.3714 31.5992 23.3685 35.1542L23.3659 37.98L20.3988 37.9777L20.4012 35.1516C20.4055 29.9618 24.6313 25.7394 29.8212 25.7394H32.246L28.9186 22.412L31.0168 20.3142L38 27.2974Z"
        fill={color}
        stroke="#F3F6F8"
        strokeWidth="0.4"
      />
    </svg>
  );
};

export default ReferFriendsIcon;
