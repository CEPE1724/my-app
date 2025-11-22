# 🎯 Modelo Conceptual - Sistema de Tienda

> **Nivel:** Conceptual (Alto nivel)  
> **Fecha:** 22 de noviembre de 2025  
> **Propósito:** Representación abstracta del dominio del negocio

---

## 📊 Diagrama Entidad-Relación Conceptual

```mermaid
graph TB
    subgraph Modelo["🏪 SISTEMA DE VENTAS"]
        direction LR
        
        C["👤 CLIENTE<br/><br/>Persona que<br/>realiza compras"]
        
        V["🛒 VENTA<br/><br/>Transacción<br/>comercial"]
        
        P["📦 PRODUCTO<br/><br/>Artículo<br/>a la venta"]
        
        C -->|"realiza<br/>(1:N)"| V
        V -->|"incluye<br/>(N:M)"| P
    end
    
    style C fill:#4fc3f7,stroke:#01579b,stroke-width:4px,color:#000
    style V fill:#fff176,stroke:#f57f17,stroke-width:4px,color:#000
    style P fill:#ce93d8,stroke:#4a148c,stroke-width:4px,color:#000
```

---

## 🏗️ Entidades Principales

### 👤 **CLIENTE**
**Definición:** Persona natural o jurídica que realiza compras en la tienda.

**Atributos:**
- Nombre completo
- Documento de identificación (DNI/RUC)
- Teléfono de contacto
- Correo electrónico
- Dirección física
- Fecha de registro en el sistema

---

### 🛒 **VENTA**
**Definición:** Operación comercial mediante la cual un cliente adquiere productos.

**Atributos:**
- Fecha de la transacción
- Monto total de la compra
- Estado (pendiente, completada, anulada)
- Método de pago (efectivo, tarjeta, transferencia)
- Número de comprobante/factura

---

### 📦 **PRODUCTO**
**Definición:** Artículo o mercancía disponible para ser vendida.

**Atributos:**
- Código único del producto
- Nombre descriptivo
- Descripción detallada
- Precio de venta
- Cantidad disponible en stock
- Categoría
- Unidad de medida (pieza, kg, litro, etc.)

---

## 🔗 Relaciones

### 1️⃣ **CLIENTE realiza VENTA**
- **Tipo:** Uno a Muchos (1:N)
- **Lectura:** Un cliente puede realizar muchas ventas
- **Lectura inversa:** Cada venta es realizada por un único cliente
- **Obligatoriedad:** Toda venta debe tener un cliente asociado

**Ejemplo:**
- El cliente "Juan Pérez" ha realizado 5 ventas en el mes
- La venta #001 pertenece al cliente "Juan Pérez"

---

### 2️⃣ **VENTA incluye PRODUCTO**
- **Tipo:** Muchos a Muchos (N:M)
- **Lectura:** Una venta puede incluir múltiples productos
- **Lectura inversa:** Un producto puede estar en múltiples ventas
- **Obligatoriedad:** Una venta debe incluir al menos un producto

**Atributos de la relación:**
- Cantidad vendida
- Precio unitario (al momento de la venta)
- Descuento aplicado
- Subtotal de la línea

**Ejemplo:**
- La venta #001 incluye: 2 laptops, 1 mouse, 1 teclado
- El producto "Laptop HP" ha sido vendido en 15 ventas diferentes

---

## 📐 Diagrama ER Detallado

```mermaid
erDiagram
    CLIENTE ||--o{ VENTA : "realiza"
    VENTA }o--o{ PRODUCTO : "incluye"
    
    CLIENTE {
        nombre_completo string
        documento string
        telefono string
        email string
        direccion string
        fecha_registro date
    }
    
    VENTA {
        fecha date
        monto_total decimal
        estado string
        metodo_pago string
        numero_comprobante string
    }
    
    PRODUCTO {
        codigo string
        nombre string
        descripcion text
        precio decimal
        stock integer
        categoria string
        unidad_medida string
    }
```

> **Nota:** La relación N:M entre VENTA y PRODUCTO se implementará mediante una tabla intermedia llamada "DETALLE_VENTA" en el modelo lógico.

---

## 🎯 Reglas de Negocio

