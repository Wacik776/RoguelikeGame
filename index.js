const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 640

function Scene(screen, controls) {
    this.canvas = screen.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.controls = controls;
    this.imgs = screen.imgs;

}

//Загрузка изображений в сцену
function Lib(screen, controls) {
    Scene.apply(this, arguments);
    this.assets = [
            { name: 'player', path: 'images/player.png' },
            { name: 'orc', path: 'images/orc.png' },
            { name: 'bg', path: 'images/tiles.png' },
            { name: 'title', path: 'images/title1.png' }
        ];

		this.total = this.assets.length;
		this.loaded = 0;
		this.status = "loading";


		this.loaded_at = 0;

		var self = this;
		for(var i=0; i < this.total; i++) {
			var img = new Image();
			img.onload = function() {
				self.loaded++;
			};
			img.src = self.assets[i].path;
			screen.imgs[self.assets[i].name] = img;

		}

	}

	Lib.prototype = Object.create(Scene.prototype);
	Lib.prototype.constructor = Lib;

	Lib.prototype.render = function (time) {
		if(this.status == "loading") {
			if(this.loaded == this.total) {
				this.status = "loaded";
				this.loaded_at = time;
			}
			this.ctx.fillStyle = '#000000';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );
			this.ctx.fillStyle = '#ffffff';
			this.ctx.font="22px Georgia";
			this.ctx.fillText("Loading " + this.loaded + '/' + this.total,50,70);
			return "lib";
		}

		if(this.status == "loaded") {
			if((time - this.loaded_at) > 1000) {
				return "menu";
			} else {
				return "lib";
			}
		}

	}



	function Win(screen, controls) {
		Scene.apply(this, arguments);
	}

	Win.prototype = Object.create(Scene.prototype);
	Win.prototype.constructor = Win;


	Win.prototype.render = function (time) {
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );
		this.ctx.fillStyle = '#ffffff';
		this.ctx.font="22px Georgia";
		this.ctx.fillText("You won!",50,70);
		return "win";
	};


//Отрисовка основного меню
function Menu(screen, controls) {
    Scene.apply(this, arguments);
}

