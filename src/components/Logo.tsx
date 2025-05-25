
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
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img 
          src="/lovable-uploads/c3c35b27-65da-447e-b4b5-c13552afad33.png"
          alt="Nyamisindo SACCO Logo"
          className="w-full h-full object-contain"
        />
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
