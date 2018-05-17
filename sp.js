$(document).ready(function(){
	$('button').on('click', function(){
		$('.jumbotron').slideUp();
		$('table').fadeIn();
		$('.row').fadeIn();

		var i=1;
		var score1=0;
		var score2=0;

		$('.alert').slideDown();
		if(!$('#player1').find('img').length){
			$('#player1').prepend("<img src='load.gif' width='20px'> ");
		}

		$('td').click(function(){
			var status=0;
			if(i%2!=0){
				if(!$(this).find('img').length){
					$(this).append("<img id='cross' src='1.jpg' height='110px' width='110px'>");
					$('.alert').removeClass('alert-info');
					$('.alert').removeClass('alert-danger');
					$('.alert').addClass('alert-success');
					$('.alert').text('Player O\'s turn...');
					$('#player1 img').remove();
					$('#player2').prepend("<img src='load.gif' width='20px'> ");
					i++;
		
					if((check() || i==10) && status==0){
						$('.alert').removeClass('alert-success');
						$('.alert').removeClass('alert-danger');
						$('#player1 img').remove();
						$('#player2 img').remove();
						$('.alert').addClass('alert-warning');
						if(check() && (i-1)%2!=0){
							score1+=1;
							$('.alert').text('Player X won the game.');
							$('.alert').append('<br>Wait! Game is Restarting...');
						}
						else if(check() && (i-1)%2==0){
							score2+=1;
							$('.alert').text('Player O won the game.');
							$('.alert').append('<br>Wait! Game is Restarting...');
						}
						else{
							$('.alert').append('<br>Wait! Game is Restarting...');
						}
						$('#player1 span').text(score1);
						$('#player2 span').text(score2);				
						i=1;
						setTimeout(reset, 1000);
					}
				}
			}
			if(i%2==0 && i!=10){
				status=1;
				var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
				var move = medium_move();
				if($(a[move]).find('img').attr('id')==undefined){
					$(a[move]).append("<img id='circle' src='0.jpg' height='110px' width='110px'>");
					$('.alert').removeClass('alert-success');
					$('.alert').addClass('alert-danger');
					$('.alert').text('Player X\'s turn...');
					$('#player2 img').remove();
					$('#player1').prepend("<img src='load.gif' width='20px'> ");
					i++;
		
					if(check()){
						$('.alert').removeClass('alert-success');
						$('.alert').removeClass('alert-danger');
						$('#player1 img').remove();
						$('#player2 img').remove();
						$('.alert').addClass('alert-warning');
						if(check() && (i-1)%2!=0){
							score1+=1;
							$('.alert').text('Player X won the game.');
							$('.alert').append('<br>Wait! Game is Restarting...');
						}
						else if(check() && (i-1)%2==0){
							score2+=1;
							$('.alert').text('Player O won the game.');
							$('.alert').append('<br>Wait! Game is Restarting...');
						}
						$('#player1 span').text(score1);
						$('#player2 span').text(score2);				
						i=1;
						setTimeout(reset, 1000);
					}
				}
			}
		});
	});
});