Menu.prototype = Object.create(Scene.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function (time) {

	this.ctx.drawImage(this.imgs['title'],
				0,0,1024,640,
				0,0,1024,640);

			this.ctx.fillStyle = '#FFFFFF';
			this.ctx.font="36px Arial";
			this.ctx.fillText("Нажмите пробел",355,500);
		if(this.controls.states['fire']) {
			return "game";
		} else {
			return "menu";
		}
	};



function Game(screen, controls) {
    Scene.apply(this, arguments);
    
    
    //
    
    

    this.map = [
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
//Создание рандомных колонок
    var array_col = []
    for (var i =1;i<39;i++){
        array_col.push(i)
    }
    var columns_road = []
    for(var i=0;i<=5;i++){
        var random_column = get_random(array_col)
        if (!columns_road.includes(random_column)){
            columns_road.push(random_column)
        }
    }

    for (var ind_col of columns_road){
        for(var a = 0;a<24;a++){
            this.map[a][ind_col] = 1;
        };
        var ind_random_place_inRow = getRandomNumber(8,16)
        var w = getRandomNumber(3,9)
        var h = getRandomNumber(3,9)
        var ind_max_inHeight = h + ind_col
        var ind_max_inRow = w + ind_random_place_inRow
        for (ind_col; ind_col<ind_max_inHeight;ind_col++){
            var i = ind_random_place_inRow
            for (i;i<ind_max_inRow;i++){
                this.map[i][ind_col] = 1
            }
        }
    };

//Создание рандомных row
    var array_rows = []
    for (var i =1;i<16;i++){
        array_rows.push(i)
    }
    var rows_road = []
    for(var i=0;i<=5;i++){
        var random_row = get_random(array_rows)
        if (!rows_road.includes(random_row)){
            rows_road.push(random_row)
        }
    }

    for (var ind_row of rows_road){
        for(var a = 0;a<=40;a++){
            this.map[ind_row][a] = 1;
        };
        var ind_random_place_inRow = getRandomNumber(8,29)
        var w = getRandomNumber(3,9)
        var h = getRandomNumber(3,9)
        var ind_max_inHeight = h + ind_row
        var ind_max_inRow = w + ind_random_place_inRow
        for (ind_row; ind_row<ind_max_inHeight;ind_row++){

            var i = ind_random_place_inRow
            for (i;i<ind_max_inRow;i++){
                this.map[ind_row][i] = 1
            }
        }
        
        
    };
    var freemas = []
    for (var i = 0;i<24;i++){
        for (var j = 0; j<39;j++){
            if(this.map[i][j]==1){
                var mas = []
                mas.push(i,j)
                freemas.push(mas)
            }
        }
    }
    var freemas_len = freemas.length
    while(flagarr_potion.length<10){
        var freemas_random = freemas[getRandomNumber(10,freemas_len)]
        flagarr_potion.push(new Potion(freemas_random[1],freemas_random[0]))
        this.map[freemas_random[0]][freemas_random[1]] = 2
    }
    while (flagarr_sword.length<2){
        var freemas_random = freemas[getRandomNumber(10,freemas_len)]
        flagarr_sword.push(new Sword(freemas_random[1],freemas_random[0]))
        
        this.map[freemas_random[0]][freemas_random[1]] = 3
    }


    var enemies = []
    for (var i = 0; i<10;i++){
        enemies.push( new Player(get_random(columns_road)*26-5,get_random(rows_road)*26,this,"monster","standing",2,50,50))
    }
    list_enemy = enemies


    //Создание плеера и указание его начальной позиции
    this.player = new Player(get_random(columns_road)*26-5,-35,this,"player","start",3,100,100);

    this.tiles = [
        {j:0,i:0,walk: false}, //0 - wall
        {j:1,i:0,walk: true},  //1 - floor
        {j:2,i:0,walk: true},  //2 - potion
        {j:3,i:0,walk: true},  //3 - sword  
    ];

};
var list_enemy= []
var flagarr_sword = []
var flagarr_potion = []
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  };


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
} 


class Potion{
    constructor(x, y){
        this.x = x
        this.y = y
        this.hitbox = [x * 26 - 20, x * 26 + 20, y* 26 - 20, y * 26 + 20]
    }

    getIntersection(player){
    
        return player.x > this.hitbox[0] && player.x < this.hitbox[1] && player.y > this.hitbox[2] && player.y < this.hitbox[3]

        
    }
}


class Sword extends Potion{
}


Game.prototype = Object.create(Scene.prototype);
Game.prototype.constructor = Game;

//Отрисовка фона игрового поля
Game.prototype.render_bg = function (time) {
    var start_col = 0;
    var start_row = 0;

    for(var i = start_row; i <=24; i++) {
        for(var j = start_col; j <= 40; j++) {
            if(( j < 40) && (i < 24)) {
                var tile = this.tiles[this.map[i][j]];
                this.ctx.drawImage(this.imgs['bg'],tile.j*148,tile.i*148,
                148,148,
                (j*26),(i*26),
                27,27);
        }
    }
}

};





