// components/BackButton.tsx
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleBackClick}
      className="flex items-center px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition duration-200"
    >
      <FaArrowLeft className="mr-2" />
      Back to Home
    </button>
  );
};

export default BackButton;
