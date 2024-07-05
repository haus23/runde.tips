# Remix Server

Die App setzt auf den eingebauten Express-Server von `@remix-run/serve`.
Solange wir keine Anpassungen benötigen (CSP oder ähnliches) bleibt der
Server als Produktions-Abhängigkeit im `package.json`.

Andernfalls wird gewechselt auf den Adapter `@remix-run/express`.
