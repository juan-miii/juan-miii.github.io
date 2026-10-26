# Procedencia y casos negativos

Verificación esperada:

- Un paquete modificado invalida su digest y la atestación.
- Sin atestación no se despliega.
- Un commit o firmante inesperado se rechaza.
- La verificación fallida bloquea `deploy`.

Pruebas negativas deben ejecutarse en un entorno controlado antes de anunciar attestation.