function check(){
	 var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
	 for(let x=0;x<a.length;x++){
	 	a[x] = $(a[x]).find('img').attr('id');
	 }
	
	 if((a[0]!=undefined && a[0]==a[1] && a[1]==a[2]) || (a[3]!=undefined && a[3]==a[4] && a[4]==a[5]) || (a[6]!=undefined && a[6]==a[7] && a[7]==a[8]) || (a[0]!=undefined && a[0]==a[3] && a[3]==a[6]) || (a[1]!=undefined && a[1]==a[4] && a[4]==a[7]) || (a[2]!=undefined && a[2]==a[5] && a[5]==a[8]) || (a[0]!=undefined && a[0]==a[4] && a[4]==a[8]) || (a[2]!=undefined && a[2]==a[4] && a[4]==a[6])){
	 	return 1;
	 }
	 else{
	 	return 0;
	 }
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
	
	 // to proceed computer's move
	 if((a[0]=='circle' && a[0]==a[1] && a[2]==undefined) || (a[5]=='circle' && a[5]==a[8] && a[2]==undefined) || (a[4]=='circle' && a[4]==a[6] && a[2]==undefined)) return 2;
	 if((a[0]=='circle' && a[0]==a[2] && a[1]==undefined) || (a[4]=='circle' && a[4]==a[7] && a[1]==undefined)) return 1;
	 if((a[1]=='circle' && a[1]==a[2] && a[0]==undefined) || (a[3]=='circle' && a[3]==a[6] && a[0]==undefined) || (a[4]=='circle' && a[4]==a[8] && a[0]==undefined)) return 0;

	 if((a[3]=='circle' && a[3]==a[4] && a[5]==undefined) || (a[2]=='circle' && a[2]==a[8] && a[5]==undefined)) return 5;
	 if((a[3]=='circle' && a[3]==a[5] && a[4]==undefined) || (a[1]=='circle' && a[1]==a[7] && a[4]==undefined) || (a[0]=='circle' && a[0]==a[8] && a[4]==undefined) || (a[2]=='circle' && a[2]==a[6] && a[4]==undefined)) return 4;
	 if((a[4]=='circle' && a[4]==a[5] && a[3]==undefined) || (a[0]=='circle' && a[0]==a[6] && a[3]==undefined)) return 3;

	 if((a[6]=='circle' && a[6]==a[7] && a[8]==undefined) || (a[2]=='circle' && a[2]==a[5] && a[8]==undefined) || (a[0]=='circle' && a[0]==a[4] && a[8]==undefined)) return 8;
	 if((a[6]=='circle' && a[6]==a[8] && a[7]==undefined) || (a[1]=='circle' && a[1]==a[4] && a[7]==undefined)) return 7;
	 if((a[7]=='circle' && a[7]==a[8] && a[6]==undefined) || (a[0]=='circle' && a[0]==a[3] && a[6]==undefined) || (a[2]=='circle' && a[2]==a[4] && a[6]==undefined)) return 6;

	 // to stop player's move
	 if((a[0]=='cross' && a[0]==a[1] && a[2]==undefined) || (a[5]=='cross' && a[5]==a[8] && a[2]==undefined) || (a[4]=='cross' && a[4]==a[6] && a[2]==undefined)) return 2;
	 if((a[0]=='cross' && a[0]==a[2] && a[1]==undefined) || (a[4]=='cross' && a[4]==a[7] && a[1]==undefined)) return 1;
	 if((a[1]=='cross' && a[1]==a[2] && a[0]==undefined) || (a[3]=='cross' && a[3]==a[6] && a[0]==undefined) || (a[4]=='cross' && a[4]==a[8] && a[0]==undefined)) return 0;

	 if((a[3]=='cross' && a[3]==a[4] && a[5]==undefined) || (a[2]=='cross' && a[2]==a[8] && a[5]==undefined)) return 5;
	 if((a[3]=='cross' && a[3]==a[5] && a[4]==undefined) || (a[1]=='cross' && a[1]==a[7] && a[4]==undefined) || (a[0]=='cross' && a[0]==a[8] && a[4]==undefined) || (a[2]=='cross' && a[2]==a[6] && a[4]==undefined)) return 4;
	 if((a[4]=='cross' && a[4]==a[5] && a[3]==undefined) || (a[0]=='cross' && a[0]==a[6] && a[3]==undefined)) return 3;

	 if((a[6]=='cross' && a[6]==a[7] && a[8]==undefined) || (a[2]=='cross' && a[2]==a[5] && a[8]==undefined) || (a[0]=='cross' && a[0]==a[4] && a[8]==undefined)) return 8;
	 if((a[6]=='cross' && a[6]==a[8] && a[7]==undefined) || (a[1]=='cross' && a[1]==a[4] && a[7]==undefined)) return 7;
	 if((a[7]=='cross' && a[7]==a[8] && a[6]==undefined) || (a[0]=='cross' && a[0]==a[3] && a[6]==undefined) || (a[2]=='cross' && a[2]==a[4] && a[6]==undefined)) return 6;

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
		if(a[2]=='cross' && a[7]=='cross') return 3;
		if(a[8]=='cross' && a[3]=='cross') return 1;
		if(a[6]=='cross' && a[1]=='cross') return 5;

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
}

