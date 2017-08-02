$(function(){
   var socket = io.connect();
   var $messageForm = $('#messageForm') ;
   var $message = $('#message');
   var $chat = $('#chatWindow');


   $messageForm.submit(function(e){
       e.preventDefault();
       console.log('sending message from frontend');
       socket.emit('send message', $message.val());
       message.val('');
   });

   socket.on('new message', function(data){
       $chat.append(data.msg + '<br />');
   })
});