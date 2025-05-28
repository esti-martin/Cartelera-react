//Importar hooksque permiten gestionar estado y efectos secundarios (como leer/escribir en localStorage)
import { useState, useEffect } from "react";

// Define el tipo de lo que devuelve el hook
type UseVisitedPagesReturn = {
  visited: number[];
  markAsVisited: (id: number) => void;
};

/*
- Defines un hook personalizado llamado useVisitedPages.
- Recibe un parámetro opcional key que es el nombre bajo el que se guardarán los datos en localStorage. Por defecto, será "visitedPages".
*/
function useVisitedPage(key = "visitedPages"): UseVisitedPagesReturn {
  /*
  - Crea una variable de estado llamada visited (un array de strings) y su función para actualizarla, setVisited.
  - Inicialmente, el array está vacío.
  */
  const [visited, setVisited] = useState<number[]>([]);

  // Para sincronizar cambios entre componentes
   useEffect(() => {
    const readVisited = () => {
      const stored = localStorage.getItem(key);
      setVisited(stored ? JSON.parse(stored) : []);
    };

    readVisited();
    window.addEventListener("storage", readVisited);
    window.addEventListener("focus", readVisited); // <-- ¡AQUÍ!

    return () => {
      window.removeEventListener("storage", readVisited);
      window.removeEventListener("focus", readVisited);
    };
   }, [key]);

  /*
  - Este useEffect se ejecuta una vez al montar el componente (o si cambia el key).
  - Intenta leer del localStorage usando la clave proporcionada.
  - Si encuentra datos, los convierte de string a array usando JSON.parse y los guarda en el estado visited.
  - Así, si recargas la página, los ids visitados se mantienen
  */
 /*
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setVisited(JSON.parse(stored));
  }, [key]);*/
  /*
  useEffect(() => {
  const readVisited = () => {
    const stored = localStorage.getItem(key);
    setVisited(stored ? JSON.parse(stored) : []);
  };
  readVisited();

  // Opcional: si quieres que también escuche el evento storage para otras pestañas
  window.addEventListener("storage", readVisited);
  return () => window.removeEventListener("storage", readVisited);
}, [key]);*/


  /*
    - Define una función markAsVisited que recibe un id (de la página/card).
    - Si ese id no está en el array visited:
        - Crea un nuevo array con el id añadido.
        - Actualiza el estado local con el nuevo array.
        - Guarda el array actualizado en localStorage como string.
    - Así, cada vez que visitas una página/card nueva, se recuerda para el futuro.
  */
  const markAsVisited = (id: number) => {
    const stored = localStorage.getItem(key);
    const current = stored ? JSON.parse(stored) : [];
    if (!current.includes(id)) {
      const updated = [...current, id];
      setVisited(updated);
      localStorage.setItem(key, JSON.stringify(updated));
    }
  };

  return { visited, markAsVisited };
}

// Devuelve el array de ids visitados (visited) y la función para marcar como visitado (markAsVisited), para que puedas usarlos en tus componentes.
export default useVisitedPage;
