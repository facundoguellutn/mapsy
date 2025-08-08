# Mapsy - Guía Turístico Inteligente con IA

## Descripción del Proyecto

Mapsy es una aplicación de guía turístico inteligente que utiliza IA y reconocimiento de imágenes para brindar información cultural, histórica y práctica sobre cualquier lugar que el usuario visite. La aplicación permite a los usuarios tomar fotos de lugares de interés y obtener información contextualizada de manera interactiva.

### Funcionalidades Principales Planeadas

1. **Reconocimiento Visual de Lugares**
   - Toma de fotos de edificios, monumentos, obras de arte, paisajes
   - Integración con servicios de reconocimiento visual (Google Cloud Vision API)
   - Identificación automática de lugares y elementos de interés

2. **IA Conversacional Contextualizada**
   - Chat interactivo con IA para responder preguntas sobre lugares
   - Procesamiento de información de fuentes públicas (Wikipedia, Wikidata, Google Places)
   - Descripciones claras y resumidas de lugares históricos y culturales

3. **Geolocalización y Recomendaciones**
   - Uso de ubicación GPS como alternativa a las fotos
   - Sugerencias de lugares cercanos de interés
   - Rutas recomendadas personalizadas para continuar el recorrido

4. **Funcionalidades de Usuario**
   - Guardado de descubrimientos favoritos
   - Acceso offline a lugares visitados
   - Soporte multilenguaje para turistas internacionales

## Arquitectura del Proyecto

Este proyecto está construido como un monorepo usando **Turborepo** con tres aplicaciones principales:

```
mapsyApp/
├── apps/
│   ├── native/      # Aplicación móvil (React Native + Expo)
│   ├── web/         # Aplicación web (React + TanStack Router)
│   └── server/      # API Backend (Express + MongoDB)
└── packages/        # Paquetes compartidos
```

### Stack Tecnológico

#### Frontend Móvil (`apps/native/`)
- **React Native** 0.79.1 con **Expo** 53.0.4
- **Expo Router** para navegación file-based
- **NativeWind** (TailwindCSS) para styling
- **Drawer + Tabs Navigation** implementado
- **React Query** para state management y caching
- **React Hook Form** para manejo de formularios

**Estructura de Navegación Actual:**
- Stack principal con Drawer navigation
- Dentro del drawer: sistema de Tabs
- Tabs: "Home" y "Explore" (placeholder)
- Modal support integrado

#### Frontend Web (`apps/web/`)
- **React** 19.0.0 con **TanStack Router** 1.114.25
- **Vite** como bundler
- **TailwindCSS** 4.0.15 con **shadcn/ui** components
- **React Query** para state management
- **Dark/Light theme** support
- **TypeScript** full type safety

#### Backend (`apps/server/`)
- **Express** 5.1.0 como framework web
- **MongoDB** con **Mongoose** 8.14.0
- **TypeScript** configuración completa
- **CORS** configurado para cross-origin requests
- **dotenv** para variables de entorno

**Estado Actual del Backend:**
- Servidor básico configurado en puerto 3000
- Conexión a MongoDB establecida (DATABASE_URL en .env)
- Router principal vacío (listo para implementar endpoints)
- Endpoint básico de health check (`GET /`)

### Estado de Desarrollo Actual

#### ✅ Implementado
- **Estructura base del monorepo** con Turborepo
- **Apps móvil y web** con navegación básica
- **Servidor Express** con conexión a MongoDB
- **Configuración de desarrollo** con hot reload
- **Theming** (dark/light mode) en ambas apps
- **TypeScript** configurado en todos los proyectos

#### 🔄 En Desarrollo Base
- Componentes UI básicos (Container, HeaderButton, TabBarIcon)
- Estructura de routing preparada para funcionalidades principales
- Database schema (aún no definido)

#### ⏳ Pendiente de Implementar

**Core Features:**
1. **Integración con APIs de Reconocimiento de Imágenes**
   - Google Cloud Vision API setup
   - Endpoint para procesamiento de imágenes
   - Identificación de landmarks y lugares

2. **Sistema de IA Conversacional**
   - Integración con modelos de lenguaje (OpenAI, Claude, etc.)
   - Context management para conversaciones sobre lugares
   - Endpoint de chat con información contextual

3. **Geolocalización**
   - Expo Location API para GPS
   - Integración con Google Places API
   - Sistema de recomendaciones basado en ubicación

4. **Base de Datos y Modelos**
   - Schema para usuarios, lugares, favoritos, historial
   - Autenticación de usuarios
   - Sistema de caching para información de lugares

5. **Features de Usuario**
   - Sistema de favoritos
   - Historial de lugares visitados
   - Modo offline con almacenamiento local
   - Perfil de usuario y preferencias

6. **UI/UX Principal**
   - Pantalla de cámara integrada
   - Interface de chat con IA
   - Mapa interactivo con lugares de interés
   - Lista de recomendaciones
   - Pantalla de favoritos y historial

### Scripts de Desarrollo

```bash
# Desarrollo completo
npm run dev

# Apps individuales
npm run dev:native    # Expo app en móvil
npm run dev:web      # Web app en localhost:3001  
npm run dev:server   # API en localhost:3000

# Build y tipos
npm run build
npm run check-types
```

### Configuración de Base de Datos

El proyecto está configurado para MongoDB. Variables de entorno necesarias en `apps/server/.env`:

```env
DATABASE_URL=mongodb://localhost:27017/mapsy
CORS_ORIGIN=http://localhost:3001
PORT=3000
```

### Próximos Pasos de Desarrollo

1. **Definir modelos de datos** para lugares, usuarios, favoritos
2. **Implementar autenticación** de usuarios
3. **Crear endpoints API** para manejo de imágenes y chat
4. **Integrar servicios externos** (Vision API, Places API)
5. **Desarrollar UI principal** para cámara y chat
6. **Implementar sistema de caché** y modo offline
7. **Testing y optimización** de rendimiento

### Consideraciones de Escalabilidad

- **Caching**: Implementar Redis para datos de lugares frecuentemente consultados
- **CDN**: Para almacenamiento y servicio de imágenes
- **Rate Limiting**: Para APIs externas costosas
- **Database Indexing**: Para búsquedas geográficas eficientes
- **Microservices**: Separar processing de imágenes en servicio independiente

El proyecto tiene una base sólida y está bien estructurado para soportar todas las funcionalidades planeadas del guía turístico inteligente.