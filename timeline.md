# 🗓️ Línea de Tiempo del Proyecto SGEI

```mermaid
gantt
    title Línea de Tiempo SGEI
    dateFormat  YYYY-MM-DD
    section Base de Datos
    Diseño estructural      :a1, 2025-11-21, 5d
    Pruebas iniciales       :a2, after a1, 2d
    section Gestión de Estudiantes
    Registro y actualización de datos    :b1, after a2, 7d
    Seguimiento académico y comunicación :b2, after b1, 5d
    section Gestión de Personal
    Registro y asignaciones  :c1, after b2, 7d
    Evaluación de desempeño  :c2, after c1, 3d
    section Gestión Académica
    Administración y horarios de cursos  :d1, after c2, 6d
    Evaluaciones y calificaciones        :d2, after d1, 4d
    section Seguridad y Acceso
    Roles y autenticación    :e1, after d2, 3d
    section Accesibilidad
    Web y móvil              :f1, after e1, 4d
    section Reportes y Análisis
    Generación personalizada :g1, after f1, 4d
```

Simulación Estado Board (Kanban):

| Estado      | Tareas                                                           |
|-------------|------------------------------------------------------------------|
| To Do       | Diseño estructural, Seguimiento académico y comunicación, Registro y asignaciones, Administración y horarios de cursos, Web y móvil, Generación personalizada de reportes |
| In Progress | Registro y actualización de datos, Pruebas iniciales, Evaluación de desempeño, Evaluaciones y calificaciones |
| Done        | Roles y autenticación                                            |
