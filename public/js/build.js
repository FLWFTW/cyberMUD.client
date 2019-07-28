$(document).ready(
      function()
      {
         $("#redit-cancel").click( function()
               {
                  $("#redit-wrapper").hide();
               });
         $("#oset-cancel").click( function(){ $("#oset-wrapper").hide(); });
         
         $("#redit-save").click( function()
               {
                  socket.emit( "command", "redit desc" );
                  socket.emit( "command", "/c" );
                  socket.emit( "command", $("#redit-room-description").val() );
                  socket.emit( "command", "/s" );
                  socket.emit( "command", "redit name " + $("#redit-room-name").val() );
                  $("#redit-wrapper").hide();
                  $("#input").select();
               });
         $("#admin-tools-select").change( function()
               {
                  if( $(this).val() ==='redit' )
                  {
                     socket.emit( "command", "gui-redit" );
                     $("#redit-wrapper").show();
                     $("#oset-wrapper").hide();
                     $("#mset-wrapper").hide();
                     $("#redit-room-name").select();
                  }
                  else if( $(this).val() ==='oset')
                  {
                     $("#oset-wrapper").show();
                     $("#redit-wrapper").hide();
                     $("#mset-wrapper").hide();
                  }
                  else if( $(this).val() ==='mset')
                  {
                     $("#mset-wrapper").show();
                     $("#oset-wrapper").hide();
                     $("#redit-wrapper").hide();
                  }
                  $(this).val('none');
               });
      });

