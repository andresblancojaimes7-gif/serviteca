export function DeviceFrame() {
  return (
    <main className="device-stage" aria-label="Vista previa móvil de SERVITECA ADSO">
      <div className="device-shell">
        <span className="device-camera" aria-hidden="true" />
        <iframe
          className="device-screen"
          title="Aplicación móvil SERVITECA ADSO"
          src="/"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </main>
  )
}
