# HackersApp

Projet en lien avec un TD, pour apprenti développeur

En test de déploiement, via github pages


## Security and not

étant donné que cette application utilise un service gratuit de localisation d'IP qui ne propose pas d'accès sécurisé (http only), par défaut les requêtes sortant or https sont bloquée. 

Pour remédier temporairement à cette sécurité, nous devons demandé au navigateur de permettre les appels API en http, via une directive meta

```html
 <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

## Build

Dans le terminal de l'application, lancer

 `ng build --output-path docs --base-href /hackers-app/` 
 
 pour diriger les artefacts de construction dans le dossier `docs\`.

Sur GutHub, il est nécessaire d'activer `github pages` en désignant la bonne branche et le dossier `docs`

## lien du déploiement

[https://ldv-melun.github.io/hackers-app/](https://ldv-melun.github.io/hackers-app/)

