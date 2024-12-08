document.addEventListener('DOMContentLoaded', () => {
    // Tu código existente
    // ...

    // Registro del Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('SW registrado: ', registration);
            }).catch(registrationError => {
                console.error('Fallo en el registro del SW: ', registrationError);
            });
        });
    }
});
