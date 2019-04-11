var game = new Phaser.Game(800, 800);
var vitesse = 600;

var dodger = {
    preload: function(){
        //Chargement image et le son.
        game.load.image('ciel','ressources/images/ciel.png');
        game.load.image('troll','ressources/images/troll.png');
        game.load.image('YimPhilippe','ressources/images/YimPhilippe(1).png');
    },
    create: function() {
        //Setup + affichage.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'ciel');

        this.player = game.add.sprite(300,500, 'troll');
        this.player.anchor.set(0.5)
        game.physics.arcade.enable(this.player);

        this.cursors = game.input.keyboard.createCursorKeys(); 
        
        this.YimPhilippes = game.add.group();

        this.timer = game.time.events.loop(200, this.ajouterUnMechant, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#fff"}); //Emplacement du text, personnalisation(taille,color etc).



    },
    update : function() {
        //logique du jeux
        game.physics.arcade.overlap(this.player, this.YimPhilippes, this.restartGame, null, this); // Permet de créer les collisions (entre le player et les mechants)
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = vitesse * -1;
        }
        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = vitesse;
        }
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = vitesse * -1;
        }
        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = vitesse;
        }
        if (this.player.inworld == false) {
            this.restartGame();
        }
    },
    restartGame: function() { 
        game.state.start('dodger');
        alert('GAME OVER. Merci pour votre participation. Vous pouvez rejouer.'); 
    },
    
    ajouterUnMechant() {
        var position = Math.floor(Math.random() * 770) + 1; //Pour arrondir (-50 pour le mechant)
        var YimPhilippe = game.add.sprite(position, -50, 'YimPhilippe'); //détermine la ou spawn les méchants.
        game.physics.arcade.enable(YimPhilippe);
        YimPhilippe.body.gravity.y = 200;

        this.YimPhilippes.add(YimPhilippe);

        this.score += 20; //Nombre de point obtenue pas méchant généré et plus on reste en vie plus sa augmente.
        this.labelScore.text = this.score; //Permet au score de s'additionner.


        YimPhilippe.checkWorldBounds = true; //vérifier si les mechant sont dedans ou en dehort du "monde".
        YimPhilippe.outOfBoundsKill = true; // Si il est en dehort du "monde" il meurt.
    }
};

game.state.add('dodger', dodger);
game.state.start('dodger');