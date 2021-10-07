export const Title = (props) => {
  return <div className="font-sans text-4xl font-bold">{props.children}</div>;
};

export const Subtitle = (props) => {
  return (
    <div className="font-sans text-xl text-gray-700">{props.children}</div>
  );
};

export const Textbox = (props) => {
  return (
    <div>
      <label className="text-gray-600">{props.label}</label>
      <input
        type="text"
        className="w-full mt-1 px-4 py-2 shadow-md focus:shadow-none border rounded-md text-gray-700 focus:outline-none focus:border-blue-600"
        {...props}
      />
    </div>
  );
};

export const Textarea = (props) => {
  return (
    <div>
      <label className="text-gray-600">{props.label}</label>
      <textarea
        type="text"
        className="w-full resize-none mt-1 px-4 py-2 shadow-md focus:shadow-none border rounded-md text-gray-700 focus:outline-none focus:border-blue-600"
        rows="5"
        {...props}
      />
    </div>
  );
};

export const Button = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-200 ${
        props.disabled && "cursor-not-allowed"
      }`}
      disabled={props.disabled}
    >
      {props.disabled && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {props.label}
    </button>
  );
};

export const Badge = (props) => {
  const sizeChart = {
    small: "text-sm py-1 px-2",
    regular: "py-1 px-3",
    medium: "text-md py-2 px-4",
    large: "text-lg py-2 px-4",
  };

  return (
    <span
      className={`${
        sizeChart[props.size]
      } font-semibold inline-block rounded-full mt-2 mb-2 text-${
        props.textColor
      } bg-${props.bgColor}`}
    >
      {props.label}
    </span>
  );
};

export const Progress = (props) => {
  return (
    <div className="relative transition ease-in duration-500">
      <div
        className={`overflow-hidden h-3 text-xs flex rounded-full bg-${props.bgColor}`}
      >
        <div
          style={{ width: `${props.value}%` }}
          className={`shadow-none flex flex-col text-center rounded-full whitespace-nowrap text-white justify-center bg-${props.barColor}`}
        ></div>
      </div>
    </div>
  );
};
