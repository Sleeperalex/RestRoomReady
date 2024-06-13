# Rest Room Ready

Rest Room Ready est une application web qui aide les utilisateurs à trouver des toilettes dans la ville de Paris. Elle offre une interface cartographique avec des emplacements de toilettes marqués, permettant aux utilisateurs de localiser facilement les installations les plus proches.

## Fonctionnalités

- **Carte interactive :** L'application propose une carte interactive alimentée par l'API JavaScript de Google Maps. Les utilisateurs peuvent zoomer, dézoomer et parcourir la carte pour explorer les emplacements des toilettes.
  
- **Style personnalisé :** L'application a été stylisée pour ressembler à la mise en page d'une application mobile, avec des coins arrondis et une encoche en haut.

## Utilisation

Pour utiliser Rest Room Ready, il suffit d'ouvrir l'application web dans votre navigateur. Vous verrez une interface cartographique avec des emplacements de toilettes marqués. Vous pouvez interagir avec la carte pour explorer différents quartiers de Paris et trouver les toilettes les plus proches.

## Technologies Utilisées

- HTML
- CSS
- JavaScript
- Python
- API JavaScript de Google Maps

## Installation

```bash
  git clone https://github.com/Sleeperalex/RestRoomReady.git
  ```
### Si vous avez une clé API

1. Si vous disposez d'une clé API, créez un fichier `apikey.txt` dans le dossier du projet et mettez votre clé API.
2. Modifiez le fichier `config.json` et mettez `true` pour le paramètre "api_map".

### Fonctionnement
1. Allez dans le dossier du projet.

```bash
  cd .\RestRoomReady\
  ```
2. lancer le serveur

```bash
  python server.py
  ```
ouvrez une page web et aller sur http://localhost:8000

3. faite un Ctrl+C dans votre terminal pour arreter le serveur.