function medium_move(){
	 var a = ['#c11', '#c12', '#c13', '#c21', '#c22', '#c23', '#c31', '#c32', '#c33'];
	 for(let x=0;x<a.length;x++){
	 	a[x] = $(a[x]).find('img').attr('id');
	 }

	 // to proceed computer's move
	 if((a[0]=='circle' && a[0]==a[1] && a[2]==undefined) || (a[5]=='circle' && a[5]==a[8] && a[2]==undefined) || (a[4]=='circle' && a[4]==a[6] && a[2]==undefined)) return 2;
	 if((a[0]=='circle' && a[0]==a[2] && a[1]==undefined) || (a[4]=='circle' && a[4]==a[7] && a[1]==undefined)) return 1;
	 if((a[1]=='circle' && a[1]==a[2] && a[0]==undefined) || (a[3]=='circle' && a[3]==a[6] && a[0]==undefined) || (a[4]=='circle' && a[4]==a[8] && a[0]==undefined)) return 0;

	 if((a[3]=='circle' && a[3]==a[4] && a[5]==undefined) || (a[2]=='circle' && a[2]==a[8] && a[5]==undefined)) return 5;
	 if((a[3]=='circle' && a[3]==a[5] && a[4]==undefined) || (a[1]=='circle' && a[1]==a[7] && a[4]==undefined) || (a[0]=='circle' && a[0]==a[8] && a[4]==undefined) || (a[2]=='circle' && a[2]==a[6] && a[4]==undefined)) return 4;
	 if((a[4]=='circle' && a[4]==a[5] && a[3]==undefined) || (a[0]=='circle' && a[0]==a[6] && a[3]==undefined)) return 3;

	 if((a[6]=='circle' && a[6]==a[7] && a[8]==undefined) || (a[2]=='circle' && a[2]==a[5] && a[8]==undefined) || (a[0]=='circle' && a[0]==a[4] && a[8]==undefined)) return 8;
	 if((a[6]=='circle' && a[6]==a[8] && a[7]==undefined) || (a[1]=='circle' && a[1]==a[4] && a[7]==undefined)) return 7;
	 if((a[7]=='circle' && a[7]==a[8] && a[6]==undefined) || (a[0]=='circle' && a[0]==a[3] && a[6]==undefined) || (a[2]=='circle' && a[2]==a[4] && a[6]==undefined)) return 6;

	 // to stop player's move
	 if((a[0]=='cross' && a[0]==a[1] && a[2]==undefined) || (a[5]=='cross' && a[5]==a[8] && a[2]==undefined) || (a[4]=='cross' && a[4]==a[6] && a[2]==undefined)) return 2;
	 if((a[0]=='cross' && a[0]==a[2] && a[1]==undefined) || (a[4]=='cross' && a[4]==a[7] && a[1]==undefined)) return 1;
	 if((a[1]=='cross' && a[1]==a[2] && a[0]==undefined) || (a[3]=='cross' && a[3]==a[6] && a[0]==undefined) || (a[4]=='cross' && a[4]==a[8] && a[0]==undefined)) return 0;

	 if((a[3]=='cross' && a[3]==a[4] && a[5]==undefined) || (a[2]=='cross' && a[2]==a[8] && a[5]==undefined)) return 5;
	 if((a[3]=='cross' && a[3]==a[5] && a[4]==undefined) || (a[1]=='cross' && a[1]==a[7] && a[4]==undefined) || (a[0]=='cross' && a[0]==a[8] && a[4]==undefined) || (a[2]=='cross' && a[2]==a[6] && a[4]==undefined)) return 4;
	 if((a[4]=='cross' && a[4]==a[5] && a[3]==undefined) || (a[0]=='cross' && a[0]==a[6] && a[3]==undefined)) return 3;

	 if((a[6]=='cross' && a[6]==a[7] && a[8]==undefined) || (a[2]=='cross' && a[2]==a[5] && a[8]==undefined) || (a[0]=='cross' && a[0]==a[4] && a[8]==undefined)) return 8;
	 if((a[6]=='cross' && a[6]==a[8] && a[7]==undefined) || (a[1]=='cross' && a[1]==a[4] && a[7]==undefined)) return 7;
	 if((a[7]=='cross' && a[7]==a[8] && a[6]==undefined) || (a[0]=='cross' && a[0]==a[3] && a[6]==undefined) || (a[2]=='cross' && a[2]==a[4] && a[6]==undefined)) return 6;

	function random_move(){
		var ran = Math.floor((Math.random() * 9) + 1);
		switch(ran){
			case 1: if(a[0]==undefined) return 0;
					else return random_move();
					break;
			case 2: if(a[1]==undefined) return 1;
					else return random_move();
					break;
			case 3: if(a[2]==undefined) return 2;
					else return random_move();
					break;
			case 4: if(a[3]==undefined) return 3;
					else return random_move();
					break;
			case 5: if(a[4]==undefined) return 4;
					else return random_move();
					break;
			case 6: if(a[5]==undefined) return 5;
					else return random_move();
					break;
			case 7: if(a[6]==undefined) return 6;
					else return random_move();
					break;
			case 8: if(a[7]==undefined) return 7;
					else return random_move();
					break;
			case 9: if(a[8]==undefined) return 8;
					else return random_move();
					break;
		}
	}
	return random_move();

}

function reset(){
	$('.alert').slideUp();
	$('.alert').removeClass('alert-warning');
	$('.alert').addClass('alert-info');
	$('.alert').text('Game Started!');
	$('.alert').append('<br>Player X\'s turn...');
	$('.alert').slideDown();
	if(!$('#player1').find('img').length){
		$('#player1').prepend("<img src='load.gif' width='20px'> ");
	}
	var td = $('td');
	td.each(function(index){
		$(this).empty();
	});
}