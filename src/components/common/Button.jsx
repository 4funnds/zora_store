const Button = ({ 
    children, 
    variant = 'primary', 
    className = '', 
    ...props 
  }) => {
    const baseClasses = 'px-6 py-3 rounded-md font-medium transition-colors duration-200';
    
    const variantClasses = {
      primary: 'bg-primary hover:bg-opacity-90 text-white',
      secondary: 'bg-white border border-primary text-primary hover:bg-primary hover:text-white',
      outline: 'bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white',
      text: 'text-primary hover:text-opacity-80'
    };
  
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;