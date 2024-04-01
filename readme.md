# Rest Room Ready

Rest Room Ready est une application web qui aide les utilisateurs à trouver des toilettes dans la ville de Paris. Elle offre une interface cartographique avec des emplacements de toilettes marqués, permettant aux utilisateurs de localiser facilement les installations les plus proches.

## Fonctionnalités

- **Carte interactive :** L'application propose une carte interactive alimentée par l'API JavaScript de Google Maps. Les utilisateurs peuvent zoomer, dézoomer et parcourir la carte pour explorer les emplacements des toilettes.
  
- **Effet de néon dans l'en-tête :** L'en-tête de l'application présente un effet de néon dynamique, lui donnant une apparence stylée et accrocheuse.
  
- **Style personnalisé :** L'application a été stylisée pour ressembler à la mise en page d'une application mobile, avec des coins arrondis et une encoche en haut.

## Utilisation

Pour utiliser Rest Room Ready, il suffit d'ouvrir l'application web dans votre navigateur. Vous verrez une interface cartographique avec des emplacements de toilettes marqués. Vous pouvez interagir avec la carte pour explorer différents quartiers de Paris et trouver les toilettes les plus proches.

## Technologies Utilisées

- HTML
- CSS
- JavaScript
- API JavaScript de Google Maps

## Installation

### Si vous avez une clé API

1. Si vous disposez d'une clé API, créez un fichier `apikey.txt` dans le dossier du projet et y mettez votre clé API.
2. Modifiez le fichier `config.json` et mettez `true` pour le paramètre "api".
3. créer un server python http en local sur votre machine
```bash
  python -m http.server
  ```

### Si vous n'avez pas de clé API

Aucune installation n'est nécessaire pour utiliser Rest Room Ready. Il suffit d'ouvrir le fichier HTML fourni (`index.html`) dans votre navigateur web préféré.
