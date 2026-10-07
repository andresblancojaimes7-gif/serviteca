# SERVITECA ADSO — interfaz web/móvil

Prototipo responsive en React + TypeScript + Tailwind CSS para las interfaces de SERVITECA ADSO:

En pantallas de escritorio, la aplicación se presenta en un marco centrado de smartphone con viewport de aproximadamente **390 × 844 px**. En pantallas pequeñas se muestra a pantalla completa; el panel administrativo usa menú hamburguesa y el portal del cliente incorpora navegación inferior táctil.

- **INT-01:** inicio de sesión con selector de rol de demostración.
- **INT-02A:** Home administrativo por defecto, con métricas 04/04/07, accesos rápidos y barra inferior para Clientes, Carros, Servicios y Ayuda.
- **INT-03/04/05:** formularios para registrar clientes, carros y servicios.
- **INT-06:** búsqueda del historial de servicios por placa con filtros.
- **INT-02B:** Home del cliente con resumen de autos y servicios, vehículo principal, último servicio y barra inferior para Inicio, Autos, Historial y Ayuda.

## Requisitos y ejecución local

- Node.js 20 o superior
- npm

```bash
npm install
npm run dev
```

## Validar

```bash
npm run build
npm run lint
```

## Netlify
El archivo netlify.toml configura el comando npm run build y el directorio estático dist. Producción está publicada en https://serviteca-adso.netlify.app.

## Alcance de la demostración

Esta entrega es solo front-end. El selector de rol permite recorrer ambas vistas sin validar credenciales; los formularios y registros guardan estado únicamente durante la sesión del navegador. No hay autenticación real, backend ni persistencia. El aviso de alta de cliente muestra las credenciales de ejemplo solicitadas en el prompt: `CarlosP234` / `58291#Carlos`; no son una cuenta real.
