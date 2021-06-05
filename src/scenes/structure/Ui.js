class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
        this.hp = 3;
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.spritesheet('plume', 'assets/plume.png',
            { frameWidth: 33, frameHeight: 36  }
        );
    }
    create (){
        console.log("create Ui")

        this.score=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._scoreText = this.add.text(16, 16, '...', {
            font:'32px "PP Jungle Bones"',
            fill: '#fff'
        });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
            font:'32px "PP Jungle Bones"',
            align: 'right',
            fill: '#fff'
        })

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
            font:'24px "PP Jungle Bones"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        /**
        * Le champ texte des points de vie
        * @type {Phaser.GameObjects.Text}
        * @private
        */
        this._hpText = this.add.text(16, 16+80, '', {
            font:'16px "PP Jungle Bones"',
            fill: '#fff'
        });

        this._tableauText.originX=1;
        this._tableauTextClass.originX=1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)



        //let pad=new GamePad(this,0,0);
        let pad=new GamePadButtons(this,0,0);
        pad.x=this.sys.canvas.width-pad.size-32;
        pad.y=this.sys.canvas.height-pad.size-32;



        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;

        this.anims.create({
            key: 'plume',
            frames: this.anims.generateFrameNumbers('plume', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.plumeScore = this.add.sprite(42, 35, 'plume')

    }
    
    // Score
    gagne(points=1)
    {
        this.score+=points;
        this._scoreText.setText('      ' + this.score + '/5');
    }

    perd(points = 0) {
        this.score = 0;
        this._scoreText.setText('      ' + this.score + '/5');
        ;
    }

    cacherUI(){

        if (this.uiActif === false) {
            this._scoreText.setAlpha(0);
            this.plumeScore.setAlpha(0);
            this._tableauText.setAlpha(0);
            this._tableauTextClass.setAlpha(0);
            this._hpText.setAlpha(0);
        }else{
            this._scoreText.setAlpha(1);
            this.plumeScore.setAlpha(1);
            this._tableauText.setAlpha(1);
            this._tableauTextClass.setAlpha(1);
            this._hpText.setAlpha(1);
        }
    }

    update(){
        if(Tableau.current){
            this._tableauText.setText(Tableau.current.scene.key);
            //this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
