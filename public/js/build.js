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
                  socket.emit( "command", "redit sectortype " + $("#redit-sector").val() );
                  $(".redit-exit-row").each( function( index )
                        {
                           let dir = $(this).contents(".redit-exit-direction").val();
                           let to = $(this).contents(".redit-exit-to-vnum").val();
                           let cur = $("#redit-room-vnum").html();
                           socket.emit( "command", "goto " + to ); //In case the to-vnum does not exist yet, we create it
                           socket.emit( "command", "goto " + cur ); //And return to our original room
                           socket.emit( "command", "redit bexit " + dir + " " + to );
                           socket.emit( "command", "eset bexit " + dir + " exit_state " + $(this).contents(".redit-exit-state").val() );
                           socket.emit( "command", "eset bexit " + dir + " lock_state " + $(this).contents(".redit-lock-state").val() );
                           socket.emit( "command", "eset bexit " + dir + " lock_type " + $(this).contents(".redit-lock-type").val() );
                        });
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
         $("#redit-add-exit").click( function()
               {
                  $("#redit-exits").append("<div class='redit-exit-row'><select class='redit-exit-direction'><option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>northwest</option><option value='up'>up</option><option value='down'>down</option></select><input type='number' class='redit-exit-to-vnum' autocomplete='off' min='1'><select class='redit-exit-state'><option value='free'>free</option><option value='jammed'>jammed</option><option value='closed'>closed</option><option value='open'>open</option><option value='broken'>broken</option></select><select class='redit-lock-type'><option value='pintumbler'>pintumbler</option><option value='combo'>combo</option><option value='electricpin'>electric</option><option value='fingerprint'>fingerprint</option><option value='remote'>remote</option></select><select class='redit-lock-state'><option value='free'>free</option><option value='jammed'>jammed</option><option value='locked'>locked</option><option value='unlocked'>unlocked</option></select>&nbsp;<span class='redit-exit-delete' style='font-weight:bold;cursor:pointer;'>&#10060;</span></div><!--end-exit-row-->");
               });
         $("#redit-exits").on( "click", ".redit-exit-delete", function()
               {
                  $(this).closest(".redit-exit-row").remove();
               });
      });

