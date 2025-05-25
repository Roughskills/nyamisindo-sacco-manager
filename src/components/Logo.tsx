
interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-green-500 to-green-700 rounded-full p-2 shadow-lg`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Milk bottle */}
          <path 
            d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M7 6h10l1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L7 6z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.3"
          />
          {/* Milk level */}
          <path 
            d="M8 14h8" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          {/* Cooperative symbol - small circles around */}
          <circle cx="4" cy="8" r="1" fill="currentColor" />
          <circle cx="20" cy="8" r="1" fill="currentColor" />
          <circle cx="4" cy="16" r="1" fill="currentColor" />
          <circle cx="20" cy="16" r="1" fill="currentColor" />
        </svg>
      </div>
      {showText && (
        <div>
          <h2 className={`font-bold text-gray-900 ${textSizeClasses[size]} leading-tight`}>
            Nyamisindo SACCO
          </h2>
          <p className="text-xs text-gray-600 leading-tight">Dairy Cooperative</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
