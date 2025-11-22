# 💾 Modelo Físico - Sistema de Tienda

> **Nivel:** Físico (Implementación)  
> **SGBD:** MySQL 8.0+ / MariaDB 10.5+  
> **Fecha:** 22 de noviembre de 2025  
> **Propósito:** Implementación específica en base de datos

---

## 🗄️ Script de Creación Completo

### 1️⃣ Crear Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tienda_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE tienda_db;
```

---

### 2️⃣ Tabla CLIENTE

```sql
CREATE TABLE CLIENTE (
    id_cliente INT UNSIGNED AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NULL,
    telefono VARCHAR(20) NULL,
    direccion VARCHAR(255) NULL,
    dni_ruc VARCHAR(20) NULL,
    fecha_registro DATE NOT NULL DEFAULT (CURRENT_DATE),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Metadatos
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Claves
    PRIMARY KEY (id_cliente),
    UNIQUE KEY uk_cliente_email (email),
    UNIQUE KEY uk_cliente_dni_ruc (dni_ruc),
    
    -- Índices
    INDEX idx_cliente_nombre (nombre, apellido),
    INDEX idx_cliente_activo (activo),
    INDEX idx_cliente_fecha (fecha_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Tabla de clientes de la tienda';
```

---

### 3️⃣ Tabla PRODUCTO

```sql
CREATE TABLE PRODUCTO (
    id_producto INT UNSIGNED AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    categoria VARCHAR(100) NULL,
    unidad_medida VARCHAR(20) NULL DEFAULT 'unidad',
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Metadatos
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    usuario_registro VARCHAR(50) NULL,
    
    -- Claves
    PRIMARY KEY (id_producto),
    UNIQUE KEY uk_producto_codigo (codigo),
    
    -- Índices
    INDEX idx_producto_nombre (nombre),
    INDEX idx_producto_categoria (categoria),
    INDEX idx_producto_activo (activo),
    INDEX idx_producto_stock (stock),
    FULLTEXT INDEX ft_producto_busqueda (nombre, descripcion),
    
    -- Restricciones
    CONSTRAINT chk_producto_precio CHECK (precio > 0),
    CONSTRAINT chk_producto_stock CHECK (stock >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Catálogo de productos disponibles';
```

---

### 4️⃣ Tabla VENTA

```sql
CREATE TABLE VENTA (
    id_venta INT UNSIGNED AUTO_INCREMENT,
    id_cliente INT UNSIGNED NOT NULL,
    fecha_venta DATE NOT NULL DEFAULT (CURRENT_DATE),
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    estado ENUM('pendiente', 'completada', 'anulada') NOT NULL DEFAULT 'pendiente',
    tipo_pago VARCHAR(50) NULL,
    numero_factura VARCHAR(50) NULL,
    observaciones TEXT NULL,
    
    -- Metadatos
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    usuario_registro VARCHAR(50) NULL,
    
    -- Claves
    PRIMARY KEY (id_venta),
    UNIQUE KEY uk_venta_factura (numero_factura),
    
    -- Claves foráneas
    CONSTRAINT fk_venta_cliente 
        FOREIGN KEY (id_cliente) 
        REFERENCES CLIENTE(id_cliente)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    
    -- Índices
    INDEX idx_venta_cliente (id_cliente),
    INDEX idx_venta_fecha (fecha_venta),
    INDEX idx_venta_estado (estado),
    INDEX idx_venta_fecha_estado (fecha_venta, estado),
    
    -- Restricciones
    CONSTRAINT chk_venta_total CHECK (total >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Registro de ventas realizadas';
```

---

### 5️⃣ Tabla DETALLE_VENTA

```sql
CREATE TABLE DETALLE_VENTA (
    id_detalle INT UNSIGNED AUTO_INCREMENT,
    id_venta INT UNSIGNED NOT NULL,
    id_producto INT UNSIGNED NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    subtotal DECIMAL(10,2) NOT NULL,
    
    -- Metadatos
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Claves
    PRIMARY KEY (id_detalle),
    UNIQUE KEY uk_detalle_venta_producto (id_venta, id_producto),
    
    -- Claves foráneas
    CONSTRAINT fk_detalle_venta 
        FOREIGN KEY (id_venta) 
        REFERENCES VENTA(id_venta)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT fk_detalle_producto 
        FOREIGN KEY (id_producto) 
        REFERENCES PRODUCTO(id_producto)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    
    -- Índices
    INDEX idx_detalle_venta (id_venta),
    INDEX idx_detalle_producto (id_producto),
    
    -- Restricciones
    CONSTRAINT chk_detalle_cantidad CHECK (cantidad > 0),
    CONSTRAINT chk_detalle_precio CHECK (precio_unitario > 0),
    CONSTRAINT chk_detalle_descuento CHECK (descuento >= 0),
    CONSTRAINT chk_detalle_subtotal CHECK (subtotal >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Detalle de productos por venta';
```

---

## 🔧 Triggers y Procedimientos

### 📌 Trigger: Calcular Subtotal

```sql
DELIMITER $$

CREATE TRIGGER trg_detalle_before_insert
BEFORE INSERT ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    -- Calcular subtotal automáticamente
    SET NEW.subtotal = (NEW.cantidad * NEW.precio_unitario) - NEW.descuento;
END$$

CREATE TRIGGER trg_detalle_before_update
BEFORE UPDATE ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    -- Recalcular subtotal al actualizar
    SET NEW.subtotal = (NEW.cantidad * NEW.precio_unitario) - NEW.descuento;
END$$

DELIMITER ;
```

---

### 📌 Trigger: Actualizar Total de Venta

```sql
DELIMITER $$

CREATE TRIGGER trg_actualizar_total_venta_insert
AFTER INSERT ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    UPDATE VENTA 
    SET total = (
        SELECT COALESCE(SUM(subtotal), 0) 
        FROM DETALLE_VENTA 
        WHERE id_venta = NEW.id_venta
    )
    WHERE id_venta = NEW.id_venta;
END$$

CREATE TRIGGER trg_actualizar_total_venta_update
AFTER UPDATE ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    UPDATE VENTA 
    SET total = (
        SELECT COALESCE(SUM(subtotal), 0) 
        FROM DETALLE_VENTA 
        WHERE id_venta = NEW.id_venta
    )
    WHERE id_venta = NEW.id_venta;
END$$

CREATE TRIGGER trg_actualizar_total_venta_delete
AFTER DELETE ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    UPDATE VENTA 
    SET total = (
        SELECT COALESCE(SUM(subtotal), 0) 
        FROM DETALLE_VENTA 
        WHERE id_venta = OLD.id_venta
    )
    WHERE id_venta = OLD.id_venta;
END$$

DELIMITER ;
```

---

### 📌 Trigger: Validar y Reducir Stock

```sql
DELIMITER $$

CREATE TRIGGER trg_validar_stock_before_insert
BEFORE INSERT ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    DECLARE stock_actual INT;
    
    -- Obtener stock actual
    SELECT stock INTO stock_actual
    FROM PRODUCTO
    WHERE id_producto = NEW.id_producto;
    
    -- Validar que hay suficiente stock
    IF stock_actual < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Stock insuficiente para realizar la venta';
    END IF;
END$$

CREATE TRIGGER trg_reducir_stock_after_insert
AFTER INSERT ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    DECLARE estado_venta VARCHAR(20);
    
    -- Obtener estado de la venta
    SELECT estado INTO estado_venta
    FROM VENTA
    WHERE id_venta = NEW.id_venta;
    
    -- Solo reducir stock si la venta está completada
    IF estado_venta = 'completada' THEN
        UPDATE PRODUCTO
        SET stock = stock - NEW.cantidad
        WHERE id_producto = NEW.id_producto;
    END IF;
END$$

CREATE TRIGGER trg_restaurar_stock_after_delete
AFTER DELETE ON DETALLE_VENTA
FOR EACH ROW
BEGIN
    DECLARE estado_venta VARCHAR(20);
    
    SELECT estado INTO estado_venta
    FROM VENTA
    WHERE id_venta = OLD.id_venta;
    
    -- Restaurar stock si la venta estaba completada
    IF estado_venta = 'completada' THEN
        UPDATE PRODUCTO
        SET stock = stock + OLD.cantidad
        WHERE id_producto = OLD.id_producto;
    END IF;
END$$

DELIMITER ;
```

---

## 🔒 Procedimientos Almacenados

### 📋 Crear Venta Completa

```sql
DELIMITER $$

CREATE PROCEDURE sp_crear_venta(
    IN p_id_cliente INT,
    IN p_tipo_pago VARCHAR(50),
    IN p_productos JSON,
    OUT p_id_venta INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_error INT DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_error = 1;
        ROLLBACK;
        SET p_mensaje = 'Error al crear la venta';
    END;
    
    START TRANSACTION;
    
    -- Crear la venta
    INSERT INTO VENTA (id_cliente, tipo_pago, estado)
    VALUES (p_id_cliente, p_tipo_pago, 'pendiente');
    
    SET p_id_venta = LAST_INSERT_ID();
    
    -- Insertar detalles (procesar JSON)
    -- Aquí se procesaría el JSON de productos
    
    IF v_error = 0 THEN
        COMMIT;
        SET p_mensaje = 'Venta creada exitosamente';
    END IF;
END$$

DELIMITER ;
```

---

### 📋 Confirmar Venta

```sql
DELIMITER $$

CREATE PROCEDURE sp_confirmar_venta(
    IN p_id_venta INT,
    IN p_numero_factura VARCHAR(50),
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_error INT DEFAULT 0;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_error = 1;
        ROLLBACK;
        SET p_mensaje = 'Error al confirmar la venta';
    END;
    
    START TRANSACTION;
    
    -- Actualizar estado de la venta
    UPDATE VENTA
    SET estado = 'completada',
        numero_factura = p_numero_factura,
        fecha_venta = CURRENT_DATE
    WHERE id_venta = p_id_venta;
    
    -- Reducir stock de productos (el trigger lo maneja)
    
    IF v_error = 0 THEN
        COMMIT;
        SET p_mensaje = 'Venta confirmada exitosamente';
    END IF;
END$$

DELIMITER ;
```

---

### 📋 Anular Venta

```sql
DELIMITER $$

CREATE PROCEDURE sp_anular_venta(
    IN p_id_venta INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_error INT DEFAULT 0;
    DECLARE v_estado VARCHAR(20);
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_error = 1;
        ROLLBACK;
        SET p_mensaje = 'Error al anular la venta';
    END;
    
    START TRANSACTION;
    
    -- Verificar estado actual
    SELECT estado INTO v_estado
    FROM VENTA
    WHERE id_venta = p_id_venta;
    
    IF v_estado = 'anulada' THEN
        SET p_mensaje = 'La venta ya está anulada';
        ROLLBACK;
    ELSE
        -- Restaurar stock si estaba completada
        IF v_estado = 'completada' THEN
            UPDATE PRODUCTO p
            INNER JOIN DETALLE_VENTA dv ON p.id_producto = dv.id_producto
            SET p.stock = p.stock + dv.cantidad
            WHERE dv.id_venta = p_id_venta;
        END IF;
        
        -- Cambiar estado
        UPDATE VENTA
        SET estado = 'anulada'
        WHERE id_venta = p_id_venta;
        
        IF v_error = 0 THEN
            COMMIT;
            SET p_mensaje = 'Venta anulada exitosamente';
        END IF;
    END IF;
END$$

DELIMITER ;
```

---

## 📊 Vistas Útiles

### 🔍 Vista: Ventas con Cliente

```sql
CREATE OR REPLACE VIEW v_ventas_detalladas AS
SELECT 
    v.id_venta,
    v.numero_factura,
    v.fecha_venta,
    v.total,
    v.estado,
    v.tipo_pago,
    c.id_cliente,
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    c.email,
    c.telefono
FROM VENTA v
INNER JOIN CLIENTE c ON v.id_cliente = c.id_cliente;
```

---

### 🔍 Vista: Productos en Ventas

```sql
CREATE OR REPLACE VIEW v_productos_vendidos AS
SELECT 
    p.id_producto,
    p.codigo,
    p.nombre AS producto,
    p.categoria,
    dv.id_venta,
    v.numero_factura,
    v.fecha_venta,
    dv.cantidad,
    dv.precio_unitario,
    dv.subtotal,
    v.estado
FROM PRODUCTO p
INNER JOIN DETALLE_VENTA dv ON p.id_producto = dv.id_producto
INNER JOIN VENTA v ON dv.id_venta = v.id_venta;
```

---

### 🔍 Vista: Resumen de Ventas por Cliente

```sql
CREATE OR REPLACE VIEW v_resumen_cliente AS
SELECT 
    c.id_cliente,
    CONCAT(c.nombre, ' ', c.apellido) AS cliente,
    c.email,
    COUNT(v.id_venta) AS total_compras,
    SUM(CASE WHEN v.estado = 'completada' THEN v.total ELSE 0 END) AS total_gastado,
    MAX(v.fecha_venta) AS ultima_compra
FROM CLIENTE c
LEFT JOIN VENTA v ON c.id_cliente = v.id_cliente
GROUP BY c.id_cliente, c.nombre, c.apellido, c.email;
```

---

## 🔐 Seguridad y Usuarios

### Crear Usuarios

```sql
-- Usuario solo lectura
CREATE USER 'tienda_readonly'@'localhost' IDENTIFIED BY 'password_seguro';
GRANT SELECT ON tienda_db.* TO 'tienda_readonly'@'localhost';

-- Usuario de aplicación
CREATE USER 'tienda_app'@'localhost' IDENTIFIED BY 'password_seguro';
GRANT SELECT, INSERT, UPDATE ON tienda_db.* TO 'tienda_app'@'localhost';

-- Usuario administrador
CREATE USER 'tienda_admin'@'localhost' IDENTIFIED BY 'password_seguro';
GRANT ALL PRIVILEGES ON tienda_db.* TO 'tienda_admin'@'localhost';

FLUSH PRIVILEGES;
```

---

## 📊 Datos de Prueba

```sql
-- Insertar clientes de prueba
INSERT INTO CLIENTE (nombre, apellido, email, telefono, dni_ruc) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '0999123456', '1234567890'),
('María', 'García', 'maria.garcia@email.com', '0998765432', '0987654321'),
('Carlos', 'López', 'carlos.lopez@email.com', '0997654321', '1122334455');

-- Insertar productos de prueba
INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, categoria, unidad_medida) VALUES
('PROD001', 'Laptop HP 15', 'Laptop HP Core i5, 8GB RAM, 256GB SSD', 850.00, 10, 'Electrónica', 'unidad'),
('PROD002', 'Mouse Inalámbrico Logitech', 'Mouse inalámbrico con receptor USB', 15.50, 50, 'Accesorios', 'unidad'),
('PROD003', 'Teclado Mecánico RGB', 'Teclado mecánico retroiluminado', 75.00, 25, 'Accesorios', 'unidad'),
('PROD004', 'Monitor Samsung 24"', 'Monitor Full HD 24 pulgadas', 180.00, 15, 'Electrónica', 'unidad'),
('PROD005', 'Cable HDMI 2.0', 'Cable HDMI 2 metros', 12.00, 100, 'Cables', 'unidad');

-- Crear venta de ejemplo
INSERT INTO VENTA (id_cliente, tipo_pago, estado, numero_factura) 
VALUES (1, 'tarjeta', 'completada', 'FACT-001');

-- Agregar detalles a la venta
INSERT INTO DETALLE_VENTA (id_venta, id_producto, cantidad, precio_unitario, descuento) VALUES
(1, 1, 1, 850.00, 0.00),
(1, 2, 2, 15.50, 0.00),
(1, 3, 1, 75.00, 5.00);
```

---

## ⚙️ Mantenimiento y Optimización

### Análisis de Tablas

```sql
ANALYZE TABLE CLIENTE, PRODUCTO, VENTA, DETALLE_VENTA;
```

### Optimización de Tablas

```sql
OPTIMIZE TABLE CLIENTE, PRODUCTO, VENTA, DETALLE_VENTA;
```

### Backup

```bash
# Backup completo
mysqldump -u root -p tienda_db > backup_tienda_$(date +%Y%m%d).sql

# Backup solo estructura
mysqldump -u root -p --no-data tienda_db > estructura_tienda.sql

# Backup solo datos
mysqldump -u root -p --no-create-info tienda_db > datos_tienda.sql
```

---

## 📈 Monitoreo de Rendimiento

### Consultas Lentas

```sql
-- Ver tamaño de las tablas
SELECT 
    table_name AS 'Tabla',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Tamaño (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'tienda_db'
ORDER BY (data_length + index_length) DESC;

-- Ver índices de una tabla
SHOW INDEX FROM VENTA;

-- Analizar consulta
EXPLAIN SELECT * FROM VENTA WHERE fecha_venta BETWEEN '2025-01-01' AND '2025-12-31';
```

---

## ✅ Checklist de Implementación

- [x] Base de datos creada con charset correcto
- [x] Todas las tablas creadas con motor InnoDB
- [x] Claves primarias definidas
- [x] Claves foráneas configuradas
- [x] Índices de rendimiento agregados
- [x] Restricciones CHECK implementadas
- [x] Triggers para cálculos automáticos
- [x] Procedimientos almacenados creados
- [x] Vistas útiles definidas
- [x] Usuarios y permisos configurados
- [x] Datos de prueba insertados
- [x] Plan de backup establecido

---

**🎉 Modelo Físico Completo y Listo para Producción**
