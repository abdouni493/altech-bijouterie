# Altech Bijouterie — Système de Gestion

Application de gestion complète pour bijouterie : **or, argent et tout autre métal**.
Stock, point de vente, ateliers, employés, trésorerie, rapports et boutique en ligne —
en français et en arabe.

Cette version fonctionne **entièrement hors ligne, sans base de données** : toutes les
données proviennent d'un jeu de démonstration constant (`src/data/demoData.ts`) chargé
en mémoire au démarrage. Chaque écran est pleinement interactif ; un rechargement de la
page restaure le jeu de données d'origine.

## Démarrage

**Prérequis :** Node.js 18+

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production dans dist/
```

### Se connecter

Sur l'écran de connexion, cliquez sur **« Essayer la démo — compte Admin »** pour entrer
directement avec un profil administrateur. Les identifiants suivants fonctionnent aussi :

| Rôle          | Identifiant | Mot de passe |
| ------------- | ----------- | ------------ |
| Administrateur| `demo`      | `demo`       |
| Administrateur| `admin`     | `admin`      |
| Employé       | `amine`     | `amine123`   |
| Employé       | `nadia`     | `nadia123`   |
| Employé       | `rachid`    | `rachid123`  |

La boutique publique est accessible sans compte : `http://localhost:3000/?view=shop`.

## Modèle métier : métaux, types de stock, formes

L'application n'est pas liée à un seul métal.

- **Métal** (`MetalCategory`) — la famille de matière : *Or*, *Argent* (fournis d'office),
  plus tout métal créé par l'utilisateur (*Or Blanc*, *Platine*, *Plaqué Or*, …).
  Chaque métal porte sa couleur d'accent, ses calibres et son **prix de référence au gramme**,
  qui sert de coût matière dans tous les calculs de marge.
- **Type de stock** (`MetalType`) — un article concret rattaché à un métal, ex. « Or 18k Italien »
  ou « Argent 925 Local ». Peut être suivi au **poids**, en **cassie** (matière brute) ou
  **à la pièce**.
- **Forme** — la découpe du stock par modèle de bijou (bague, collier, bracelet…).

Tout se gère dans **Catalogue** (métaux, formes, calibres) et **Gestion de Stock**
(types de stock, avec leur métal).

## Structure du projet

```
src/
  main.tsx                 point d'entrée
  App.tsx                  layout, routage par onglet
  context/AppContext.tsx   store applicatif en mémoire (toutes les données + actions)
  data/
    demoData.ts            jeu de données de démonstration (remplace la base de données)
    algeriaWilayas.ts      wilayas et communes d'Algérie
  types/index.ts           modèle de données
  i18n/translations.ts     traductions FR / AR
  animations/, utils/, styles/
  components/
    auth/        connexion
    layout/      barre latérale, en-tête
    dashboard/   tableau de bord, rapports
    catalog/     stock, catalogue (métaux / formes / calibres)
    purchasing/  fournisseurs, achats, achats cassie
    sales/       POS, factures, remplacements, clients
    workshop/    ateliers, réparations & industrie, livraisons
    staff/       employés, paie
    finance/     trésorerie, dépenses, dettes, historique de paiements
    webshop/     administration du site et commandes en ligne
    storefront/  boutique publique
    settings/    paramètres
```

## Données

- **Sauvegarde** — *Paramètres → Données* exporte un instantané JSON de l'état courant.
- **Restauration** — le même écran réimporte un fichier exporté.
- **Réinitialisation** — un bouton remet le jeu de démonstration d'origine.
