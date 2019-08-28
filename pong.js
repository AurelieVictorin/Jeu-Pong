var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
/* Permet de dessiner avec JS - Définit qu'il s'agit d'un dessin/jeu 2D - ctx = context */

var ballRadius = 10;
/* Pour définir le rayon de la balle */

var x = canvas.width/2;
var y = canvas.height-40;
/* Pour définir la position de départ de la balle sur la zone de jeu - x = axe horizontal, y = axe vertical */

var dx = 6;
var dy = -6;
/* Pour définir le déplacement de la balle à chaque setInterval selon les données dx (=x+5) et dy (=y-5) */

var paddleHeight = 15;
var paddleWidth = 80;
/* Pour définir la taille du paddle */

var paddleX = (canvas.width-paddleWidth)/2;
/* Pour définir la position de départ du paddle */

var rightPressed = false;
var leftPressed = false;
/* Pour définir les touches droite et gauche qui dirigent le paddle */

var brickRowCount = 10;
var brickColumnCount = 5;
/* Nombre de lignes et colonnes de briques */

var brickWidth = 75;
var brickHeight = 30;
/* Largeur et hauteur des briques */

var brickPadding = 20;
/* Espacement entre les briques */

var brickOffsetTop = 50;
var brickOffsetLeft = 30;
/* Postion par rapport au coin haut gauche */

var score = 0;
/* Pour comptabiliser le nombre de briques cassées */

var lives = 3;
/* Pour décompter le nombre de vies restantes à partir de 3 */

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
/* Tableau à 2 dimensions pour créer le mur de briques :
Boucle contenant les variables colonnes et lignes initialisées à 0 et allant de 1 en 1 jusqu'aux nombres définis par par les variables brickColumnCount et brickRowCount.
Les éléments du tableau sont positionner en (0,0) en haut à gauche et chaque 'cases' du tableau contient un élément.
?????????? */

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
/* Pour diriger le paddle avec le clavier ou la souris */

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
/* Si les touches droite / gauche sont pressées alors celà déclenche le déplacement droite / gauche */

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
/* Si les touches droite / gauche ne sont pas pressées alors celà stoppe le déplacement droite / gauche */

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          /* Boucle qui va comparer les coordonnées des briques à celles de la balle
          Si une brique est un élément (status == 1) et si la balle 'rentre en collision' avec cette éléments
          alors la brique disparait (status == 0) */

          score++;
/* A chaque brique 'détruite', le score prend +1 */

          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
/* Si le score est égal au nombre total des briques, c'est gagné et le jeu se recharge / redémarre */
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
/* Début du dessin de la balle */

  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
/* => distance du bord gauche (définit par var x),
distance du haut (définit par var y),
rayon de la balle (définit par var ballRadius),
angle de départ du dessin,
angle de fin du dessin (Math.PI = demi-cercle / Math.PI*2 = cercle entier),
false = sens des aiguilles / true = sens inverse des aiguilles */

  ctx.fillStyle = "yellow";
/* Pour définir un style à notre balle */

  ctx.fill();
/* Pour appliquer le style à notre balle
NB : pour les objets 'en mouvement' */

  ctx.closePath();
/* Fin du dessin de la balle */
}

function drawPaddle() {
  ctx.beginPath();
/* Début du dessin du paddle */

  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
/* Postion horizontale, position verticale, largeur, hauteur */

  ctx.fillStyle = "red";
/* Pour définir un style à notre paddle */

  ctx.fill();
/* Pour appliquer le style à notre paddle
NB : pour les objets 'en mouvement' */

  ctx.closePath();
/* Fin du dessin du paddle */
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
/* Boucle contenant les variables des colonnes et des lignes (idem ligne 56)
Si ??????????
La variable de positionnement horizontale des briques
La variable de positionnement verticale des briques */


        ctx.beginPath();
/* Début du dessin des briques */

        ctx.rect(brickX, brickY, brickWidth, brickHeight);
/* Ligne de briques, colonnes de briques, largeur de brique, hauteur de brique */

        ctx.fillStyle = "red";
/* Pour définir un style à nos briques */

        ctx.fill();
/*Pour appliquer le style à nos briques
NB : pour les objets 'en mouvement' */

        ctx.closePath();
/* Fin du dessin des briques */
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("SCORE : "+score, 8, 20);
}
/* Font, color et posiotion */

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("LIVES : "+lives, canvas.width-75, 20);
}
/* Font, color et position */

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
/* Pour effacer le dessin précédant le dernier setInterval */

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
/* Après l'effacement des dessins à chaque setInterval, appelle à nouveau les dessins 'actualisés' des briques, de la boule, du paddle, du score, du nombre de vies restantes sans afficher les briques déjà cassées */

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
/* Si la balle touche les bords de la zone de jeu à droite ou à gauche alors la direction de la balle est inversée */

  if(y + dy < ballRadius) {
    dy = -dy;
  }
/* Si la balle touche le bord de la zone de jeu en haut alors la direction de la balle est inversée */

  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
/* Le jeu continu :
Si la balle est toujours dans la zone de jeu.
Si elle touche le paddle et qu'alors la direction de la balle est inversée */
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
/* Sinon il y a vérification du nombre de vies restantes et s'il n'en reste pas alors c'est game over.
Et s'il y a game over, la page est rechargée */

      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 6;
        dy = -6;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
/* S'il reste des vies alors la balle et le paddle se repositionnent au centre bas */

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
/* Si les touches droite ou gauche sont pressées et que le paddle est dans la zone de jeu alors le paddle se déplace de 7 pixels à droite ou à gauche */

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
/* Boucle d'animation équivalent à setInterval */

draw();
/* = setInterval */
