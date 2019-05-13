
const photos = ['flamingo.jpg', 'sparrow.jpg', 'owl.jpg', 'stork.jpg', 'crow.jpg', 'peacock.jpg', 'falcon.jpg', 'pigeon.jpg', 'swan.jpg', 'flamingo.jpg', 'sparrow.jpg', 'owl.jpg', 'stork.jpg', 'crow.jpg', 'peacock.jpg', 'falcon.jpg', 'pigeon.jpg', 'swan.jpg'];

const photosLength = photos.length;
let cards = [];     

for(let i = photosLength; i > 0; i--) {
    let randId = Math.floor(Math.random() *i);
    cards.push(photos[randId]);
    photos.splice(randId,1);
};

$('.card').each(function() {                   
    let id = this.id;		
    let nr = id.slice(1);
    $('#'+id).on('click', function() { revealCard(nr); });    
});

let oneVisible = false;    
let turnCounter = 0;       
let visible_nr;     
let lock = false;  
let pairsLeft = photosLength/2;  

function revealCard(nr) {      
    
    if (visible_nr == nr) return;   
    
    if ($('#c'+nr).is(':visible') && lock == false) { 
         
        lock = true;
        let photo = 'url(img/'+ cards[nr]+ ')';
        $('#c' +nr).css('background-image', photo);
        $('#c' +nr).addClass('cardA');
        $('#c' +nr).removeClass('card');
                                                        //first card
        if(oneVisible == false) {           
            oneVisible = true;
            visible_nr = nr;
            lock = false;
            }

        else {                             
                                                         //second card
            if (cards[visible_nr] == cards[nr]) { 
                setTimeout(function() {
                    hide2Cards(nr, visible_nr)
                }, 750);              
            }

            else {             
                setTimeout(function() {
                    restore2Cards(nr, visible_nr)       
                }, 1000);
            }
            
            turnCounter++;
            $('.score').html('Turn counter: '+turnCounter); 
            oneVisible = false;       
        }  
    }   
}

function hide2Cards (nr1, nr2) {
    $('#c'+nr1).css('visibility','hidden');
	$('#c'+nr2).css('visibility','hidden');      

    pairsLeft--;

    if(pairsLeft == 0) {
       
        $('.board').html('<h2>You win!<br>Done in '+turnCounter+' turns</h2><button type="button">Again?</button>');
		reload();
    }

    lock = false;
}

function restore2Cards(nr1, nr2) {                  
    
    $('#c' +nr1).css('background-image', 'url(img/back.png)').addClass('card').removeClass('cardA');
    
    $('#c' +nr2).css('background-image', 'url(img/back.png)').addClass('card').removeClass('cardA');

    visible_nr = undefined;   
    lock = false;
}
function reload() {
	$('button').click(function() { 
        location.reload();
    });
};
