const ErrorMessage = ({ message }) => {
  if (!message) return null; // don’t render anything if there’s no error

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded max-w-md mx-auto mt-4">
      {message}
    </div>
  );
};

export default ErrorMessage;
