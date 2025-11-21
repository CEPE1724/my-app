import React, { useState } from 'react';
import './css/styles.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const issues = [
    { id: 2, title: 'Diseño estructural DB', modulo: 'Base de Datos', inicio: '2025-11-21', duracion: '5 días', estado: '✅ Completo', prioridad: 'Alta' },
    { id: 4, title: 'Registro estudiantes', modulo: 'Gestión Estudiantes', inicio: '2025-11-26', duracion: '7 días', estado: '🔄 Activo', prioridad: 'Alta' },
    { id: 5, title: 'Registro personal', modulo: 'Gestión Personal', inicio: '2025-12-03', duracion: '4 días', estado: '⏳ Pendiente', prioridad: 'Alta' },
    { id: 8, title: 'Evaluación desempeño', modulo: 'Gestión Personal', inicio: '2025-12-07', duracion: '4 días', estado: '⏳ Pendiente', prioridad: 'Media' },
    { id: 7, title: 'Administrar horarios/cursos', modulo: 'Gestión Académica', inicio: '2025-12-11', duracion: '5 días', estado: '⏳ Pendiente', prioridad: 'Alta' },
    { id: 10, title: 'Roles y autenticación', modulo: 'Seguridad', inicio: '2025-12-16', duracion: '3 días', estado: '⏳ Pendiente', prioridad: 'Crítica' },
    { id: 1, title: 'Reportes personalizados', modulo: 'Reportes', inicio: '2025-12-19', duracion: '3 días', estado: '⏳ Pendiente', prioridad: 'Media' },
  ];

  const allIssues = [
    { id: 2, title: 'Diseño estructural DB', modulo: 'Base de Datos', inicio: '2025-11-21', fin: '2025-11-25', duracion: '5 días', estado: '✅ Completo', prioridad: 'Alta' },
    { id: '-', title: 'Optimización DB', modulo: 'Base de Datos', inicio: '2025-11-26', fin: '2025-11-27', duracion: '2 días', estado: '🔄 Progreso', prioridad: 'Media' },
    { id: 4, title: 'Registro estudiantes', modulo: 'Gestión Estudiantes', inicio: '2025-11-28', fin: '2025-12-04', duracion: '7 días', estado: '🔄 Activo', prioridad: 'Alta' },
    { id: '-', title: 'Asistencia y calificaciones', modulo: 'Gestión Estudiantes', inicio: '2025-12-05', fin: '2025-12-09', duracion: '5 días', estado: '⏳ Pendiente', prioridad: 'Alta' },
    { id: 12, title: 'Historial académico', modulo: 'Gestión Estudiantes', inicio: '2025-12-10', fin: '2025-12-12', duracion: '3 días', estado: '⏳ Pendiente', prioridad: 'Media' },
    { id: 5, title: 'Registro personal', modulo: 'Gestión Personal', inicio: '2025-12-05', fin: '2025-12-08', duracion: '4 días', estado: '⏳ Pendiente', prioridad: 'Alta' },
    { id: 8, title: 'Evaluación desempeño', modulo: 'Gestión Personal', inicio: '2025-12-09', fin: '2025-12-12', duracion: '4 días', estado: '⏳ Pendiente', prioridad: 'Media' },
    { id: '-', title: 'Control horarios personal', modulo: 'Gestión Personal', inicio: '2025-12-13', fin: '2025-12-15', duracion: '3 días', estado: '⏳ Pendiente', prioridad: 'Media' },
    { id: 7, title: 'Administrar horarios/cursos', modulo: 'Gestión Académica', inicio: '2025-12-13', fin: '2025-12-17', duracion: '5 días', estado: '⏳ Pendiente', prioridad: 'Alta' },
    { id: 10, title: 'Roles y autenticación', modulo: 'Seguridad', inicio: '2025-12-18', fin: '2025-12-20', duracion: '3 días', estado: '⏳ Pendiente', prioridad: 'Crítica' },
    { id: 1, title: 'Reportes personalizados', modulo: 'Reportes', inicio: '2025-12-21', fin: '2025-12-23', duracion: '3 días', estado: '⏳ Pendiente', prioridad: 'Media' },
  ];

  const sprints = [
    { numero: 1, objetivo: 'Registro de estudiantes y base de datos', issues: '#2, #4', fechaEntrega: '2025-11-28' },
    { numero: 2, objetivo: 'Gestión personal y académica', issues: '#5, #7, #8', fechaEntrega: '2025-12-10' },
    { numero: 3, objetivo: 'Roles, reportes y cierre', issues: '#10, #1', fechaEntrega: '2025-12-19' },
  ];

  const features = [
    { icon: '📚', title: 'Gestión Académica', desc: 'Administración de cursos, asignaturas, horarios y evaluaciones' },
    { icon: '👨‍🎓', title: 'Gestión de Estudiantes', desc: 'Registro, actualización y seguimiento académico completo' },
    { icon: '👥', title: 'Gestión de Personal', desc: 'Registro de docentes, asignaciones y evaluación de desempeño' },
    { icon: '🔐', title: 'Seguridad y Acceso', desc: 'Control de roles y permisos (admin, docente, estudiante, padre)' },
    { icon: '📊', title: 'Reportes y Análisis', desc: 'Generación de reportes personalizados y modulares' },
    { icon: '📱', title: 'Accesibilidad', desc: 'Interfaz optimizada para web y dispositivos móviles' },
  ];

  const milestones = [
    { title: '🏗️ Infraestructura Base', fecha: '28 Nov 2025', tareas: 'DB, Optimización', estado: '✅' },
    { title: '👥 Módulo de Personas', fecha: '16 Dic 2025', tareas: 'Estudiantes, Personal', estado: '🔄' },
    { title: '📚 Módulo Académico', fecha: '25 Dic 2025', tareas: 'Cursos, Materias, Inscripciones', estado: '⏳' },
    { title: '🔐 Seguridad Completa', fecha: '25 Dic 2025', tareas: 'Auth, Roles, Permisos', estado: '⏳' },
    { title: '📊 Reportes y Analytics', fecha: '30 Dic 2025', tareas: 'Reportes, Dashboards', estado: '⏳' },
  ];

  const getPriorityColor = (prioridad) => {
    switch(prioridad) {
      case 'Crítica': return 'bg-red-100 text-red-800 border-red-300';
      case 'Alta': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-indigo-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg">
                <span className="text-3xl">📚</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">SGEI</h1>
                <p className="text-sm text-gray-600">Sistema de Gestión Educativa Integral</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="https://github.com/CEPE1724/my-app" target="_blank" rel="noopener noreferrer" 
                 className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-1">
            {[
              { id: 'overview', label: 'Visión General', icon: '🏠' },
               { id: 'scrum', label: 'SCRUM', icon: '🏆' },
              { id: 'timeline', label: 'Timeline', icon: '📅' },
              { id: 'features', label: 'Características', icon: '⚡' },
              { id: 'team', label: 'Equipo', icon: '👥' },
             
              { id: 'docs', label: 'Documentación', icon: '📚' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all duration-200 border-b-4 ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
              <h2 className="text-4xl font-bold mb-4">Bienvenido al SGEI</h2>
              <p className="text-xl mb-6 text-indigo-100">
                Una plataforma robusta para la administración escolar, coordinando procesos académicos, 
                personal, estudiantes y reportes de manera eficiente.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">31</div>
                  <div className="text-sm">Días de Sprint</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-sm">Issues Principales</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">14.3%</div>
                  <div className="text-sm">Progreso</div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📊 Progreso del Proyecto</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Base de Datos</span>
                    <span className="text-sm font-bold text-green-600">100% ✅</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Estudiantes</span>
                    <span className="text-sm font-bold text-blue-600">50% 🔄</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{width: '50%'}}></div>
                  </div>
                </div>
                {['Personal', 'Académica', 'Seguridad', 'Reportes'].map(modulo => (
                  <div key={modulo}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{modulo}</span>
                      <span className="text-sm font-bold text-gray-400">0% ⏳</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gray-400 h-3 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🎯 Hitos Principales</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="text-3xl">{milestone.estado}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.tareas}</p>
                      <p className="text-xs text-indigo-600 mt-1">📅 {milestone.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">📅 Timeline del Proyecto</h2>
                <div className="text-sm text-gray-600">
                  21 Nov - 21 Dic 2025
                </div>
              </div>
              
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left rounded-tl-lg">#</th>
                      <th className="px-4 py-3 text-left">Issue</th>
                      <th className="px-4 py-3 text-left">Módulo</th>
                      <th className="px-4 py-3 text-left">Inicio</th>
                      <th className="px-4 py-3 text-left">Duración</th>
                      <th className="px-4 py-3 text-left">Estado</th>
                      <th className="px-4 py-3 text-left rounded-tr-lg">Prioridad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {issues.map((issue, index) => (
                      <tr key={issue.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-bold text-indigo-600">#{issue.id}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">{issue.title}</td>
                        <td className="px-4 py-3 text-gray-600">{issue.modulo}</td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{issue.inicio}</td>
                        <td className="px-4 py-3 text-gray-600">{issue.duracion}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{issue.estado}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(issue.prioridad)}`}>
                            {issue.prioridad}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-100 rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="text-4xl font-bold text-green-700">1</div>
                <div className="text-green-800 font-semibold">✅ Completado</div>
                <div className="text-sm text-green-600">14.3%</div>
              </div>
              <div className="bg-blue-100 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="text-4xl font-bold text-blue-700">1</div>
                <div className="text-blue-800 font-semibold">🔄 En Progreso</div>
                <div className="text-sm text-blue-600">14.3%</div>
              </div>
              <div className="bg-gray-100 rounded-xl shadow-lg p-6 border-l-4 border-gray-500">
                <div className="text-4xl font-bold text-gray-700">5</div>
                <div className="text-gray-800 font-semibold">⏳ Pendiente</div>
                <div className="text-sm text-gray-600">71.4%</div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">⚡ Características Principales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Stack Tecnológico</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Node.js', 'React.js', 'MongoDB', 'Docker', 'Express.js', 'PostgreSQL', 'GitHub Actions', 'Tailwind CSS'].map(tech => (
                  <div key={tech} className="bg-gray-50 p-4 rounded-lg text-center font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">👥 Equipo SCRUM</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Nelson', role: 'Product Owner', icon: '👔', color: 'from-purple-500 to-purple-600' },
                  { name: 'Edison', role: 'Scrum Master', icon: '🎯', color: 'from-blue-500 to-blue-600' },
                  { name: 'Steven', role: 'Developer', icon: '💻', color: 'from-green-500 to-green-600' },
                  { name: 'Adrian', role: 'Developer', icon: '💻', color: 'from-green-500 to-green-600' },
                  { name: 'Alejandro', role: 'Developer', icon: '💻', color: 'from-green-500 to-green-600' },
                ].map((member, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className={`bg-gradient-to-br ${member.color} p-6 text-white`}>
                      <div className="text-6xl mb-4 text-center">{member.icon}</div>
                      <h3 className="text-2xl font-bold text-center">{member.name}</h3>
                      <p className="text-center text-sm opacity-90">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Installation */}
              <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">📦 Instalación</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-gray-800 p-3 rounded">git clone https://github.com/CEPE1724/my-app.git</div>
                  <div className="bg-gray-800 p-3 rounded">npm install</div>
                  <div className="bg-gray-800 p-3 rounded">npm start</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCRUM Tab */}
        {activeTab === 'scrum' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
              <h2 className="text-4xl font-bold mb-4">🏆 SCRUM</h2>
              <p className="text-xl text-purple-100">
                Implementación profesional de SCRUM en el proyecto SGEI
              </p>
            </div>

            {/* Equipo SCRUM */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1️⃣ Formación del Equipo SCRUM</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left rounded-tl-lg">Rol</th>
                      <th className="px-4 py-3 text-left">Usuario(s)</th>
                      <th className="px-4 py-3 text-left rounded-tr-lg">Responsabilidades</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold text-purple-600">Product Owner</td>
                      <td className="px-4 py-3">Nelson</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Define requisitos, visión del producto, prioridades y valor entregado</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-4 py-3 font-bold text-blue-600">Scrum Master</td>
                      <td className="px-4 py-3">Edison</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Facilita ceremonias, elimina bloqueos, asegura cumplimiento Scrum</td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold text-green-600">Developers</td>
                      <td className="px-4 py-3">Steven, Adrian, Alejandro</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Diseño, desarrollo, pruebas y documentación técnica</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Backlog */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2️⃣ Product Backlog Profesional</h3>
              <div className="space-y-4">
                <p className="text-gray-700">El Product Backlog centraliza todas las tareas y requerimientos.</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Se gestiona de forma dinámica, priorizando junto al Product Owner</li>
                  <li>Se mantiene en <a href="https://github.com/CEPE1724/my-app/issues" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Issues de GitHub</a></li>
                  <li>Apoyo de herramientas externas: ODOO, HubSpot, Canva, Miro</li>
                </ul>
              </div>
            </div>

            {/* Planificación de Sprints */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">3️⃣ Planificación de Sprints</h3>
              <p className="text-gray-700 mb-4">Sprints definidos cada 1-2 semanas con objetivos claros.</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left rounded-tl-lg">Sprint</th>
                      <th className="px-4 py-3 text-left">Objetivo</th>
                      <th className="px-4 py-3 text-left">Issues</th>
                      <th className="px-4 py-3 text-left rounded-tr-lg">Fecha Entrega</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sprints.map((sprint, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-bold text-indigo-600">{sprint.numero}</td>
                        <td className="px-4 py-3 text-gray-800">{sprint.objetivo}</td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-sm">{sprint.issues}</td>
                        <td className="px-4 py-3 text-gray-600">{sprint.fechaEntrega}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily Scrum */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">4️⃣ Daily Scrum Simulado</h3>
              <p className="text-gray-700 mb-4">Reuniones diarias (15 min) para sincronización rápida.</p>
              <div className="space-y-3">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="font-semibold text-green-800">Steven (Dev):</p>
                  <p className="text-gray-700 text-sm">"Avancé con el formulario de estudiantes; hoy trabajo en validaciones. Sin bloqueos."</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-semibold text-blue-800">Adrian (Dev):</p>
                  <p className="text-gray-700 text-sm">"Ajustando interfaz móvil. Edison revisa los cambios hoy."</p>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                  <p className="font-semibold text-indigo-800">Edison (ScrumMaster):</p>
                  <p className="text-gray-700 text-sm">"Revisen el acta del Daily en la wiki y suban los bloqueos detectados."</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <p className="font-semibold text-purple-800">Nelson (Product Owner):</p>
                  <p className="text-gray-700 text-sm">"Listos los criterios de evaluación, paso a revisión de tareas cerradas."</p>
                </div>
              </div>
            </div>

            {/* Sprint Retrospective */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">5️⃣ Sprint Retrospective Formal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl mb-2">✔️</div>
                  <h4 className="font-bold text-green-800 mb-2">Lo bueno</h4>
                  <p className="text-sm text-gray-700">Entregas puntuales, comunicación abierta</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-2xl mb-2">❌</div>
                  <h4 className="font-bold text-red-800 mb-2">A mejorar</h4>
                  <p className="text-sm text-gray-700">Documentar bloqueos en board de forma clara</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-bold text-blue-800 mb-2">Acción</h4>
                  <p className="text-sm text-gray-700">Implementar plantillas para capturar bugs</p>
                </div>
              </div>
            </div>

            {/* Herramientas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Herramientas Profesionales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">📊 Gestión</h4>
                  <p className="text-sm text-gray-700">ODOO, HubSpot, Github Projects, Trello</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">🎨 Visualización</h4>
                  <p className="text-sm text-gray-700">Miro, Canva, Figma</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">💬 Comunicación</h4>
                  <p className="text-sm text-gray-700">Issues, Wiki, Boards</p>
                </div>
              </div>
            </div>

            {/* Buenas Prácticas */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">📣 Buenas Prácticas</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Mantener el backlog actualizado y priorizado</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Documentar todas las decisiones técnicas en la wiki</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Realizar ceremonias puntualmente</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Usar herramientas de seguimiento visual</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'docs' && (
          <div className="space-y-6 animate-fade-in">
            {/* README Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">📚 Documentación del Proyecto</h2>
              
              {/* Estructura del Proyecto */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📁 Estructura del Proyecto</h3>
                <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`my-app/
├── public/              # Archivos públicos estáticos
├── src/
│   ├── App.js          # Componente principal con portal web
│   ├── index.js        # Punto de entrada de React
│   ├── index.css       # Estilos globales con Tailwind
│   └── css/            # Archivos CSS adicionales
├── README.md           # Documentación principal
├── timeline.md         # Timeline detallado del proyecto
├── scrum.md            # Proceso SCRUM y metodología
└── package.json        # Dependencias y scripts`}</pre>
                </div>
              </div>

              {/* Timeline Completo */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📅 Timeline Detallado</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left rounded-tl-lg">#</th>
                        <th className="px-4 py-3 text-left">Issue</th>
                        <th className="px-4 py-3 text-left">Módulo</th>
                        <th className="px-4 py-3 text-left">Inicio</th>
                        <th className="px-4 py-3 text-left">Fin</th>
                        <th className="px-4 py-3 text-left">Duración</th>
                        <th className="px-4 py-3 text-left">Estado</th>
                        <th className="px-4 py-3 text-left rounded-tr-lg">Prioridad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {allIssues.map((issue, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-bold text-indigo-600">{issue.id}</td>
                          <td className="px-4 py-3 font-semibold text-gray-800">{issue.title}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{issue.modulo}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{issue.inicio}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{issue.fin}</td>
                          <td className="px-4 py-3 text-gray-600">{issue.duracion}</td>
                          <td className="px-4 py-3 text-sm">{issue.estado}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(issue.prioridad)}`}>
                              {issue.prioridad}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Scripts Disponibles */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Scripts Disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 text-white p-4 rounded-lg">
                    <code className="text-green-400">npm start</code>
                    <p className="text-sm text-gray-300 mt-2">Inicia el servidor de desarrollo</p>
                  </div>
                  <div className="bg-gray-800 text-white p-4 rounded-lg">
                    <code className="text-green-400">npm run build</code>
                    <p className="text-sm text-gray-300 mt-2">Compila para producción</p>
                  </div>
                  <div className="bg-gray-800 text-white p-4 rounded-lg">
                    <code className="text-green-400">npm test</code>
                    <p className="text-sm text-gray-300 mt-2">Ejecuta las pruebas</p>
                  </div>
                  <div className="bg-gray-800 text-white p-4 rounded-lg">
                    <code className="text-green-400">npm run tailDev</code>
                    <p className="text-sm text-gray-300 mt-2">Tailwind CSS en modo watch</p>
                  </div>
                </div>
              </div>

              {/* Enlaces Útiles */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🔗 Enlaces Útiles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="https://github.com/CEPE1724/my-app" target="_blank" rel="noopener noreferrer" 
                     className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg hover:shadow-xl transition flex items-center">
                    <span className="text-2xl mr-3">📂</span>
                    <div>
                      <div className="font-bold">Repositorio GitHub</div>
                      <div className="text-sm text-gray-300">Código fuente completo</div>
                    </div>
                  </a>
                  <a href="https://github.com/CEPE1724/my-app/issues" target="_blank" rel="noopener noreferrer" 
                     className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-lg hover:shadow-xl transition flex items-center">
                    <span className="text-2xl mr-3">📋</span>
                    <div>
                      <div className="font-bold">Issues & Backlog</div>
                      <div className="text-sm text-indigo-200">Seguimiento de tareas</div>
                    </div>
                  </a>
                </div>
              </div>

              
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">© 2025 SGEI - Sistema de Gestión Educativa Integral</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
