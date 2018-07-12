var mode, i = 1, score1 = 0, score2 = 0;

$(document).ready(function(){

	$('#menu').css('display', 'block');

	$('#spBtn').click(function(){
		$('#options').css('display', 'none');
		$('.sp-level').css('display', 'block');
	});
	$('#mpBtn').click(function(){
		mode = 'd';
		$('#menu').css('display', 'none');
		startGame_mp();
	});
	$('#infoBtn').click(function(){
		$('#options').css('display', 'none');
		$('.info').css('display', 'block');
	});

	$('#m-levelBtn').click(function(){
		mode = 'm';
		$('#menu').css('display', 'none');
		startGame_sp();
	});
	$('#h-levelBtn').click(function(){
		mode = 'h';
		$('#menu').css('display', 'none');
		startGame_sp();
	});

	$('.back').click(function(){
		$('.sp-level').css('display', 'none');
		$('.info').css('display', 'none');
		$('#options').css('display', 'block');
	});

});

function startGame_sp(){

	switch(mode){
		case 'm':
		case 'h':
			$('#player1name').html('Player (X)');
			$('#player2name').html('Computer (O)');
			break;
	}

	if(!$('#player1').find('img').length){
		$('#player1').prepend("<img src='load.gif' width='20px'> ");
	}

	$('td').click(function(){
		var status=0;
		if(i%2!=0){
			if(!$(this).find('img').length){
				$(this).append("<img id='cross' src='1.png' height='110px' width='110px'>");
				$('#player1 img').remove();
				$('#player2').prepend("<img src='load.gif' width='20px'> ");
				i++;
	
				if((check() || i==10) && status==0){
					$('#player1 img').remove();
					$('#player2 img').remove();
					if(check() && (i-1)%2!=0){
						score1+=1;
						showGreeting('Player won the round!');
					}
					else if(check() && (i-1)%2==0){
						score2+=1;
						showGreeting('Computer won the round!');
					}
					else{
						showGreeting('This is a Tie!');
					}
					$('#player1 .score').text(score1);
					$('#player2 .score').text(score2);				
					i=1;
					setTimeout(reset, 1000);
				}
			}
		}
		if(i%2==0 && i!=10){
			status=1;
			var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
			var move;
			switch(mode){
				case 'm': move = medium_move();
					break;
				case 'h': move = hard_move(i);
					break;
			};
			if($(a[move]).find('img').attr('id')==undefined){
				$(a[move]).append("<img id='circle' src='0.png' height='110px' width='110px'>");
				$('#player2 img').remove();
				$('#player1').prepend("<img src='load.gif' width='20px'> ");
				i++;
	
				if(check()){
					$('#player1 img').remove();
					$('#player2 img').remove();
					if(check() && (i-1)%2!=0){
						score1+=1;
						showGreeting('Player won the round!');
					}
					else if(check() && (i-1)%2==0){
						score2+=1;
						showGreeting('Computer won the round!');
					}
					$('#player1 .score').text(score1);
					$('#player2 .score').text(score2);				
					i=1;
					setTimeout(reset, 1000);
				}
			}
		}
	});
};

function startGame_mp(){
	$('td').click(function(){
		if(i%2!=0){
			if(!$(this).find('img').length){
				$(this).append("<img id='cross' src='1.png' height='110px' width='110px'>");
				$('#player1 img').remove();
				$('#player2').prepend("<img src='load.gif' width='20px'> ");
				i++;
			}
		}
		else{
			if(!$(this).find('img').length){
				$(this).append("<img id='circle' src='0.png' height='110px' width='110px'>");
				$('#player2 img').remove();
				$('#player1').prepend("<img src='load.gif' width='20px'> ");
				i++;
			}
		}

		if(check() || i==10){
			$('#player1 img').remove();
			$('#player2 img').remove();
			if(check() && (i-1)%2!=0){
				score1+=1;
				showGreeting('Player X won the round!');
			}
			else if(check() && (i-1)%2==0){
				score2+=1;
				showGreeting('Player O won the round!');
			}
			else{
				showGreeting('This is a Tie!');
			}
			$('#player1 .score').text(score1);
			$('#player2 .score').text(score2);				
			i=1;
			setTimeout(reset, 1000);
		}

	});
};

function check(){
	var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
	for(let x=0;x<a.length;x++){
		a[x] = $(a[x]).find('img').attr('id');
	}

	if((a[0]!=undefined && a[0]==a[1] && a[1]==a[2]) || (a[3]!=undefined && a[3]==a[4] && a[4]==a[5]) || (a[6]!=undefined && a[6]==a[7] && a[7]==a[8]) || (a[0]!=undefined && a[0]==a[3] && a[3]==a[6]) || (a[1]!=undefined && a[1]==a[4] && a[4]==a[7]) || (a[2]!=undefined && a[2]==a[5] && a[5]==a[8]) || (a[0]!=undefined && a[0]==a[4] && a[4]==a[8]) || (a[2]!=undefined && a[2]==a[4] && a[4]==a[6])){
		return 1;
	}
 	return 0;
}

