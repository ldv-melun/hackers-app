# HackersApp

Projet en lien avec un TD, pour apprenti développeur

En test de déploiement, via github pages


## Security and not

Le fournisseur de géolocalisation d'IP que nous avions sélectionné (http://api.ipstack.com) ne propose pas d'accès sécurisé pour le mode gratuit (`http only`).

Ceci est **incompatible** avec la solution GitHub Pages qui est en **https**. Ainsi, pour des raisons de sécurité, l'application, étant délivrée via `https`, ne permet pas de communiquer avec un tiers en mode non chriffré, **les requêtes sortantes en http sont du coup bloquées**. 

Nous avons du changer de fournisseur API de gélocalisation. 

Nous avons opté pour https://ipapi.co/#pricing qui propose un accès `https` avec la solution gratuite.

Par contre, nous n'avons pas de lien vers le drapeau. Nous utilisons celui du précédent fournisseur (qui propose librement ce lien en https) 

## Build

Sur GutHub, il est nécessaire d'activer `github pages` en désignant la bonne branche et le dossier `docs`

Côté client, dans le terminal de l'application, lancer

 `ng build --output-path docs --base-href /hackers-app/` 
 
 pour diriger les artefacts de construction dans le dossier `docs\`.

Puis commit et push.

## lien du déploiement

L'application est accessible via : 
```
https://<nom user github>.github.io/<non projet>
```

Dans notre cas :

[https://ldv-melun.github.io/hackers-app/](https://ldv-melun.github.io/hackers-app/)

