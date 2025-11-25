import '../styles/Error.css';

const Error = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
