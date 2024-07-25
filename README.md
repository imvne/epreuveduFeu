# epreuveduFeu
Ce répertoire contient les exercices de l'épreuve du feu Coding Accelerator

feu00.js - Échauffement
    
    Créez un programme qui affiche un rectangle dans le terminal.
    
    Exemples d’utilisation :
    $> python exo.py 5 3
    o---o
    |   |
    o---o
    
    $> python exo.py 5 1
    o---o
    
    $> python exo.py 1 1
    o
    
    Gérer les problèmes potentiels d’arguments.


feu01.js - Évaluer une expression

    Créez un programme qui reçoit une expression arithmétique dans une chaîne de caractères et 
    en retourne le résultat après l’avoir calculé.
    
    Vous devez gérer les 5 opérateurs suivants : “+” pour l’addition, “-” pour la soustraction, 
    “*” la multiplication, “/” la division et “%” le modulo.
    
    Exemple d’utilisation :
    
    $> ruby exo.rb “4 + 21 * (1 - 2 / 2) + 38”
    42
    
    Vous pouvez partir du principe que la chaîne de caractères donnée en argument sera valide.


feu02.js - Trouver une forme
    
    Créez un programme qui affiche la position de l’élément le plus en haut à gauche 
    (dans l’ordre) d’une forme au sein d’un plateau.
    
    Exemples d’utilisation :
    $> cat board.txt
    0000
    1111
    2331
    $> cat to_find.txt
    11
     1
    $> cat unfindable.txt
    00
    00
    
    $> ruby exo.rb board.txt to_find.txt
    Trouvé !
    Coordonnées : 2,1
    ----
    --11
    ---1
    
    $> ruby exo.rb board.txt unfindable.txt
    Introuvable
    
    Vous devez gérer les potentiels problèmes d’arguments et de lecture de fichiers.


feu03.js - Sudoku

    Créez un programme qui trouve et affiche la solution d’un Sudoku.
    
    Exemples d’utilisation :
    $> cat s.txt
    1957842..
    3.6529147
    4721.3985
    637852419
    8596.1732
    214397658
    92.418576
    5.8976321
    7612358.4
    
    $> ruby exo.rb s.txt
    195784263
    386529147
    472163985
    637852419
    859641732
    214397658
    923418576
    548976321
    761235894
    
    Afficher error et quitter le programme en cas de problèmes d’arguments.


feu04.js - Trouver le plus grand carré
    
    Créez un programme qui remplace les caractères vides par des caractères plein pour 
    représenter le plus grand carré possible sur un plateau. Le plateau sera transmis 
    dans un fichier. La première ligne du fichier contient les informations pour lire 
    la carte : nombre de lignes du plateau, caractères pour “vide”, “obstacle” et “plein”.
    
    Exemples d’utilisation :
    $> cat plateau
    9 .xo
    . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . x . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . x . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . x . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . x . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . x . . . . . . . . . . . . . . x . . . . .
    . . x . . . . . . . x . . . . . . . . . . . . . . . .
    
    $> ruby exo.rb plateau
    . . . . . o o o o o o o . . . . . . . . . . . . . . . 
    . . . . x o o o o o o o . . . . . . . . . . . . . . . 
    . . . . . o o o o o o o x . . . . . . . . . . . . . . 
    . . . . . o o o o o o o . . . . . . . . . . . . . . . 
    . . . . x o o o o o o o . . . . . . . . . . . . . . . 
    . . . . . o o o o o o o . . . x . . . . . . . . . . . 
    . . . . . o o o o o o o . . . . . . . . . . . . . . . 
    . . . . . . x . . . . . . . . . . . . . . x . . . . . 
    . . x . . . . . . . x . . . . . . . . . . . . . . . . 
    
    Vous devez gérer les potentiels problèmes d’arguments, de fichiers, ou de carte invalide.
    
    Une carte est valide uniquement si : les lignes ont toute la même longueur, il y a au 
    moins une ligne d’une case, les lignes sont séparées d’un retour à la ligne, les 
    caractères présents dans la carte sont uniquement ceux de la première ligne
    
    En cas de plusieurs solutions, le carré le plus en haut à gauche sera choisi.
    
    Vous trouverez un générateur de plateau sur la feuille suivante.

feu05.js - Labyrinthe
    
    Créez un programme qui trouve le plus court chemin entre l’entrée et la sortie d’un labyrinthe 
    en évitant les obstacles.
    
    Le labyrinthe est transmis en argument du programme. La première ligne du labyrinthe contient 
    les informations pour lire la carte : LIGNESxCOLS, caractère plein, vide, chemin, entrée et sortie du labyrinthe. 
    
    Le but du programme est de remplacer les caractères “vide” par des caractères “chemin” pour 
    représenter le plus court chemin pour traverser le labyrinthe. Un déplacement ne peut se faire 
    que vers le haut, le bas, la droite ou la gauche.
    
    Exemples d’utilisation :
    $> cat -e example.map
    10x10* o12$
    *****2****$
    * *   ****$
    *   **** *$
    * ****   *$
    *  *     2$
    *  ** *  *$
    *     * **$
    ***  **  *$
    1     ****$
    **********$
    
    $> ruby exo.rb example.map
    10x10* o12
    *****2****
    * *   **** 
    *   **** *
    * ****   * 
    *  * oooo2
    *  **o*  *
    *  ooo* **
    ***o **  *
    1ooo  ****
    **********
    => SORTIE ATTEINTE EN 12 COUPS !
    
    Vous devez gérer les erreurs / Vous trouverez un générateur de labyrinthe en annexe de cet exercice.


feu06.js - Feu okay

    Créez un programme qui célèbre votre victoire.
    
    Exemples d’utilisation :
    $> python exo.py
    J’ai terminé l’Épreuve du Feu et c’était [].
    $>
    
    Note : [] est à remplacer par un adjectif de votre choix (facile ?)
