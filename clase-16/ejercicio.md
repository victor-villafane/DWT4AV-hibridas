# Lista de Usuarios con React

## Objetivo
Crear una aplicación React que consuma datos de una API, los liste y permita interactuar con ellos.

## Requisitos

### 1. API a utilizar
Debes consumir la siguiente API pública (pueden elegir otra):

```
https://jsonplaceholder.typicode.com/users
```

Esta API devuelve un array de 10 usuarios con la siguiente estructura:

- `id`: número
- `name`: nombre completo
- `username`: nombre de usuario
- `email`: correo electrónico
- `phone`: teléfono
- `address`: objeto con `city` (ciudad)
- `company`: objeto con `name` (nombre de la empresa)

### 2. Componentes requeridos

#### Componente Principal (`App`)
- Maneja el estado de la aplicación.
- Realiza la llamada a la API usando `useEffect`.
- Almacena los usuarios en el estado con `useState`.
- Maneja estados de carga y error.
- Pasa datos a los componentes hijos mediante props.

#### Componente de Tarjeta (`UserCard`)
- Recibe los datos de un usuario por props.
- Muestra información básica: nombre, username, email.
- Es clickeable para seleccionar el usuario.
- Recibe una función callback por props para manejar la selección.

#### Componente de Detalle (`UserDetail`)
- Recibe el usuario seleccionado por props.
- Muestra información detallada: nombre, email, teléfono, ciudad, empresa.
- Tiene un botón para cerrar/deseleccionar.
- Muestra un mensaje cuando no hay usuario seleccionado.

### 3. Funcionalidades requeridas

- **Carga de datos**  
    - Al cargar la aplicación, hacer fetch a la API.
    - Mostrar un mensaje de "Cargando..." mientras se obtienen los datos.
    - Manejar errores y mostrar un mensaje si algo falla.

- **Listado**  
    - Mostrar todos los usuarios en tarjetas.
    - Cada tarjeta debe mostrar al menos: nombre y email.

- **Interacción**  
    - Al hacer click en una tarjeta, mostrar los detalles completos del usuario.
    - Poder cerrar/deseleccionar el detalle del usuario.

- **Estados**  
    - Estado para almacenar los usuarios (`users`)
    - Estado para el usuario seleccionado (`selectedUser`)
    - Estado para loading (`loading`)
    - Estado para errores (`error`)

## Conceptos a practicar

- **useState**
    ```js
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    ```

- **useEffect**
    ```js
    useEffect(() => {
        // Hacer fetch aquí
        // Actualizar estados
    }, []); // Array vacío = se ejecuta solo al montar
    ```

- **Props**
    ```jsx
    // Pasar props
    <UserCard user={user} onSelect={handleSelect} />

    // Recibir props
    function UserCard({ user, onSelect }) {
        // usar user y onSelect
    }
    ```

## Estructura sugerida

```
App (componente principal)
├── UserCard (se repite por cada usuario)
└── UserDetail (detalle del usuario seleccionado)
```

## Bonus (opcional)
- Agregar estilos con CSS o Tailwind
- Agregar un contador de usuarios totales
- Implementar un filtro de búsqueda por nombre
- Agregar animaciones al seleccionar
- Mostrar un avatar con las iniciales del usuario

> **Tip:** Puedes probar la API en tu navegador pegando la URL para ver la estructura de los datos antes de comenzar a programar.