Game.prototype.render_sprites = function (time) {


//render goblins
    list_enemy.forEach(element => {
        this.ctx.drawImage(this.imgs['orc'],
                element.j*64,element.i*64,64,64,
                        ( element.x ),(element.y),35,35);
        //Health bar
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(element.x,element.y,36,5)
        this.ctx.fillStyle = 'red'
        if (element.health>0){
            this.ctx.fillRect(element.x,element.y,element.health,5)
        };
        if (element.health<=0 && element.status != 'dead'){
            //Сцена смерти
            
            element.dead = true;
            element.status = "dead"
            element.direction = "down"
            this.status = element.status
            this.direction = "down";
            this.change_animation = true;
            this.status = "dead";
            this.change_animation = true;
            list_enemy = list_enemy.filter(function (item){
                return item !== element
            })
            

        }

            
        for(var potion of flagarr_potion ){
            if (this.player.health !=36){
                if(potion.getIntersection(this.player)){
            this.map[potion.y][potion.x]=1
            this.player.health = this.player.health + (36-this.player.health)

            flagarr_potion = flagarr_potion.filter(function (item){
                return item !== potion
            })
            } 
           }
        }

        for(var sword of flagarr_sword ){
                if(sword.getIntersection(this.player)){
                    this.player.bufdmg += 1
                    this.map[sword.y][sword.x]=1

                    flagarr_sword = flagarr_sword.filter(function (item){
                        return item !== sword
                    })
            } 
         }
        
        var minxzone =  this.player.x - this.player.attackBox.width/2 - 15 
        var maxxzone = this.player.x + this.player.attackBox.width/2 + 20
        var minyzone =  this.player.y - this.player.attackBox.width/2 -35
        var maxyzone = this.player.y + 50
        
        if (element.x>=minxzone && element.x<=maxxzone && element.y>=minyzone && element.y<=maxyzone && this.player.isAttacking) {
                if (this.player.bufdmg == 1){
                    element.health -= 2
                }else if(this.player.bufdmg == 2){
                    element.health -=5
                }else{
                    element.health -=1
                }
        
            }
        element.update(time);
    });

//render player
    this.player.update(time);
    this.ctx.drawImage(this.imgs['player'],
                this.player.j*64,this.player.i*64,64,70, 
                        ( this.player.x ),(this.player.y) ,35,35);
    //Health bar

    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.player.x,this.player.y,36,5)

    this.ctx.fillStyle = 'green'
    if (this.player.health>0){
    this.ctx.fillRect(this.player.x,this.player.y,this.player.health,5)
    }
 
 };



Game.prototype.render = function (time) {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );

    this.render_bg(time);
    this.render_sprites(time);

    return !list_enemy.length ? 'win' : 'game'
}

function Player(x,y,scene,type,status,speed,attackBoxwidth,attackBoxheight) {
    this.x = x;
    this.y = y;
    this.i = 0;
    this.j = 0;
    this.attackBox = {
        width: attackBoxwidth,
        height: attackBoxheight
    }
    this.health = 36
    this.bufdmg = 0;
    this.status = status
    this.type = type;
    this.scene = scene;
    this.dead = false;
    this.lastTime = 0;
    this.speed = speed;
    this.isAttacking = false
    this.direction = "down";
    this.change_animation = true;
    this.current_animation_frame = 0;
    this.current_action = this.move_left;
    this.got_obstacle = false;
    this.sprites = {
        standing: {
            right: {
                total: 1,
                frames: [[0,11]]
            },
            left: {
                total: 1,
                frames: [[0,9]]
            },
            up: {
                total: 1,
                frames: [[0,8]]
            },
            down: {
                total: 1,
                frames: [[0,10]]
            }
        },
        walking: {
            right: {
                total: 9,
                frames: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11]]
            },
            left: {
                total: 9,
                frames: [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9]]
            },
            up: {
                total: 9,
                frames: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8]]
            },
            down: {
                total: 9,
                frames: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10]]
            },
            stand: {
                total: 1,
                frames: [[0,10]]
            }
        },
        start: {
            down: {
                total: 9,
                frames: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10]]
            }
        },
        dead: {
            down: {
                total: 6,
                frames: [[0,20],[1,20],[2,20],[3,20],[4,20],[5,20]]
            }
        },
        fire: {
            right: {
                total: 11,
                frames: [[7,28],[10,28],[13,28],[16,28],[1,31],[13,31],[16,31],[7,34],[10,34],[7,37],[10,37]]
            },
            left: {
                total: 11,
                frames: [[7,28],[10,28],[13,28],[16,28],[1,31],[13,31],[16,31],[7,34],[10,34],[7,37],[10,37]]
            },
            up: {
                total: 11,
                frames: [[7,28],[10,28],[13,28],[16,28],[1,31],[13,31],[16,31],[7,34],[10,34],[7,37],[10,37]]
            },
            down: {
                total: 11,
                frames: [[7,28],[10,28],[13,28],[16,28],[1,31],[13,31],[16,31],[7,34],[10,34],[7,37],[10,37]]
            }
        },
        attack: {
            right: {
                total: 6,
                frames: [[0,15],[1,15],[2,15],[3,15],[4,15],[5,15]]
            },
            left: {
                total: 6,
                frames: [[0,13],[1,13],[2,13],[3,13],[4,13],[5,13]]
            },
            up: {
                total: 6,
                frames: [[0,12],[1,12],[2,12],[3,12],[4,12],[5,12]]
            },
            down: {
                total: 6,
                frames: [[0,14],[1,14],[2,14],[3,14],[4,14],[5,14]]
            }
        }

    };

};


