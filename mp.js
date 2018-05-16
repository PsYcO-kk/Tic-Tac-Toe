$(document).ready(function(){
	$('button').on('click', function(){
		$('.jumbotron').slideUp();
		$('table').fadeIn();
		$('.row').fadeIn();

		var i=1;
		var score1=0;
		var score2=0;

		$('.alert').slideDown();

		$('td').click(function(){
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
				}
			}
			else{
				if(!$(this).find('img').length){
					$(this).append("<img id='circle' src='0.jpg' height='110px' width='110px'>");
					$('.alert').removeClass('alert-success');
					$('.alert').addClass('alert-danger');
					$('.alert').text('Player X\'s turn...');
					$('#player2 img').remove();
					$('#player1').prepend("<img src='load.gif' width='20px'> ");
					i++;
				}
			}

			if(check() || i==10){
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

function reset(){
	$('.alert').slideUp();
	$('.alert').removeClass('alert-warning');
	$('.alert').addClass('alert-info');
	$('.alert').text('Game Started!');
	$('.alert').append('<br>Player X\'s turn...');
	$('.alert').slideDown();
	$('#player1').prepend("<img src='load.gif' width='20px'> ");
	var td = $('td');
	td.each(function(index){
		$(this).empty();
	});
}