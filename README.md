# FoodtruckBooking
FoodtruckBooking est l'application Web réalisée pour mon test technique. Il s'agit d'une stack Angular 13 (LTS) et symfony 5 (LTS) avec une base de données MySQL 5.7. Comme symfony utilise l'ORM Doctrine la base de données peut facilement être adaptée par simple configuration du fichier .env a la racine du backend.

# Architecture du projet

## Front
L'architecture frontale est celle recommandée par Google (auteur du framework en question).
Nous avons donc un dossier "src" contenant l'ensemble des ressources, un sous-dossier "app" contenant l'application elle-même. Dans ce dossier, vous trouverez certaines bonnes pratiques.
La première est relative au dossier "interfaces". En effet, Typescript nous permet de créer des interfaces afin de typer nos objets customs.
L'autre est le dossier "services". Bien que la communauté ne soit pas toujours d'accord sur le placement des services angular j'utilise personnellement un dossier spécifique pour placer l'ensemble de mes services afin d'apporter un maximum de claireté.
Vous remarquerez également l'utilisation de dossiers spécifique pour les modules des composants et ceux correspondant au routing de l'application. Cette séparation est utile (selon moi) quand nous voulons faire du "lazy-loading". J'y reviendrai plus tard.
Chaque composant a sont dossier avec sa vue (html), son style (ici scss), sa logique (ts) et son fichier de test (spec.ts).
Vous remarquerez enfin l'utilisation d'un dossier "shared". Utilisé principalement dans le cadre de la mise en place d'un "lazy-loading" ce dossier référence les composants partagés dans plus autres composant de l'application.
note : bien évidement un sharedModule est aussi visible dans le dossier "module"

## Back
Le backend est une application Symfony (PHP) 5.4 exposant une API (Application Programming Interface) atteignant le niveau 2 (en partant de 0) sur le model de maturité de Richardson.
L'API reste assez simple. Elle ne fait qu'exposer le système pour manipuler les données (opérations CRUD) et persiter les informations.
L'architecture de du backend est très standard pour une application Symfony (depuis la version 4). On utilise ici un model MVC où la View est déléguée a l'application Angular.
Le dossier "Controller" implémente le traitement des requêtes, celui des Entity représente le "Model" c'est à dire la représentation de nos données.
Le dossier "Repository" concerne les actions sur la manipulation de notre model. On y trouvera entre autre les "méthodes magiques" Find(), FindBy() et nos requêtes personnalisées.
Ici j'ai personnellement opté pour l'utilisation du queryBuilder mais j'aurai pu tout aussi bien utiliser la syntaxe de Doctrine (DQL).

# Récupération de l'application

Bien sur pour lancer l'application il faut la récupérer. Voici la procédure.

## Cloner le dépôt

Le dépôt GitHub est public. Vous pourrez donc le cloner sans difficulté via un client graphique Git ou un terminal avec Git
La commande est git clone ''url du depot''

## Installer les dépendances
### Front
Les deux projets ont des dépendances externes que nous devons installer.
Pour le projet Angular rendez vous dans le dossier en question et lancer npm i
ATTENTION : vérifié a bien avoir la dernière version LTS de nodeJS et de NPM pour na pas rencontrer de souci

### Back
pour le backend rendez vous dans le dossier concerné et lancer composer install
ATTENTION : Vérifié a bien avoir PHP 8.1 et composer 2 installé sur votre machine ainsi bien sur qu'une base de données.
## Configurer l'accès a la base de données

