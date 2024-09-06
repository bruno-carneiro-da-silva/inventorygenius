const Item: React.FC<{ number: number | undefined; text: string }> = ({
  number,
  text,
}) => {
  return (
    <div className="text-center">
      {number === undefined ? (
        <div className="animate-pulse bg-gray-200 h-10 w-16 mx-auto rounded-md"></div>
      ) : (
        <div className="text-primary-dark font-bold text-4xl">{number}</div>
      )}
      <div className="text-primary-dark font-extralight mt-2 text-lg">
        {text}
      </div>
    </div>
  );
};

export default Item;
