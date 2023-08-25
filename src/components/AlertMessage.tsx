interface IAlertMessage {
  type: string;
  message: string;
}

const AlertMessage: React.FC<IAlertMessage> = ({ type, message }) => {
  return (
    <div
      className={`${
        type === "error" ? "bg-red-100 border-red-400 text-red-700" : ""
      } border px-4 py-3 mb-4 rounded relative`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default AlertMessage;