Toujours dans le dossier du backend créer un fichier .env.local (afin d'écraser le .env) et configurer la ligne "DATABASE_URL" (je vous renvoie sur la documentation de symfony pour cette tache).

## Créer la base de données

Toujours dans le dossier du backend lancer la commande php bin/console : doctrine:database:create (ou son racourcci d:d:c) et lancer ensuite php bin/console doctrine:migrations:migrate afin de lancer les migrations pour mettre a jour le schema de la base de données.
Vous auriez aussi pu alncer php bin/console doctrine:schema:update --force (ou son raccourci d:s:u --force)

## Configurer l'URL de communication
Dans l'application Angular rendez-vous dans le dossier src/environments et editer le fichier environment.ts.
Mettez a jour l'URL de communication de la propriété baseApiUrl.
Par défaut la communication avec le backend se fait sur http://localhost:8081

# Lancer l'application
Dans un premier temps, lancer le backend.Alors vous avec le choix en symfony-cli et le serveur PHP par défaut. Pour des raisons de simplicité j'ai choisi ici d'utiliser le serveur PHP.
Dans le backend rendez-vous dans public et lancer la commande php -S localhost:8081 (ou n'importe quelle URL tant quelle correspond a celle mise dans le fichier environment.ts da l'application Angular).

Pour ensuite lancer l'application frontale rendez vous dans le dossier de l'application Angular  et lancer ng serve --open (a condition que vous ayez fait un npm install -g @angular/cli@13.*).
Sinon lancer npm start.
Voila normalement un navigateur s'ouvre avec l'application frontale communiquant avec le backend.

# Sécurité
## CORS
Ici une sécurité très basique est mise en place est la gestion des cross-origin. En effet la politique de sécurité de n'importe quel navigateur web qui se respecte impose que les requêtes soient faites depuis la même base d'URL.
Le backend, ici, autorise le communication depuis un autre domaine (avec le package NelmioCorsBundle).

## XSS
Angular gére très bien lui même les failles XSS (qui sont depuis très longtemps dans le top 10 OWASP), grâce a sont utilisation du shadow DOM.
Dans le test technique il ne devrait pas y avoir de failles de ce type car aucune reférence au DOM réel n'est faite (par exemple avec les ElementRef).

# Améliorations
## Ergonomie
L'UI n'est pas vraiment mon fort, l'UX non plus. Cependant l'application reste utilisation sans vraiment de difficulté. Les couleurs et les Widgets peuvent être très largement améliorés. Je me félicite d'avoir eu recours à l'utilisation de la librairie Angular Material qui me facilite toujours la vie.
## SCSS
J'ai ici mis en place a titre de démonstration les bases d'un template avec la technologie SCSS (du css compilé). L'utilisation des variables de façon plus intensive devrait être réalisée.
## Communication inter-composant
J'ai eu recours a un certain nombre de @Input @Output qui permettent la communication entre composants imbriqués. La mise en place de @Output n'a pas totalement était un succès (ai-je manqué de temps ou de lucidité ?)
## Sécurité
Bien j'ai conscience que l'application n'est pas a destination d'une production future, mais dans l'hypothèse contraire, je ne pourrai que recommander l'utilisation d'un rateLimiter afin de limiter les requêtes intempestives trop nombreuse souvent issues de BotNet malveillants.
Peut être également vérifier une liste noire des user-agent malveillant connu et de ce fait leur interdire l'accès.
Dans ce cas précis nous n'avons pas recours a une authentification, donc pas de page de login ou de JWT mais dans le cas d'une prod nous devrions certainement le considérer très sérieusement.
Evidemment dans le cas d'un accès avec plusieurs utilisateurs il serait presque vital de mettre en place un système backend avec des Voters afin de vérifier les droits d'accès.
Toujours dans un cadre de sécurité nous aurions pu mettre en place des Guards  en front sur certaines routes si besoin.
Bien sur comme il n'y a pas a proprement parlé d'utilisateur enregistré sur le site pas besoin de chiffrer les données mais il faut bien prendre en compte qu'il s'agit d'une loi relative au RGPD (cf : le site de CNIL)

# Détail important
J'ai utilisé le package @angular/pwa@13.* afin de rendre la partie frontale en tant que PWA. Pour des raisons de sécurité, la PWA est désactivée si la connexion n'est en HTTPS avec un certificat SSL valide.

Enjoy use !