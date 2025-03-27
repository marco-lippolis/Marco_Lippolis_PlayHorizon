
## Descrizione

* PlayHorizon è una web App interamente sviluppata in React che da' la possibilità all'user di navigare tra la vasta gamma di giochi presenti e interagire con essi, sia sfogliandoli nella Home, sia filtrandoli per genere, sia ricercandoli utilizzando la barra di ricerca. Inoltre l'app permette agli utenti autenticati di inserire i giochi nei preferiti, e di interagire live con altri utenti tramite la Real Time Chat presente in ogni pagina di gioco. Non perdere tempo e corri subito a registrarti e a modificare il tuo profilo tramite l'inserimento di un avatar personalizzato da sfoggiare nel sito!

## API

* Il sito si avvale dell'API di rawg.io (https://rawg.io/apidocs) per ottenere tutti i dati dei videogiochi, e di Supabase(https://supabase.com/) come BaaS per la gestione del database.

## Stile

* PlayHorizon è stato realizzato utilizzando CSS puro e Bootstrap.

## Pagine

1. Home - Pagina principale del sito che presenta l'elenco dei videogiochi, i filtri per genere e la barra di ricerca per testo
2. Pagina dettaglio - Info dettagliate del gioco con bottone per l'aggiunta e la rimozione ai preferiti, e la interattiva RealTime Game Chat
3. Autenticazione - Pagina di SignUp e SignIn
4. Pagina Profilo - Modifica del profilo utente con possibilità di caricamento dell'avatar.

## User Interactions

Non Autenticati

1. Scrollare sui giochi in piattaforma
2. Filtrare per nome del gioco
3. Registrarsi con email e password in piattaforma

Autenticati
1. Partecipare alla live chat
2. Inserire un gioco tra i preferiti
3. Visualizzare e aggiornare le informazioni del profilo

## Context

1. SessionContext - Gestisce i dati della sessione dell'utente

## Dipendenze
1. "@supabase/supabase-js"
2. "bootstrap"
3. "bootstrap-icons"
4. "sonner"
5. "react-router"
6. "react"


## Deployment

* Rimpiazza con il link online della tua App.