function hard_move(i){
	var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
	for(let x=0;x<a.length;x++){
		a[x] = $(a[x]).find('img').attr('id');
	}

	if(i==2){
		for(let x=0;x<9;x++){
			if(a[x]=='cross'){
				var rand;
		 		switch(x){
		 			case 0: return 4;break;
		 			case 1: return 4;break;
		 			case 2: return 4;break;
		 			case 3: return 4;break;
		 			case 4: rand = Math.floor((Math.random() * 4) + 1);
		 				if(rand==1) return 0;
		 				if(rand==2) return 2;
		 				if(rand==3) return 6;
		 				if(rand==4) return 8;
		 				break;
		 			case 5: return 4;break;
		 			case 6: return 4;break;
		 			case 7: return 4;break;
		 			case 8: return 4;break;
		 		}
			}
		}
	}

	if((a[0]!=undefined && a[0]==a[1] && a[2]==undefined) || (a[5]!=undefined && a[5]==a[8] && a[2]==undefined) || (a[4]!=undefined && a[4]==a[6] && a[2]==undefined)) return 2;
	if((a[0]!=undefined && a[0]==a[2] && a[1]==undefined) || (a[4]!=undefined && a[4]==a[7] && a[1]==undefined)) return 1;
	if((a[1]!=undefined && a[1]==a[2] && a[0]==undefined) || (a[3]!=undefined && a[3]==a[6] && a[0]==undefined) || (a[4]!=undefined && a[4]==a[8] && a[0]==undefined)) return 0;

	if((a[3]!=undefined && a[3]==a[4] && a[5]==undefined) || (a[2]!=undefined && a[2]==a[8] && a[5]==undefined)) return 5;
	if((a[3]!=undefined && a[3]==a[5] && a[4]==undefined) || (a[1]!=undefined && a[1]==a[7] && a[4]==undefined) || (a[0]!=undefined && a[0]==a[8] && a[4]==undefined) || (a[2]!=undefined && a[2]==a[6] && a[4]==undefined)) return 4;
	if((a[4]!=undefined && a[4]==a[5] && a[3]==undefined) || (a[0]!=undefined && a[0]==a[6] && a[3]==undefined)) return 3;

	if((a[6]!=undefined && a[6]==a[7] && a[8]==undefined) || (a[2]!=undefined && a[2]==a[5] && a[8]==undefined) || (a[0]!=undefined && a[0]==a[4] && a[8]==undefined)) return 8;
	if((a[6]!=undefined && a[6]==a[8] && a[7]==undefined) || (a[1]!=undefined && a[1]==a[4] && a[7]==undefined)) return 7;
	if((a[7]!=undefined && a[7]==a[8] && a[6]==undefined) || (a[0]!=undefined && a[0]==a[3] && a[6]==undefined) || (a[2]!=undefined && a[2]==a[4] && a[6]==undefined)) return 6;

	var ran;
	switch(a[4]){
		case 'cross':
			for(var x=0;x<9;x++){
				if(a[x]=='circle'){
					switch(x){
						case 0: if(a[8]=='cross'){
								ran = Math.floor((Math.random() * 2) + 1);
								if(ran==1) return 2;
								if(ran==2) return 6;
							}
							break;
						case 2: if(a[6]=='cross'){
								ran = Math.floor((Math.random() * 2) + 1);
								if(ran==1) return 0;
								if(ran==2) return 8;
							}
							break;
						case 6: if(a[2]=='cross'){
								ran = Math.floor((Math.random() * 2) + 1);
								if(ran==1) return 0;
								if(ran==2) return 8;
							}
							break;
						case 8: if(a[0]=='cross'){
								ran = Math.floor((Math.random() * 2) + 1);
								if(ran==1) return 2;
								if(ran==2) return 6;
							}
							break;
					}
				}
			}
			break;
		case 'circle':
			if((a[0]=='cross' && a[8]=='cross') || (a[2]=='cross' && a[6]=='cross')){
				ran = Math.floor((Math.random() * 4) + 1);
				if(ran==1) return 1;
				if(ran==2) return 3;
				if(ran==3) return 5;
				if(ran==4) return 7;
			}

			if(a[0]=='cross' && a[5]=='cross') return 7;
			if(a[0]=='cross' && a[7]=='cross') return 5;
			if(a[2]=='cross' && a[7]=='cross') return 3;
			if(a[2]=='cross' && a[3]=='cross') return 7;
			if(a[8]=='cross' && a[3]=='cross') return 1;
			if(a[8]=='cross' && a[1]=='cross') return 3;
			if(a[6]=='cross' && a[1]=='cross') return 5;
			if(a[6]=='cross' && a[5]=='cross') return 1;

			if(a[1]=='cross' && a[3]=='cross') return 0;
			if(a[1]=='cross' && a[5]=='cross') return 2;
			if(a[7]=='cross' && a[3]=='cross') return 6;
			if(a[7]=='cross' && a[5]=='cross') return 8;

			if((a[1]=='cross' && a[7]=='cross') || (a[3]=='cross' && a[5]=='cross')){
				ran = Math.floor((Math.random() * 4) + 1);
				if(ran==1) return 0;
				if(ran==2) return 2;
				if(ran==3) return 6;
				if(ran==4) return 8;
			}
			break;
	}

	return random_move();

}

