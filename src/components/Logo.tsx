

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20", 
    lg: "w-28 h-28"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img 
          src="/lovable-uploads/c3c35b27-65da-447e-b4b5-c13552afad33.png"
          alt="Nyamisindo SACCO Logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className="text-center">
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

