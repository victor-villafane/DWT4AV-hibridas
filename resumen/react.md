# Apunte de React 🏆

## Índice 📚

1. [Introducción a React](#introducción-a-react)
2. [Preparando el Entorno (Node, NPM, Vite)](#preparando-el-entorno-node-npm-vite)
3. [Creando una App React con Vite](#creando-una-app-react-con-vite)
4. [JSX y Componentes](#jsx-y-componentes)
    - [JSX: Sintaxis y Uso](#41-jsx-sintaxis-y-uso)
    - [Componentes Funcionales (versus Clases)](#42-componentes-funcionales-versus-clases)
    - [Props y Comunicación entre Componentes](#43-props-y-comunicación-entre-componentes)
5. [Estado y Ciclo de Vida con Hooks](#estado-y-ciclo-de-vida-con-hooks)
    - [useState: Estado local](#51-usestate-estado-local)
    - [Manejo de Eventos y Actualización del Estado](#52-manejo-de-eventos-y-actualización-del-estado)
    - [useEffect: Efectos Secundarios](#53-useeffect-efectos-secundarios)
6. [Otros Hooks Útiles](#otros-hooks-útiles)
    - [useContext y la Context API](#61-usecontext-y-la-context-api)
    - [useRef: Referencias y Manipulación del DOM](#62-useref-referencias-y-manipulación-del-dom)
    - [useReducer: Manejo de Estado Complejo](#63-usereducer-manejo-de-estado-complejo)
    - [useMemo y useCallback: Optimización](#64-usememo-y-usecallback-optimización)
7. [React Router: Navegación en SPA](#react-router-navegación-en-spa)
    - [Configuración de React Router](#71-configuración-de-react-router)
    - [Definición de Rutas y Links](#72-definición-de-rutas-y-links)
    - [Parámetros de URL y Navegación Programática](#73-parámetros-de-url-y-navegación-programática)
8. [Buenas Prácticas y Tips Finales](#buenas-prácticas-y-tips-finales)
    - [Organización del Código y Proyecto](#81-organización-del-código-y-proyecto)
    - [Herramientas de Depuración](#82-herramientas-de-depuración)
    - [Próximos Pasos en el Ecosistema React](#83-próximos-pasos-en-el-ecosistema-react)

---

## Introducción a React

React es una biblioteca JavaScript para crear interfaces de usuario interactivas mediante componentes reutilizables. En otras palabras, nos permite construir las partes visuales de una aplicación web de forma declarativa. Creada por Facebook (hoy Meta) en 2013, React se ha convertido en la biblioteca más popular para front-end con un ecosistema enorme en 2025.

### ¿Por qué React?

- **Sintaxis JSX simple:** Escribir HTML dentro de JS hace el código más intuitivo.
- **Componentes reutilizables:** Encapsulas lógica y UI en piezas independientes.
- **Virtual DOM optimizado:** Actualiza la interfaz de forma eficiente.
- **Comunidad robusta:** Librerías, herramientas y soporte activo.

> **Analogía:** Piensa en React como Legoland: construyes una ciudad con piezas (componentes) reutilizables.

En resumen, React nos permite armar Single Page Applications (SPA) dinámicas donde la página no se recarga completa en cada interacción, sino que actualiza partes de la UI eficientemente.

---

## Preparando el Entorno (Node, NPM, Vite)

Antes de comenzar, asegúrate de tener:

- **Node.js (v18+ o v20 LTS):** Incluye npm.
- **Editor de código:** VS Code con extensiones como Prettier y ESLint.
- **Vite:** Herramienta moderna para crear y ejecutar proyectos React.

### ¿Por qué Vite?

- **Rápido:** Inicia proyectos en segundos.
- **Hot reload:** Recarga en caliente súper veloz.

---

## Creando una App React con Vite

### Pasos:

1. **Crear proyecto:**
    ```bash
    npm create vite@latest my-react-app -- --template react
    ```
2. **Instalar dependencias:**
    ```bash
    cd my-react-app
    npm install
    ```
3. **Arrancar servidor:**
    ```bash
    npm run dev
    ```

### Estructura inicial:

- `index.html`: HTML principal.
- `src/main.jsx`: Punto de entrada de React.
- `src/App.jsx`: Componente raíz.

---

## JSX y Componentes

### 4.1 JSX: Sintaxis y Uso

JSX (JavaScript XML) combina HTML y JavaScript. Ejemplo:

```jsx
const elemento = <h1>Hola Mundo</h1>;
```

#### Características:

- **Elemento padre único:** Usa `<div>` o fragmentos (`<> ... </>`).
- **Expresiones JS:** Usa `{}` para incluir variables o funciones.
- **Atributos especiales:** `className` en lugar de `class`, `htmlFor` en lugar de `for`.

---

### 4.2 Componentes Funcionales (versus Clases)

#### Componentes funcionales:

```jsx
const Bienvenida = () => <div>¡Hola chicos!</div>;
```

#### Componentes de clase (legado):

```jsx
class App extends React.Component {
  render() {
     return <h1>Hola</h1>;
  }
}
```

---

### 4.3 Props y Comunicación entre Componentes

#### Ejemplo:

```jsx
function TarjetaProducto({ nombre, precio }) {
  return (
     <div>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
     </div>
  );
}
```

---

## Estado y Ciclo de Vida con Hooks

### 5.1 useState: Estado local

```jsx
const [contador, setContador] = useState(0);
```

---

### 5.2 Manejo de Eventos y Actualización del Estado

```jsx
function NombreUsuario() {
  const [nombre, setNombre] = useState("");

  return (
     <div>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <p>Hola, {nombre}</p>
     </div>
  );
}
```

---

### 5.3 useEffect: Efectos Secundarios

```jsx
useEffect(() => {
  console.log("Componente montado");
}, []);
```

---

## Otros Hooks Útiles

### 6.1 useContext y la Context API

```jsx
const UsuarioContext = createContext(null);
const usuario = useContext(UsuarioContext);
```

---

### 6.2 useRef: Referencias y Manipulación del DOM

```jsx
const inputRef = useRef();
useEffect(() => inputRef.current.focus(), []);
```

---

### 6.3 useReducer: Manejo de Estado Complejo

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

---

### 6.4 useMemo y useCallback: Optimización

```jsx
const resultado = useMemo(() => calcularAlgoGrande(datos), [datos]);
```

---

## React Router: Navegación en SPA

### 7.1 Configuración de React Router

```bash
npm install react-router-dom
```

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

---

### 7.2 Definición de Rutas y Links

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

---

### 7.3 Parámetros de URL y Navegación Programática

```jsx
const { id } = useParams();
const navigate = useNavigate();
navigate("/dashboard");
```

---

## Buenas Prácticas y Tips Finales

### 8.1 Organización del Código y Proyecto

- **Un componente por archivo.**
- **Nombres claros.**
- **Keys únicas en listas.**

---

### 8.2 Herramientas de Depuración

- **React Developer Tools.**
- **Console.log y breakpoints.**

---

### 8.3 Próximos Pasos en el Ecosistema React

- **Next.js:** Server-Side Rendering.
- **Redux/Zustand:** Gestión global de estado.
- **React Query:** Fetching avanzado.
- **TypeScript:** Tipado estático.

---