Player.prototype.animate = function () {

    var frame = this.sprites[this.status][this.direction];

    if(this.dead) {
        return true;
    }

    if(this.change_animation) {
        this.change_animation = false;
        this.current_animation_frame = 0;
    } else {
        if(frame.total > 1) {
            this.current_animation_frame++;
            if( (this.current_animation_frame + 1) == frame.total ) {
                if((this.status == "start") || (this.status == "walking") || (this.status == "attack")) {
                    this.current_animation_frame = 0;
                }

                if(this.status == "dead") {
                    this.current_animation_frame = 5;
                    this.dead = true;
                }

                if(this.status == "fire") {
                    this.current_animation_frame = 0;
                    this.set_action(this.direction,"standing");

                }
            }
        }
    }

//Смена кадров, добавление анимации
    this.j = frame.frames[this.current_animation_frame][0];
    this.i = frame.frames[this.current_animation_frame][1];

};
Player.prototype.attack = function () {
    this.set_action(this.direction,"attack");
    
}

Player.prototype.atacking = function(){
    this.set_action(this.direction,"fire");
    var self = this;
    this.isAttacking = true;
    setTimeout(function(){
        self.isAttacking = false;
    },100);
}

Player.prototype.set_action = function (direction,status) {
    if(this.direction != direction) {
        this.direction = direction;
        this.change_animation = true;
    }

    if(this.status != status) {
        this.status = status;
        this.change_animation = true;
    }
};
//Проверка можно ли перемещаться по указанным координатам
Player.prototype.is_walkable = function (x,y) {

    if(x < 0 ) {
        this.got_obstacle = true;
        return false;
    };
    if(y < 0) {
        this.got_obstacle = true;
        return false;
    };
    if(x>985){
        this.got_obstacle = true;
        return false;
    }
    if(y>580){ 
        this.got_obstacle = true;
        return false;
    }
//координаты прямоугольной области вокруг игрока
    var x1 = x;
    var x2 = x + 26;
    var y1 = y;
    var y2 = y+26;

    x1 = x1 + 9;
    y1 = y1 +21;
    y2 = y2 +7;

    var j1 = Math.floor((x1) / 26);
    var j2 = Math.floor((x2) / 26);
    var i1 = Math.floor((y1) / 26);
    var i2 = Math.floor((y2) / 26);

    var walkable = true;

    for(var i = i1; i <= i2; i++) {
        for(var j = j1; j <= j2; j++) {
            if(!this.scene.tiles[this.scene.map[i][j]].walk) {
                walkable = false;
            }
        }
    }

    this.got_obstacle = !walkable;
    return walkable;

};

Player.prototype.move_left = function () {
    this.set_action("left","walking");

    if(this.is_walkable(this.x - this.speed,this.y)) {
        this.x = this.x - this.speed;
        if(this.x < 0) {
            this.x = 0;
        }
    }
};

Player.prototype.death = function(){
    this.set_action("down","dead")
}

Player.prototype.move_right = function () {
    this.set_action("right","walking");
    if(this.is_walkable(this.x + this.speed,this.y)) {
        this.x = this.x + this.speed;
        if(this.x > 990) {
            this.x =990;
        }
    }
};

Player.prototype.move_up = function () {
    this.set_action("up","walking");
    if(this.is_walkable(this.x ,this.y - this.speed)) {
        this.y = this.y - this.speed;
        if(this.y < 0) {
            this.y =0;
        }
    }
};

