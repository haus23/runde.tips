# Prisma ORM

Nach einer kurzen Evalution habe ich mich für Prisma als ORM entschieden.
Gründe waren definitiv die besseren und zahlreicheren Features gegenüber
Drizzle, das ich auch in Betracht gezogen hatte.

Insbesondere fehlte mir an Drizzle einiges beim Type-Mapping. Generell würde
ich den schlankeren Ansatz eigentlich bevorzugen.

Sehr hilfreich ist überigens die VS Code Erweiterung: [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

## Dev Workflow

Nachdem ich zu Beginn des Projektes auf Migrationen verzichte habe, wird jetzt
konsequent auf diese gesetzt.

Workflow-Steps:

1. Änderungen am Prisma Schema
2. `pnpm prisma db push`
3. Mit einem Release: `pnpm prisma migrate dev`

1. Änderungen am Prisma Schema
2. `npx prisma db push` (generiert auch den Client, ansonsten: `npx prisma generate`)

## Prod Deployment

Da ich ohne CI/CD auskomme (oder auskommen muss), bleibt die Prisma-CLI (`prisma`) in
den Prod-Dependencies. Und nach einem Release und Docker-Build muss auf dem Image
ein `pnpm prisma migrate deploy` ausgeführt werden. Das Docker-Image sollte nur den
`@prisma/client` generieren.
