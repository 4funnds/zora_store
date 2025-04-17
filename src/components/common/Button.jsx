const Button = ({ 
    children, 
    variant = 'primary', 
    className = '', 
    ...props 
  }) => {
    const baseClasses = 'px-6 py-3 rounded-md font-medium transition-colors duration-200';
    
    const variantClasses = {
      primary: 'bg-rich-teal/75 hover:bg-opacity-90 hover:bg-rich-teal/35 hover:scale-98 transition-all text-deep-blue',
      secondary: 'border border-deep-blue text-deep-blue hover:bg-rich-teal/25 hover:scale-98 transtion-all',
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