interface IMessage {
  message: string;
}

const index: React.FC<IMessage> = (props) => {
  return <div className="mt-2 text-[#FF4444]">{props.message}</div>;
};

export default index;
