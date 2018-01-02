var socket = io();
console.log("Laoded!");
var lockedFlag;


socket.on('connect', function(){
  console.log("Connected!");
  var params = jQuery.deparam(window.location.search);
  console.log(params);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = "/";
    } else{
      console.log("No errors.")
    }
  });
});

// socket.on('newMapBan', function(ban){
//   console.log(ban);
//   var map = $(`#${ban.map}`);
//   map.css('background-color', '#FF1E40');
//   console.log(map)
// });

socket.on('getUserName', function(userName){
  $('#username').html(userName);
});


socket.on('updateRoom', function(roomData){
  //console.log(roomData.roomData)
  lockedFlag = roomData.lockedFlag;
  console.log(lockedFlag);
  var mapsContainer = $('#maps');
  mapsContainer.html("");
  roomData.roomData.forEach(function(map){
    mapsContainer.append(map);
    console.log("DONE")
  })

  var mapBox = $('.map');

  mapBox.on('click', function(){
    if(lockedFlag){

    } else {
      $(this).css('background-color', '#FF1E40');
      lockedFlag = true;
      $('.map').css('cursor', 'default')
      $('.overlay').css('opacity', 0.30)
      var newRoomData = $('.map');
      console.log(newRoomData.length);

      var parsedNewRoomData = [];

      for(var i=0; i<newRoomData.length; i++){
        parsedNewRoomData[i] = newRoomData[i].outerHTML;
      }

      console.log("EMISJA")
      socket.emit('newRoomDataPackage', parsedNewRoomData);
      socket.emit('unlockBan');
    }
  });

});

socket.on('unlockBanUpdate', function(lockedFlagUpdate){
  lockedFlag = lockedFlagUpdate;
})




socket.on('disconnect', function(){
  console.log('Disconnected from the server')
});
