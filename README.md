# 🗣️ SpeechDown – Aplicación de Apoyo al Habla con IA para Niños con Síndrome de Down

**SpeechDown** es una aplicación web full-stack creada como herramienta de apoyo para niños con síndrome de Down, combinando pictogramas, texto y voz mediante tecnologías web modernas e inteligencia artificial. El sistema permite que los niños puedan expresar ideas sencillas, promoviendo una comunicación más accesible y empática.

---

## 🎯 Objetivos del Proyecto

- Integrar inteligencia artificial generativa (OpenAI API) para sugerencia de frases según intención comunicativa.
- Permitir reproducción por voz de frases generadas (TTS).
- Ofrecer una interfaz responsiva, accesible y amigable.
- Mostrar aplicación práctica.

---

## ⚙️ Tecnologías Usadas

| Capa        | Herramientas principales                           |
|-------------|----------------------------------------------------|
| Frontend    | React.js + TailwindCSS                             |
| Backend     | Node.js + Express.js                               |
| IA          | OpenAI GPT-4 API                                   |
| TTS         | Google Text-to-Speech (gTTS) o alternativa Web API |
| Arquitectura| SOA + API REST                                     |
| Control de versiones | Git + GitHub                              |

---

## 📦 Estructura del Proyecto

speechdown/
├── backend/ # Servidor Express + lógica IA
│ └── routes/
├── frontend/ # Aplicación React responsiva
│ └── components/
├── public/ # Recursos estáticos
├── .env.example # Variables de entorno de ejemplo
├── README.md # Este archivo
└── package.json

---

## 🚀 Instrucciones de Despliegue

### 🔧 Requisitos previos

- Node.js (v18+)
- Git
- Cuenta en [https://platform.openai.com](https://platform.openai.com) con clave API
- Navegador moderno

---

### 1. Clona el repositorio

```bash
git clone https://github.com/tu_usuario/speechdown.git
cd speechdown
2. Configura variables de entorno
Dentro de /backend, crea un archivo .env basado en .env.example:

env
Copiar
Editar
OPENAI_API_KEY=tu-clave-de-openai
PORT=3001
3. Instala dependencias
bash
Copiar
Editar
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
4. Ejecuta la aplicación
bash
Copiar
Editar
# Ejecutar backend
cd backend
npm run dev

# Ejecutar frontend
cd ../frontend
npm run dev
Luego accede a: http://localhost:5173

🧠 Ejemplos de Prompts Usados (OpenAI API)
json
Copiar
Editar
{
  "prompt": "Crea una frase simple para que un niño diga que está feliz.",
  "respuesta": "Estoy feliz hoy."
}

🗺️ Diagrama de Arquitectura

Descripción:

El frontend se comunica mediante API REST con el backend.

El backend hace peticiones a OpenAI.

🛠️ Funcionalidades clave
✅ Frases asistidas con IA.

✅ Interfaz visual.

✅ Responsive.

✅ Modo claro/oscuro.

🧪 Pruebas y Verificación
Pruebas funcionales realizadas en Chrome.

Verificación de integración OpenAI.

Tests de conectividad entre frontend y backend.
