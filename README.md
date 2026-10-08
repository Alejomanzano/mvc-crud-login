# MVC CRUD Login — NestJS

Aplicación web desarrollada para la materia **Ingeniería Web**, implementando el patrón **MVC**, operaciones **CRUD** y un sistema de **autenticación mediante Login y JWT**.

El proyecto permite gestionar usuarios mediante operaciones de creación, consulta, actualización y eliminación, manteniendo las rutas del CRUD protegidas mediante autenticación.

##  Descripción del proyecto

**MVC CRUD Login** es una aplicación desarrollada con **NestJS y TypeScript** como parte de la asignatura Ingeniería Web.

El proyecto aplica el patrón de arquitectura **MVC** mediante Controllers, Services y Modules, incorporando un sistema de autenticación para controlar el acceso al CRUD de usuarios.

Las operaciones disponibles son:

* Crear usuarios.
* Consultar usuarios.
* Actualizar usuarios.
* Eliminar usuarios.
* Iniciar sesión mediante correo y contraseña.
* Generar un token JWT después de una autenticación exitosa.
* Proteger las rutas del CRUD mediante un `JwtAuthGuard`.

---

##  Objetivos

### Objetivo general

Desarrollar una aplicación utilizando el patrón MVC que integre operaciones CRUD y un sistema de autenticación para proteger el acceso a los recursos.

### Objetivos específicos

* Aplicar el patrón MVC en una aplicación desarrollada con NestJS.
* Implementar las operaciones CRUD para la gestión de usuarios.
* Implementar un sistema de Login.
* Utilizar bcrypt para la validación de contraseñas.
* Generar tokens de autenticación mediante JWT.
* Proteger las rutas del CRUD mediante un Guard.
* Realizar pruebas de las diferentes operaciones mediante solicitudes HTTP.

---

##  Funcionalidades

###  Autenticación

* Login mediante correo y contraseña.
* Validación de credenciales.
* Generación de token JWT.
* Protección de las rutas del CRUD.
* Respuesta `401 Unauthorized` cuando no se proporciona un token.

### 👤 Gestión de usuarios

| Operación          | Método | Endpoint     |
| ------------------ | ------ | ------------ |
| Consultar usuarios | GET    | `/users`     |
| Crear usuario      | POST   | `/users`     |
| Actualizar usuario | PUT    | `/users/:id` |
| Eliminar usuario   | DELETE | `/users/:id` |

###  Login

| Operación      | Método | Endpoint      |
| -------------- | ------ | ------------- |
| Iniciar sesión | POST   | `/auth/login` |

---

##  Arquitectura del proyecto

El proyecto está organizado mediante módulos siguiendo la estructura de NestJS:

```text
src/
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
│
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── guards/
│   └── jwt-auth.guard.ts
│
├── app.module.ts
└── main.ts
```

### Auth

Se encarga del sistema de autenticación y del endpoint de Login.

### Users

Contiene la gestión de usuarios y las operaciones CRUD.

### Guards

Contiene el `JwtAuthGuard`, encargado de proteger las rutas que requieren autenticación.

### AppModule

Es el módulo principal encargado de integrar los diferentes módulos de la aplicación.

### Main

Es el punto de entrada de la aplicación NestJS.

---

## Autenticación mediante JWT

El flujo de autenticación funciona de la siguiente manera:

```text
Usuario
   │
   ▼
POST /auth/login
   │
   ▼
Validación de credenciales
   │
   ▼
Credenciales correctas
   │
   ▼
Generación de JWT
   │
   ▼
Access Token
   │
   ▼
Solicitud al CRUD
   │
   ▼
JwtAuthGuard
   │
   ├── Token válido ──► Acceso permitido
   │
   └── Sin token ─────► 401 Unauthorized
```

Para acceder a las rutas protegidas se debe enviar el token mediante el encabezado:

```http
Authorization: Bearer <TOKEN>
```

---

## Tecnologías utilizadas

* **NestJS**
* **TypeScript**
* **Node.js**
* **JWT (JSON Web Token)**
* **bcrypt**
* **npm**
* **PowerShell** para las pruebas de las solicitudes HTTP.

---

## Requisitos

Antes de ejecutar el proyecto se necesita tener instalado:

* Node.js
* npm
* NestJS CLI

Versiones utilizadas durante el desarrollo:

```text
Node.js: 22.16.0
npm: 11.21.0
Nest CLI: 12.0.8
```

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Alejomanzano/mvc-crud-login.git
```

### 2. Entrar al proyecto

```bash
cd mvc-crud-login
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

```bash
npm run start:dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

## Pruebas

Las pruebas fueron realizadas mediante solicitudes HTTP utilizando PowerShell.

### Login

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"ariel.manzano@udla.edu.ec","password":"123456"}'
```

Una autenticación correcta devuelve:

```text
message        access_token
-------        ------------
Inicio Exitoso eyJhbGciOi...
```

---

### Acceso sin autenticación

Si se intenta acceder al CRUD sin proporcionar un token:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET
```

La aplicación responde:

```json
{
  "message": "Token no proporcionado",
  "error": "Unauthorized",
  "statusCode": 401
}
```

Esto demuestra que las rutas del CRUD están protegidas.

---

### Consultar usuarios

Después de obtener el token:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET -Headers @{ Authorization = "Bearer $token" }
```

---

### Crear usuario

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST -Headers @{ Authorization = "Bearer $token" } -ContentType "application/json" -Body '{"name":"Carlos","lastname":"Perez","email":"carlos@example.com","password":"123456"}'
```

---

### Actualizar usuario

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/{id}" -Method PUT -Headers @{ Authorization = "Bearer $token" } -ContentType "application/json" -Body '{"name":"Carlos Actualizado","lastname":"Perez","email":"carlos@example.com","password":"123456"}'
```

> Reemplazar `{id}` por el ID correspondiente al usuario.

---

### Eliminar usuario

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/{id}" -Method DELETE -Headers @{ Authorization = "Bearer $token" }
```

> Reemplazar `{id}` por el ID correspondiente al usuario.

---

## 📊 Flujo general de la aplicación

```text
              ┌───────────────┐
              │    Usuario    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │     Login     │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │   JWT Token   │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │  JWT Guard    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │   Controller  │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │    Service    │
              └───────┬───────┘
                      │
                      ▼
              ┌───────────────┐
              │ Gestión Users │
              └───────────────┘
```

---

## Autor

**Alejandro Manzano**

Estudiante de Ingeniería de Software

Universidad de Las Américas — UDLA

GitHub:

https://github.com/Alejomanzano

---

## Licencia

Este proyecto fue desarrollado con fines **académicos** para la asignatura de Ingeniería Web.

---

## Proyecto académico

Este proyecto permitió aplicar los siguientes conceptos:

* Arquitectura MVC.
* Desarrollo con NestJS.
* Operaciones CRUD.
* Autenticación.
* JWT.
* Guards.
* Servicios y controladores.
* Manejo de solicitudes HTTP.
* Protección de rutas.

**Estado:** Proyecto académico finalizado.
