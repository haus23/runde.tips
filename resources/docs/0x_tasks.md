# Handling long running tasks

> Zum Beispiel die Synchronisierung kompletter Turniere aus dem Firestore-Backup in
> die lokale SQLite-Instanz.

## The Task

- Task-Start: `/manager/sync` in der Methode `syncChampionship`
- Task-Runner: `/action/sync/championship-data`
