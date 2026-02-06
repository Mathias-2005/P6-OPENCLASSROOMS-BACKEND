# Développez le back-end d'un site de notation de livres

### Mon Vieux Grimoire

(Projet 6 - Formation en Web Développement - Openclassrooms)

![uses-js](https://github.com/user-attachments/assets/605c5bd5-545a-4e13-ab6c-4af9a65ad096)
![uses-nodejs](https://github.com/user-attachments/assets/5546f375-578e-4f01-a71b-9ebff4a0f12b)
![uses-mongodb](https://github.com/user-attachments/assets/217dfca5-c302-4464-8d8c-ab61f8c39f6a)

## Scénario 

Vous êtes développeur back-end en freelance depuis maintenant un an dans la région de Lille.
Vous avez l’habitude de travailler avec Kévin, un développeur front-end plus expérimenté que vous, et qui a déjà un bon réseau de contacts dans le milieu.  
Kévin vous contacte pour vous proposer de travailler avec lui en mutualisant vos compétences front / back sur un tout nouveau projet qui lui a été proposé.
Il s’agit d’une petite chaîne de librairies qui souhaite ouvrir un site de référencement et de notation de livres : Mon Vieux Grimoire.

## Compétences évaluées 

Implémenter un modèle logique de données conformément à la réglementation

Mettre en œuvre des opérations CRUD de manière sécurisée

Stocker des données de manière sécurisée

## Evaluation 
***Evaluation***: Vendredi 06 février 2026 -> **Projet Validé**

### Soutenance
***Remarques***: Le projet repose bien sur Node.js, Express Node.js et une base de données MongoDB. L'application fonctionne sans erreur. Pour les uploads d'image, l'étudiant a mis en place multer, qui permet la gestion des fichiers et l'enregistrement en format webp (green code). 
Durant la présentation, l'étudiant a démontré que l'application se lance sans erreur et le code lié à multer.
L'application effectue bien les différents appels attendus, les neufs routes 'books' et 'users' sont bien présentes et permettent d'interagir avec la base selon les besoins : création, suppression, mise à jour, récupération. 
Durant la session de questions/réponses, l'étudiant a expliqué l'utilité d'un middleware et son utilisation. 
Pour toutes les interactions avec la base de données, l'étudiant a prévu de renvoyer des erreurs en cas de problème. 
Pour la partie utilisateur, l'étudiant s'est appuyé sur le plugin Mongoose pour vérifier que l'email est unique. Le mot de passe est lui hashé avec bcrypt (l'étudiant en a fait la démonstration pendant la session de questions/réponses).
Toutes les routes sont sécurisées via middleware permettant ainsi de ne pas interagir avec la base sans authentification. 
Un créateur peut modifier son livre (hors notation). Un utilisateur simple peut uniquement noter un livre. 
Le projet est accessible sur github (18 commits), il peut être récupéré et réinstallé. 
## Ressources utilisées 

Visual Studio Code - Editeur de codes

Documentation Officiel

Cours Openclassrooms

