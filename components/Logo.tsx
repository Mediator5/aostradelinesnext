const Logo = ({ variant = "dark", className = "" }: { variant?: "dark" | "light", className?: string }) => (
  <div className={`flex items-center select-none group cursor-pointer ${className || "h-8 md:h-10"}`}>
    <img
      src="/LOGO3.png"
      alt="AOS Tradelines Logo"
      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      style={{ height: '100%', width: 'auto', display: 'block' }}
    />
  </div>
);

export default Logo;
