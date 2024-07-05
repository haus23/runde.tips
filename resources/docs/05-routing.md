# Routing

Schon bei den ersten Implementierungen habe ich auf `remix-flat-routes`
gesetzt. Da die neue Fullstack-Implementierung noch tiefer geschachtelt wird,
bleiben wir bei dieser Entscheidung.

Außer bei Pfad-Segmenten sollten alle Route-Dateien englische Namen tragen und
die exportierte Default-Komponente den gleichen mit einem `Route`-Suffix.
Somit muss jede Route in einem seperaten Ordner sein.