function medium_move(){
	var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
	for(let x=0;x<a.length;x++){
		a[x] = $(a[x]).find('img').attr('id');
	}

	if((a[0]!=undefined && a[0]==a[1] && a[2]==undefined) || (a[5]!=undefined && a[5]==a[8] && a[2]==undefined) || (a[4]!=undefined && a[4]==a[6] && a[2]==undefined)) return 2;
	if((a[0]!=undefined && a[0]==a[2] && a[1]==undefined) || (a[4]!=undefined && a[4]==a[7] && a[1]==undefined)) return 1;
	if((a[1]!=undefined && a[1]==a[2] && a[0]==undefined) || (a[3]!=undefined && a[3]==a[6] && a[0]==undefined) || (a[4]!=undefined && a[4]==a[8] && a[0]==undefined)) return 0;

	if((a[3]!=undefined && a[3]==a[4] && a[5]==undefined) || (a[2]!=undefined && a[2]==a[8] && a[5]==undefined)) return 5;
	if((a[3]!=undefined && a[3]==a[5] && a[4]==undefined) || (a[1]!=undefined && a[1]==a[7] && a[4]==undefined) || (a[0]!=undefined && a[0]==a[8] && a[4]==undefined) || (a[2]!=undefined && a[2]==a[6] && a[4]==undefined)) return 4;
	if((a[4]!=undefined && a[4]==a[5] && a[3]==undefined) || (a[0]!=undefined && a[0]==a[6] && a[3]==undefined)) return 3;

	if((a[6]!=undefined && a[6]==a[7] && a[8]==undefined) || (a[2]!=undefined && a[2]==a[5] && a[8]==undefined) || (a[0]!=undefined && a[0]==a[4] && a[8]==undefined)) return 8;
	if((a[6]!=undefined && a[6]==a[8] && a[7]==undefined) || (a[1]!=undefined && a[1]==a[4] && a[7]==undefined)) return 7;
	if((a[7]!=undefined && a[7]==a[8] && a[6]==undefined) || (a[0]!=undefined && a[0]==a[3] && a[6]==undefined) || (a[2]!=undefined && a[2]==a[4] && a[6]==undefined)) return 6;

	return random_move();

}

function random_move(){
	var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
	for(let x=0;x<a.length;x++){
		a[x] = $(a[x]).find('img').attr('id');
	}

	var ran = Math.floor((Math.random() * 9) + 1);
	switch(ran){
		case 1: if(a[0]==undefined) return 0;
			return random_move();
			break;
		case 2: if(a[1]==undefined) return 1;
			return random_move();
			break;
		case 3: if(a[2]==undefined) return 2;
			return random_move();
			break;
		case 4: if(a[3]==undefined) return 3;
			return random_move();
			break;
		case 5: if(a[4]==undefined) return 4;
			return random_move();
			break;
		case 6: if(a[5]==undefined) return 5;
			return random_move();
			break;
		case 7: if(a[6]==undefined) return 6;
			return random_move();
			break;
		case 8: if(a[7]==undefined) return 7;
			return random_move();
			break;
		case 9: if(a[8]==undefined) return 8;
			return random_move();
			break;
	}
}

function reset(){
	if(!$('#player1').find('img').length){
		$('#player1').prepend("<img src='load.gif' width='20px'> ");
	}
	var td = $('td');
	td.each(function(index){
		$(this).empty();
	});
}

function showGreeting(greeting){
	$('.greeting').text(greeting);
	$('.sp-level').css('display', 'none');
	$('#options').css('display', 'none');
	$('.greeting').css('display', 'block');
	$('#menu').css('display', 'block');
	setTimeout(function(){
		$('#menu').css('display', 'none');
	}, 2000);
}