### Restricciones:
1. ✅ Toda venta debe estar asociada a un cliente registrado
2. ✅ Una venta debe incluir al menos un producto
3. ✅ No se puede vender más cantidad de la disponible en stock
4. ✅ Las cantidades vendidas deben ser mayores a cero
5. ✅ Los precios deben ser valores positivos

### Políticas de Negocio:
1. 📌 El precio del producto se captura al momento de la venta (puede diferir del precio actual)
2. 📌 El monto total es la suma de todos los subtotales de productos
3. 📌 Un cliente puede realizar múltiples compras a lo largo del tiempo
4. 📌 El stock se reduce automáticamente al confirmar una venta
5. 📌 Una venta anulada debe restaurar el stock de los productos

---

## 💼 Proceso de Negocio

```mermaid
flowchart TD
    A[👤 Cliente llega<br/>a la tienda] --> B{¿Cliente<br/>registrado?}
    B -->|No| C[Registrar nuevo<br/>cliente]
    B -->|Sí| D[Seleccionar<br/>productos]
    C --> D
    D --> E[Agregar productos<br/>a la venta]
    E --> F{¿Hay<br/>stock?}
    F -->|No| G[Notificar falta<br/>de stock]
    F -->|Sí| H[Calcular total]
    G --> D
    H --> I[Seleccionar método<br/>de pago]
    I --> J[Confirmar venta]
    J --> K[Generar<br/>comprobante]
    K --> L[Reducir stock]
    L --> M[✅ Venta completada]
    
    style A fill:#e1f5ff
    style M fill:#c8e6c9
    style G fill:#ffccbc
```

---

## 📊 Cardinalidades Explicadas

| Relación | Cardinalidad | Significado |
|----------|--------------|-------------|
| CLIENTE → VENTA | 1:N | Un cliente puede hacer 0, 1 o muchas ventas |
| VENTA → CLIENTE | N:1 | Cada venta pertenece exactamente a 1 cliente |
| VENTA → PRODUCTO | N:M | Una venta incluye 1 o muchos productos |
| PRODUCTO → VENTA | N:M | Un producto puede estar en 0, 1 o muchas ventas |

---

## 🎨 Diagrama Conceptual Simplificado

```
    ┌─────────────┐
    │   CLIENTE   │
    │             │
    │ • Nombre    │
    │ • Documento │
    │ • Contacto  │
    └──────┬──────┘
           │ realiza
           │ (1:N)
           ▼
    ┌─────────────┐
    │    VENTA    │
    │             │
    │ • Fecha     │
    │ • Total     │
    │ • Estado    │
    └──────┬──────┘
           │ incluye
           │ (N:M)
           ▼
    ┌─────────────┐
    │  PRODUCTO   │
    │             │
    │ • Código    │
    │ • Nombre    │
    │ • Precio    │
    │ • Stock     │
    └─────────────┘
```

---

## 📖 Glosario

| Término | Definición |
|---------|-----------|
| **Entidad** | Objeto del mundo real con existencia independiente |
| **Atributo** | Característica que describe una entidad |
| **Relación** | Asociación significativa entre entidades |
| **Cardinalidad** | Número de instancias que pueden asociarse |
| **1:N** | Uno a muchos |
| **N:M** | Muchos a muchos |
| **Dominio** | Conjunto de valores válidos para un atributo |

---

## ✅ Validación del Modelo

### Preguntas de verificación:
- ✓ ¿Se capturan todos los datos necesarios del negocio?
- ✓ ¿Las relaciones reflejan la realidad del negocio?
- ✓ ¿Las cardinalidades son correctas?
- ✓ ¿Se pueden responder las consultas del negocio?
- ✓ ¿El modelo es comprensible para los usuarios?

---

## 🚀 Siguiente Paso

Este modelo conceptual servirá como base para crear:
1. **Modelo Lógico:** Definición de claves, tipos de datos, normalización
2. **Modelo Físico:** Implementación específica en el SGBD elegido

---

**📌 Características del Modelo Conceptual:**
- ✨ Independiente de tecnología
- 🎯 Enfocado en el negocio
- 💬 Lenguaje natural
- 👥 Entendible por todos los stakeholders
- 📋 Base para modelos técnicos posteriores
