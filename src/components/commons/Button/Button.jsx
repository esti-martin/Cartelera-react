import styles from './Button.module.css';

//Añadimos las props onClick, disabled y className para que el botón sea flexible y puedas controlar su comportamiento y estilos desde fuera.
//Children sigue permitiendo que el contenido sea dinámico.
function Button({ children, onClick, disabled = false, className="" }) {
  return (
    <button 
        className={`${styles.button} ${className}`}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
  );
}

export default Button;