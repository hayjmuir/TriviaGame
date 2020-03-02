
$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', triviaGame.startGame);
    $(document).on('click' , '.option', triviaGame.guessChecker);
    
  })
  
  var triviaGame = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 10,
    timerOn: false,
    timerId : '',

    questions: {
      q1: 'Who is the current captain of the Arizona Coyotes',
      q2: 'What is the name of the beloved mascot?',
      q3: 'What was the name of the team before they moved to Arizona',
      q4: 'What is the name of the only player to play on the Jets before the 1996 move?',
      q5: "Where do the Arizona Coyotes play?",
      q6: 'What year did the Coyotes make it to the Western Conference Finals?',
      q7: "What year did the Coyotes rebrand from the Phoenix Coyotes to the Arizona Coyotes?"
    },
    options: {
      q1: ['Eckman-Larsson', 'Kessel', 'Raanta', 'Doan'],
      q2: ['Gritty', 'Howler', 'Youppi', 'Nordy'],
      q3: ['Rangers', 'Jets', 'Flames', 'Kings'],
      q4: ['Keith Tkachuck', 'Shane Doan', 'Phil Kessel', 'Wayne Gretzky'],
      q5: ['Madison Square Garden','Chase Field','State Farm Stadium','Gila River Arena'],
      q6: ['2019','2010','2003','2001'],
      q7: ['2003', '2014', '1993','2020']
    },
    answers: {
      q1: 'Eckman-Larsson',
      q2: 'Howler',
      q3: 'Jets',
      q4: 'Shane Doan',
      q5: 'Gila River Arena',
      q6: '2010',
      q7: '2014'
    },
    startGame: function(){
      triviaGame.currentSet = 0;
      triviaGame.correct = 0;
      triviaGame.incorrect = 0;
      triviaGame.unanswered = 0;
      clearInterval(triviaGame.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(triviaGame.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      triviaGame.nextQuestion();
      
    },
    nextQuestion : function(){
      
      triviaGame.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(triviaGame.timer);
      
      if(!triviaGame.timerOn){
        triviaGame.timerId = setInterval(triviaGame.timerRunning, 1000);
      }
      
      var questionContent = Object.values(triviaGame.questions)[triviaGame.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(triviaGame.options)[triviaGame.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      if(triviaGame.timer > -1 && triviaGame.currentSet < Object.keys(triviaGame.questions).length){
        $('#timer').text(triviaGame.timer);
        triviaGame.timer--;
          if(triviaGame.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(triviaGame.timer === -1){
        triviaGame.unanswered++;
        triviaGame.result = false;
        clearInterval(triviaGame.timerId);
        resultId = setTimeout(triviaGame.guessResult, 1000);
        $('#results').html('<h3>Out of time! The correct answer was '+ Object.values(triviaGame.answers)[triviaGame.currentSet] +'</h3>');
      } else if(triviaGame.currentSet === Object.keys(triviaGame.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ triviaGame.correct +'</p>'+
          '<p>Incorrect: '+ triviaGame.incorrect +'</p>'+
          '<p>Unanswered: '+ triviaGame.unanswered +'</p>'+
          '<p>Play Again?</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },
    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(triviaGame.answers)[triviaGame.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        triviaGame.correct++;
        clearInterval(triviaGame.timerId);
        resultId = setTimeout(triviaGame.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        triviaGame.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(triviaGame.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      
      triviaGame.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      
      triviaGame.nextQuestion();
       
    }
  
  }