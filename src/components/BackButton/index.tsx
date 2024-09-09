import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-2 flex flex-row items-center"
    >
      <MoveLeft className="w-6 h-6 text-primary-dark" />
    </button>
  );
};

export default BackButton;