Player.prototype.move_down = function () {
    this.set_action("down","walking");
    if(this.is_walkable(this.x,this.y + this.speed)) {
        this.y = this.y + this.speed;
        if(this.y > 585) {
            this.y =585;
        }
    }
};


Player.prototype.fire = function () {
    this.set_action(this.direction,"fire");
}



Player.prototype.start = function () {
    if(this.y < 50) {
        this.y = this.y + this.speed;
    } else {
        this.set_action("down","standing");
    }

}

Player.prototype.update = function (time) {
        this.animate();

        if(this.status == "start") {
            this.start();
            return true;
        }

        if(this.status == "fire") {
            return true;
        }

        if(this.status == "dead") {
            return true;
        }

        if(this.type == "monster") {
            return this.monster_ai_controll(time);
        }

        if(this.scene.controls.states['fire']) {
            this.atacking();
            return true;
        }

        if(this.scene.controls.states['left']) {
            this.move_left();
            return true;
        }

        if(this.scene.controls.states['right']) {
            this.move_right();
            return true;
        }

        if(this.scene.controls.states['forward']) {
            this.move_up();
            return true;
        }

        if(this.scene.controls.states['backward']) {
            this.move_down();
            return true;
        }

        this.set_action(this.direction,"standing");


}
Player.prototype.monster_ai_controll = function (time) {
    //Проверка что игрок не мертв и его коордианты пересекаются с координатами монстра
            if((this.scene.player.dead == false) &&
                (this.scene.player.x < this.x + 35 &&
                   this.scene.player.x + 35 > this.x &&
                   this.scene.player.y < this.y + 35 &&
                   35 + this.scene.player.y > this.y)) {
              
                if(this.x > this.scene.player.x) {
                    this.direction = "left";
                    
                } if(this.x<this.scene.player.x) {
                    this.direction = "right";
                    
                }
                if (this.y > this.scene.player.y){
                    this.direction = "up"
                
                }
                
                this.attack();
                var a = this.scene.player.health
                this.scene.player.health = this.scene.player.health -0.15
                
                if (this.scene.player.health <=0){
                    this.scene.player.set_action("down","dead");
                }
                return true;
            }
    
    //Проверка наличия препятствия или последнее действие монстра, если давно то происходит смена события
            if((this.got_obstacle) || ((time - this.lastTime) > 3000 )) {
                var actions = [this.move_left,this.move_right,this.move_up,this.move_down];
                
                this.current_action = actions[Math.floor(Math.random() * actions.length)];
                this.lastTime = time;//время обновления события
            }
    
            this.current_action();
    
            return true;
        };




function Controls() {
    this.codes  = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward', 32: 'fire', 87: 'forward', 65: 'left', 83: 'backward', 68: 'right'};
    this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false, 'fire' : false};
    document.addEventListener('keydown', this.onKey.bind(this, true), false); 	
    document.addEventListener('keyup', this.onKey.bind(this, false), false);
 }


Controls.prototype.onKey = function(val, e) {
    var state = this.codes[e.keyCode];
    if (typeof state === 'undefined') return;
    this.states[state] = val;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
};

function GameLoop() {
    this.frame = this.frame.bind(this);
    this.lastTime = 0;
    this.callback = function() {};
}

GameLoop.prototype.start = function(callback) {
       this.callback = callback;
    requestAnimationFrame(this.frame);
};

GameLoop.prototype.frame = function(time) {

    if((time - this.lastTime) > 30) {
        this.lastTime = time;
        this.callback(time);
    }
    requestAnimationFrame(this.frame);
};


    var controls = new Controls();
    var screen = {};
    screen.canvas = document.getElementById('screen');
    screen.canvas.width = 1024;
    screen.canvas.height = 640;
    screen.imgs = {};
    var loop = new GameLoop();

    var scenes = {};
    scenes['lib'] = new Lib(screen, controls);
    scenes['menu'] = new Menu(screen, controls);
    scenes['game'] = new Game(screen, controls);
    scenes['win'] = new Win(screen, controls);

    var current_scene = 'lib';


    loop.start(function frame(time) {
        current_scene = scenes[current_scene].render(time);
        });


