# 🧭 Apunte de **React Router**  

---

## Índice

1. [Setup con Vite (React plano)](#setup-con-vite-react-plano)  
2. [Qué es React Router (data routers)](#qué-es-react-router-data-routers)  
3. [Conceptos clave (Resumen)](#conceptos-clave-versión-corta)  
4. [Estructura sugerida de carpetas](#estructura-sugerida-de-carpetas)  
5. [Tu primer enrutador de datos (root + hijos)](#tu-primer-enrutador-de-datos-root--hijos)  
6. [Loaders: leer datos antes de renderizar](#loaders-leer-datos-antes-de-renderizar)  
7. [Actions y `<Form>`: escribir datos sin `onSubmit`](#actions-y-form-escribir-datos-sin-onsubmit)  
8. [Manejo de errores (`errorElement`, `useRouteError`)](#manejo-de-errores-errorelement-userouteerror)  
9. [Navegación: `Link`, `NavLink`, `useNavigate`, `useNavigation`](#navegación-link-navlink-usenavigate-usenavigation)  
10. [Rutas protegidas (auth) con loaders](#rutas-protegidas-auth-con-loaders)  
11. [Defer y `Suspense` para cargas parciales](#defer-y-suspense-para-cargas-parciales)  
12. [Código dividido: `lazy()` en rutas](#código-dividido-lazy-en-rutas)  
13. [Scroll restoration y títulos de página](#scroll-restoration-y-títulos-de-página)  
14. [Resumen de Hooks de React (cheat-sheet)](#resumen-de-hooks-de-react-cheat-sheet)  
15. [Contexto rápido para estado global liviano](#contexto-rápido-para-estado-global-liviano)  
16. [Variables de entorno en Vite (`import.meta.env`)](#variables-de-entorno-en-vite-importmetaenv)  
17. [Tips de performance y buenas prácticas](#tips-de-performance-y-buenas-prácticas)  
18. [Mini-proyecto: “Contactos” CRUD con loader/action](#mini-proyecto-contactos-crud-con-loaderaction)  
20. [Errores típicos y cómo resolverlos](#errores-típicos-y-cómo-resolverlos)

---

## Setup con Vite (React plano)

```bash
# 1) Crear proyecto
npm create vite@latest mi-app -- --template react

cd mi-app
npm install

# 2) React Router
npm i react-router-dom

# 3) Ejecutar en dev
npm run dev
```

- **Entrada**: `src/main.jsx`  
- **Componente raíz**: `src/App.jsx` (usaremos un root layout con `<Outlet/>`)  
- **Vite** usa `import.meta.env` para variables (ver sección 16).

---

## Qué es React Router (data routers)

- **SPA** con páginas simuladas por **rutas** (URL) del lado del cliente.  
- Desde v6.4+ trae **Data APIs**: **loaders** (para *leer* datos antes de renderizar), **actions** (para *escribir* datos), y **`<Form>`** que envía al **action** sin `onSubmit`.  
- Maneja **errores** por ruta con `errorElement`, **navegación pendiente** con `useNavigation`, **redirecciones** y **cargas diferidas** con `defer()`.

---

## Conceptos clave (Resumen)

- `createBrowserRouter(routes)`: crea el router con **objetos de ruta**.  
- `RouterProvider`: monta el router.  
- `loader()`: async → devuelve datos, accedés con `useLoaderData()`.  
- `action()`: async → procesa POST/PUT/PATCH/DELETE; resultado con `useActionData()` o redirección.  
- `<Form method="post">`: dispara el `action` de la ruta actual o la ruta `action` de `action="/ruta"`.  
- `useNavigation()`: estado de navegación (idle/loading/submitting).  
- `useRouteError()`: leer error lanzado en loader/action.  
- `redirect("/path")`: redireccionar desde loader/action.  
- `defer({ clave: promesa })`: streaming parcial + `<Suspense>`.

---

## Estructura sugerida de carpetas

```
src/
  main.jsx
  routes/
    root.jsx         # layout, nav, <Outlet/>
    home.jsx
    contactos/
      list.jsx
      detalle.jsx
      editar.jsx
  services/
    api.js           # fetchers (GET/POST/PUT/DELETE)
  context/
    auth.jsx         # AuthContext para ejemplo
```

---

## Tu primer enrutador de datos (root + hijos)

**`src/main.jsx`**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.jsx'
import Home from './routes/home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Ups, algo salió mal.</div>,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <div>Acerca de</div> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

**`src/routes/root.jsx`**
```jsx
import { Outlet, NavLink } from 'react-router-dom'

export default function Root() {
  return (
    <div>
      <nav style={{display:'flex', gap:12}}>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/about">Acerca</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}
```

**`src/routes/home.jsx`**
```jsx
export default function Home() {
  return <h1>Hola React Router 👋</h1>
}
```

---

## Loaders: leer datos antes de renderizar

**Idea:** la ruta define un `loader()` que **precarga** datos. El componente usa `useLoaderData()`.

**`src/services/api.js`**
```jsx
const API = 'https://jsonplaceholder.typicode.com'

export async function getPosts() {
  const res = await fetch(`${API}/posts?_limit=5`)
  if (!res.ok) throw new Response('Error al traer posts', { status: res.status })
  return res.json()
}
```

**`src/routes/posts.jsx`**
```jsx
import { useLoaderData } from 'react-router-dom'
import { getPosts } from '../services/api'

export async function loader() {
  const posts = await getPosts()
  return { posts }
}

export default function Posts() {
  const { posts } = useLoaderData()
  return (
    <>
      <h2>Posts</h2>
      <ul>
        {posts.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    </>
  )
}
```

**Agregar la ruta** en `main.jsx`:
```jsx
import Posts, { loader as postsLoader } from './routes/posts.jsx'

...
children: [
  { index: true, element: <Home /> },
  { path: 'about', element: <div>Acerca de</div> },
  { path: 'posts', element: <Posts />, loader: postsLoader },
]
...
```

---

## Actions y `<Form>`: escribir datos sin `onSubmit`

**`src/services/api.js`**
```jsx
export async function createPost(data) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Response('No se pudo crear', { status: res.status })
  return res.json()
}
```

**`src/routes/nuevo-post.jsx`**
```jsx
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createPost } from '../services/api'

export async function action({ request }) {
  const form = await request.formData()
  const title = form.get('title')?.trim()
  const body = form.get('body')?.trim()

  if (!title || !body) {
    return { error: 'Título y cuerpo son obligatorios' }
  }

  await createPost({ title, body })
  return redirect('/posts')
}

export default function NuevoPost() {
  const data = useActionData()
  const nav = useNavigation()
  const loading = nav.state === 'submitting'

  return (
    <div>
      <h2>Nuevo Post</h2>
      {data?.error && <p style={{color:'tomato'}}>{data.error}</p>}
      <Form method="post">
        <input name="title" placeholder="Título" />
        <br />
        <textarea name="body" placeholder="Contenido..." rows={4} />
        <br />
        <button disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </Form>
    </div>
  )
}
```

**Agregar la ruta**:
```jsx
import NuevoPost, { action as nuevoPostAction } from './routes/nuevo-post.jsx'

{ path: 'posts/new', element: <NuevoPost />, action: nuevoPostAction },
```

---

## Manejo de errores (`errorElement`, `useRouteError`)

```jsx
// src/routes/error-boundary.jsx
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return <h3>Error {error.status}: {error.statusText}</h3>
  }
  return <h3>Ups: {error.message ?? 'Error desconocido'}</h3>
}
```

Usalo en tu ruta:
```jsx
import ErrorBoundary from './routes/error-boundary.jsx'

{
  path: '/',
  element: <Root />,
  errorElement: <ErrorBoundary />,
  children: [ ... ],
}
```

---

## Navegación: `Link`, `NavLink`, `useNavigate`, `useNavigation`

- **`<Link to="/ruta">`**: navegar sin recargar.  
- **`<NavLink>`**: igual que `Link` pero con estado “activo”.  
- **`useNavigate()`**: navegar por código (`navigate(-1)`, `navigate('/x')`).  
- **`useNavigation()`**: saber si se está **cargando** o **enviando**.

```jsx
import { Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
```

---

## Rutas protegidas (auth) con loaders

**Idea:** en el `loader` verificás si hay sesión. Si no, `redirect('/login')`.

```jsx
// src/routes/privado.jsx
import { useLoaderData, redirect } from 'react-router-dom'
import { getSession } from '../services/session'

export async function loader() {
  const user = await getSession()
  if (!user) return redirect('/login')
  return { user }
}

export default function Privado() {
  const { user } = useLoaderData()
  return <h2>Hola {user.name}, zona privada 🔒</h2>
}
```

---

## `defer` y `Suspense` para cargas parciales

```jsx
// loader
import { defer } from 'react-router-dom'
export async function loader() {
  const rapido = await fetch('/api/fast').then(r=>r.json())
  const lento = fetch('/api/slow').then(r=>r.json()) // no esperamos
  return defer({ rapido, lento })
}

// componente
import { Await, useLoaderData } from 'react-router-dom'
import { Suspense } from 'react'

export default function Pagina() {
  const data = useLoaderData()
  return (
    <>
      <h3>Rápido: {JSON.stringify(data.rapido)}</h3>
      <Suspense fallback={<p>Cargando parte lenta…</p>}>
        <Await resolve={data.lento}>
          {(lento) => <pre>{JSON.stringify(lento, null, 2)}</pre>}
        </Await>
      </Suspense>
    </>
  )
}
```

---

## Código dividido: `lazy()` en rutas

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: Root } = await import('./routes/root.jsx')
      return { Component: Root }
    },
    children: [
      {
        path: 'about',
        lazy: async () => {
          const mod = await import('./routes/about.jsx')
          return { Component: mod.default }
        }
      }
    ]
  }
])
```

> **Tip:** con `lazy` podés devolver `Component`, `loader`, `action` y `ErrorBoundary` desde el import.

---

## Scroll restoration y títulos de página

- **Scroll**: manejalo manualmente en `useEffect` o con una librería; React Router no fuerza comportamiento.  
- **Títulos**: simple con `useEffect(() => { document.title='Titulo' }, [])`.  
- Para per-ruta, podés usar `handle: { title: '...' }` y setear en el layout según `useMatches()`.

---

## Resumen de Hooks de React (cheat-sheet)

- **`useState(initial)`**: estado local.  
- **`useEffect(fn, deps)`**: efectos secundarios (fetch, suscripciones).  
  - sin deps: cada render; `[]`: una vez; `[a,b]`: cuando cambian.  
- **`useMemo(factory, deps)`**: memoriza **valor** caro de calcular.  
- **`useCallback(fn, deps)`**: memoriza **función** (evita re-renders en hijos).  
- **`useRef(initial)`**: referencia mutable `.current` (DOM o “cajita”).  
- **`useContext(Ctx)`**: lee contexto.  
- **`useReducer(reducer, init)`**: estado complejo con acciones.  
- **`useId()`**: IDs estables para accesibilidad.  
- **`useTransition()`**: marcar actualización como no urgente (UI fluida).  
- **`useDeferredValue(v)`**: “retrasar” un valor pesado para no trabar la UI.  

> Regla de Oro: **hooks solo en el tope del componente** (no en if/loops) y **solo en componentes/funciones de hooks**.

---

## Contexto rápido para estado global liviano

```jsx
// src/context/auth.jsx
import { createContext, useContext, useState } from 'react'
const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (u) => setUser(u)
  const logout = () => setUser(null)
  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}
export const useAuth = () => useContext(AuthCtx)
```

En `main.jsx`:
```jsx
import { AuthProvider } from './context/auth.jsx'
...
<React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
</React.StrictMode>
```

---

## Variables de entorno en Vite (`import.meta.env`)

- Archivos: `.env`, `.env.development`, `.env.production`  
- **Prefijo obligatorio**: `VITE_`  
- Uso: `import.meta.env.VITE_API_URL`

```env
# .env
VITE_API_URL=https://api.midominio.com
```

```jsx
const base = import.meta.env.VITE_API_URL
```

---

## Tips de performance y buenas prácticas

- **Colocá el fetch en loaders**, no en componentes.  
- **Memo**: `useMemo/useCallback` solo cuando hay re-renders costosos.  
- **Dividí código** con `lazy()` por ruta.  
- **Mantené los loaders idempotentes** (mismo resultado para misma URL).  
- **Manejo de errores por ruta** con `errorElement`.  
- **Evitar `any` librería innecesaria**; empezá simple.  
- **Accesibilidad**: foco, labels, roles, atajos simples.

---

## Mini-proyecto: “Contactos” CRUD con loader/action

**Mock API**: localStorage para simplificar.

**`src/services/contacts.js`**
```jsx
const KEY = 'contacts.v1'
const delay = (ms) => new Promise(r => setTimeout(r, ms))

function read() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}
function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export async function listContacts() {
  await delay(150)
  return read()
}

export async function getContact(id) {
  await delay(150)
  const c = read().find(x => x.id === id)
  if (!c) throw new Response('No encontrado', { status: 404 })
  return c
}

export async function createContact({ name, email }) {
  await delay(150)
  const all = read()
  const id = crypto.randomUUID()
  all.push({ id, name, email })
  write(all)
  return { id }
}

export async function updateContact(id, patch) {
  await delay(150)
  const all = read()
  const i = all.findIndex(x => x.id === id)
  if (i===-1) throw new Response('No encontrado', { status: 404 })
  all[i] = { ...all[i], ...patch }
  write(all)
  return all[i]
}

export async function deleteContact(id) {
  await delay(150)
  const all = read().filter(x => x.id !== id)
  write(all)
}
```

**Lista + crear (`/contactos`)**

```jsx
// src/routes/contactos/list.jsx
import { Link, Form, useLoaderData, useNavigation } from 'react-router-dom'
import { listContacts, createContact } from '../../services/contacts'

export async function loader() {
  const contactos = await listContacts()
  return { contactos }
}

export async function action({ request }) {
  const fd = await request.formData()
  const name = fd.get('name')?.trim()
  const email = fd.get('email')?.trim()
  if (!name || !email) return { error: 'Completar nombre y email' }
  await createContact({ name, email })
  return null
}

export default function ContactosList() {
  const { contactos } = useLoaderData()
  const nav = useNavigation()
  const creating = nav.state === 'submitting'

  return (
    <>
      <h2>Contactos</h2>
      <ul>
        {contactos.map(c => (
          <li key={c.id}>
            <Link to={c.id}>{c.name}</Link> — {c.email}
          </li>
        ))}
      </ul>

      <h3>Nuevo</h3>
      <Form method="post">
        <input name="name" placeholder="Nombre" />
        <input name="email" placeholder="Email" />
        <button disabled={creating}>{creating ? 'Creando...' : 'Crear'}</button>
      </Form>
    </>
  )
}
```

**Detalle + editar + borrar (`/contactos/:id`)**

```jsx
// src/routes/contactos/detalle.jsx
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import { getContact, updateContact, deleteContact } from '../../services/contacts'

export async function loader({ params }) {
  const contact = await getContact(params.id)
  return { contact }
}

export async function action({ request, params }) {
  const fd = await request.formData()
  const intent = fd.get('_intent')

  if (intent === 'delete') {
    await deleteContact(params.id)
    return redirect('/contactos')
  }

  const patch = {
    name: fd.get('name')?.trim(),
    email: fd.get('email')?.trim()
  }
  await updateContact(params.id, patch)
  return null
}

export default function ContactoDetalle() {
  const { contact } = useLoaderData()
  const nav = useNavigation()
  const busy = nav.state === 'submitting'

  return (
    <>
      <h2>Contacto</h2>
      <Form method="post">
        <input name="name" defaultValue={contact.name} />
        <input name="email" defaultValue={contact.email} />
        <button disabled={busy}>{busy ? 'Guardando...' : 'Guardar'}</button>
      </Form>

      <Form method="post" style={{marginTop:8}}>
        <input type="hidden" name="_intent" value="delete" />
        <button disabled={busy} style={{color:'tomato'}}>
          {busy ? 'Borrando...' : 'Eliminar'}
        </button>
      </Form>
    </>
  )
}
```

**Registrar rutas** en `main.jsx`:

```jsx
import ContactosList, { loader as contactosLoader, action as contactosAction } from './routes/contactos/list.jsx'
import ContactoDetalle, { loader as contactoLoader, action as contactoAction } from './routes/contactos/detalle.jsx'
import ErrorBoundary from './routes/error-boundary.jsx'

{
  path: '/contactos',
  errorElement: <ErrorBoundary />,
  children: [
    { index: true, element: <ContactosList />, loader: contactosLoader, action: contactosAction },
    { path: ':id', element: <ContactoDetalle />, loader: contactoLoader, action: contactoAction },
  ]
}
```

---

## Errores típicos y cómo resolverlos

1. **“useLoaderData no retorna nada”** → Olvidaste `return` en el `loader`.  
2. **“Action no corre”** → Asegurate de usar `<Form method="post">` y tener `action` en la ruta correcta.  
3. **Redirección no funciona** → Usá `return redirect('/ruta')` (no `navigate`) dentro de loader/action.  
4. **404 inesperado** → Confirmá `path` y que el `Link` apunte bien (relativo vs absoluto).  
5. **Datos viejos** → El loader se vuelve a ejecutar en cada navegación a esa ruta; si querés cachear, manejalo en tu capa `services/`.  
6. **Variables de entorno no aparecen** → Falta prefijo `VITE_` o reiniciar el server.  
7. **Import circular** → Separá UI (componentes) de lógica (services).  

---