import React, { useEffect, useState } from 'react'
import PersonajeCard from './components/PersonajeCard';
import PersonajeDetail from './components/PersonajeDetail';

const App = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPersonaje, setSelectedPersonaje] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://thesimpsonsapi.com/api/characters")
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          setError("No se pudo traer los datos de la api")
        }
      })
      .then(characters => {
        setPersonajes(characters.results)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Cargando.....</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      {
        selectedPersonaje &&
        <PersonajeDetail personajeSeleccionado={selectedPersonaje} />
      }
      {
        personajes.map(personaje => (
            <PersonajeCard
              onClick={() => setSelectedPersonaje(personaje)}
              key={personaje.id}
              personaje={personaje}
            />
        ))
      }
    </div>
  )
}

export default App