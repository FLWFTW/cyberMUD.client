function getURLParameter(name) {
     return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

var socket;
var receivingJSON = false;
var json_data;
var local_ip;
socket = io();

var commands = {
       IAC:     255, // interpret as command
       DONT:    254, // you are not to use option
       DO:      253, // please use option
       WONT:    252, // I won't use option
       WILL:    251, // I will use option
       SB:      250, // sub-negotiation
       GA:      249, // Go-ahead
       EL:      248, // Erase line
       EC:      247, // Erase character
       AYT:     246, // Are you there?
       AO:      245, // Abort output (but let prog finish)
       IP:      244, // Interrupt (permanently)
       BREAK:   243,
       DM:      242, // Data mark
       NOP:     241,
       SE:      240, // End sub-negotiation
       EOR:     239, // End of record (transparent mode)
       ABORT:   238, // Abort process
       SUSP:    237, // Suspend process
       EOF:     236, // End of file
       SYNCH:   242
};

var telOpts =
   {
       ECHO: 1,   // Echo
       SUPR: 3,   // Supress
       STAT: 5,   // Status
       TIME: 6,   // Timing Mark
       TTYP: 24,  // Terminal Type
       WSIZ: 31,  // Window Size
       TSPD: 32,  // Terminal Speed
       RFCT: 33,  // Remote Flow Control
       LNMD: 34,  // Line Mode
       ENVS: 36,  // Environmental Variables
       MXP:  91  // MXP (MUD eXtension Protocol)
   }
function telnetNegotiations( input )
{
   var output = new String();

   for( i = 0; i < input.length; i++ )
   {
      switch( input.charCodeAt(i) )
      {
         case commands.IAC:
         {
            let iac = input.charCodeAt( i );
            let command = input.charCodeAt( i + 1 );
            let option = input.charCodeAt( i + 2 );

            if( command == commands.WILL ) //251
            {
               if( option == telOpts.ECHO )
               {
                  turnEchoOff();
               }
            }
            else if( command == commands.WONT ) //252
            {
               if( option == telOpts.ECHO )
               {
                  turnEchoOn();
               }
            }
            else
            {
               console.log( "Unsupported telnet negotiation command " + command + "." );
            }
            i+= 2; //skip the command and option characters

            break;
         }
         case 0x1b:
            break;
         case 0x02:
            json_data = new String();
            receivingJSON = true;
            break;
         case 0x03:
            receivingJSON = false;
            processJsonData();
            break;
         default:
         {
            if( receivingJSON == false )
               output += input[i];
            else
               json_data += input[i];
            break;
         }
      }
   }
   return output;
}

function processJsonData()
{
   let obj = JSON.parse(json_data);
   console.log( obj );

   switch( obj.type )
   {
      case 'prompt':
         evalPrompt( obj );
         break;
      case 'chat':
         evalChat( obj );
         break;
      case 'tell':
         evalTell( obj );
         break;
      case 'say':
         evalSay( obj );
         break;
      case 'log':
         {
            writeTermRaw( "<span class='color-log'>" + "[LOG] " + sanitize( obj.data.message ) + "</span><br>" );
            break;
         }
      case 'mstat':
         evalMstat( obj );
         break;
      case 'ostat':
         evalOstat( obj );
         break;
      case 'olist':
         {
            writeTermRaw( "<span class='ansi0'>Object List</span><br>" );
            writeTermRaw( "<table>" );
            writeTermRaw( "<tr><th>vnum&nbsp;&nbsp;&nbsp;</th><th>Name</th></tr>" );
            obj.data.forEach( function( object ){ writeTermRaw( "<tr><td>" + object.vnum + "&nbsp;</td><td>" + sanitize(object.name) + "</td></tr>" )});
            writeTermRaw( "</table><br>" );
            break;
         }
      case 'mlist':
         {
            writeTermRaw( "<span class='ansi0'>Mobile List</span><br>" );
            writeTermRaw( "<table>" );
            writeTermRaw( "<tr><th>vnum&nbsp;&nbsp;&nbsp;</th><th>Name</th></tr>" );
            obj.data.forEach( function( mob ){ writeTermRaw( "<tr><td>" + mob.vnum + "&nbsp;</td><td>" + sanitize(mob.name) + "</td></tr>" )});
            writeTermRaw( "</table><br>" );
            break;
         }
      case 'room':
         evalRoom( obj );
         break;
      case 'inventory':
         evalInventory( obj );
         break;
      case 'equipment':
         evalEquipment( obj );
         break;
      case 'ui_command':
         evalUICommand( obj );
         break;
      case 'build_room_data':
         evalBuildRoomData( obj );
         break;
      default:
      {
         writeTermRaw( "<br><span class='color-" + obj.type + "'>" + spaces( sanitize( obj.data.text ) ) + "</span>" );
         break;
      }
   }

}
function writeTermRaw( data )
{
   $("#output").append( data );
   $("#output").scrollTop( $("#output")[0].scrollHeight);
}

function writeTerm( data )
{
   writeTermRaw( parseURLs( parseEmails( ansiEncode( sanitizeString( telnetNegotiations( data ) ) ) ) ) );
}


$(document).ready(
   function()
   {
      var preload = [
                      "../images/female-mesh/female-mesh-head-blue.png",
                      "../images/female-mesh/female-mesh-eyes-blue.png",
                      "../images/female-mesh/female-mesh-neck-blue.png",
                      "../images/female-mesh/female-mesh-larm-blue.png",
                      "../images/female-mesh/female-mesh-rarm-blue.png",
                      "../images/female-mesh/female-mesh-torso-blue.png",
                      "../images/female-mesh/female-mesh-lleg-blue.png",
                      "../images/female-mesh/female-mesh-rleg-blue.png",
                      "../images/female-mesh/female-mesh-head-yellow.png",
                      "../images/female-mesh/female-mesh-eyes-yellow.png",
                      "../images/female-mesh/female-mesh-neck-yellow.png",
                      "../images/female-mesh/female-mesh-larm-yellow.png",
                      "../images/female-mesh/female-mesh-rarm-yellow.png",
                      "../images/female-mesh/female-mesh-torso-yellow.png",
                      "../images/female-mesh/female-mesh-lleg-yellow.png",
                      "../images/female-mesh/female-mesh-rleg-yellow.png",
                      "../images/female-mesh/female-mesh-head-red.png",
                      "../images/female-mesh/female-mesh-eyes-red.png",
                      "../images/female-mesh/female-mesh-neck-red.png",
                      "../images/female-mesh/female-mesh-larm-red.png",
                      "../images/female-mesh/female-mesh-rarm-red.png",
                      "../images/female-mesh/female-mesh-torso-red.png",
                      "../images/female-mesh/female-mesh-lleg-red.png",
                      "../images/female-mesh/female-mesh-rleg-red.png"
                         ];
      preload.forEach( function( png ){ let img = new Image();img.src = png; } );

      $("#input").select();
      $("#wrapper").on( 'click', '.direction', function()
            {
               socket.emit( "command", $(this).data("direction") );
               writeTermRaw( $(this).data("direction") + "<br>" );
               $("#input").select();
            });

      $("#wrapper").on( 'click', '.object', function()
            {
               writeTermRaw( "<br>" );
               socket.emit( "command", $(this).data("default") + " " + $(this).data("guid" ) );
               $("#input").select();
            });
/*
      $("#client").on( 'contextmenu', function(e)
            {
               $("#contextmenu").css({ display: "block",
                                       left: e.pageX,
                                       top: e.pageY,
                                       height: "auto",
                                       width: "auto"}).html("").append(
                                          "<ul class='contextmenu'>" +
                                          "<li class='contextlink'> Copy</li>" +
                                          "<li class='contextlink'> Paste</li>" +
                                          "</ul" );
               $("#input").select();
               return false; 
            });
*/
      $("#wrapper").on( 'contextmenu', '.context', function(e)
            {
               $("#contextmenu").html("");
               let cx = 0;
               let cy = 0;
               if( $(this).data("context") != undefined )
               {
                  var context = JSON.parse( window.atob( $(this).data("context") ) );
               }
               let guid = $(this).data("guid");
               $("#contextmenu").append( "<ul style='contextmenu'>" );
               context.forEach( function(item)
                     {
                        $("#contextmenu").append( "<li class='contextlink' data-echo='" + item.echo + "' data-click='" + item.command + "'>" + item.label + "</li>" );
                     });
               $("#contextmenu").append( "</ul>" );

               if( $("#contextmenu").height() + e.pageY > $(window).height() )
                  cy = e.pageY - $("#contextmenu").height();
               else
                  cy = e.pageY;

               if( $("#contextmenu").width() + e.pageX > $(window).width() )
                  cx = e.pageX - $("#contextmenu").width();
               else
                  cx = e.pageX;
                  

               $("#contextmenu").css({ display: "block",
                                       left: cx,
                                       top: cy,
                                       height: "auto",
                                       width: "auto"});
               $("#input").select();
               return false;

            });

      $("body").on( 'click', '.contextlink', function()
            {
               writeTermRaw( sanitize( $(this).data("echo") ) + "<br>" );
               socket.emit( "command", $(this).data("click") );
               $("#contextmenu").hide();
               $("#input").select();
            });

      $("body").on( 'click',  function() { $("#contextmenu").hide();} );

      $("#bottom-show-hide").on( 'click', function()
            {
               if( $("#bottom-window").height() == 0 )//collapsed-->expanded (show)
               {
                  $("#bottom-window").animate({height:"20vh",padding:"10px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
                  $("#client").animate({height:"75vh"});
                  $("#bottom-show-hide").html("&#9660").css('top', '-0.5em');
               }
               else //expanded-->collapsed (hide)
               {
                  $("#client").animate({height:"95vh"});
                  $("#bottom-window").animate({height:"0px",padding:"0px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
                  $("#bottom-show-hide").html("&#9650").css('top', '-1em');
               }
            });

      $("#left-show-hide").on( 'click', function()
            {
               if( $("#left-window").offset().left < 0 ) //collapsed
               {
                  $("#left-window").animate({left:"0px"});
                  $("#left-show-hide").html( "&#9664;").css('right', '-0.5em' );
               }
               else //expanded
               {
                  $("#left-window").animate({left:"-20vw"});
                  $("#left-show-hide").html( "&#9654;").css('right', '-1em' );
               }
            });

      $("#right-show-hide").on( 'click', function()
            {
               if( $("#right-window").offset().left >= $(window).width() ) //collapsed
               {
                  $("#right-window").animate({right:"0px"});
                  $("#right-show-hide").html( "&#9654;").css('left', '-0.5em' );
               }
               else //expanded
               {
                  $("#right-window").animate({right:"-20vw"});
                  $("#right-show-hide").html( "&#9664;").css('left', '-1em' );
               }
            });

      socket.on( 'data',
         function( data )
         {
            writeTerm( data );
         });

      socket.on( 'status',
            function( data )
            {
               switch( data.msg )
               {
                  case 'connect':
                     {
                        writeTermRaw( '\n::Connected to ' + data.host + ' on port ' + data.port + '::\n<br>' );
                        $("#connect").hide( 0 );
                        $("#input").fadeIn( 400 );
                        break;
                     }
                  case 'lookup':
                     {
                        var ip = data.address;
                        writeTermRaw( '\n::Resolving host ' + data.host + ' port ' + data.port + '::\n<br>' );
                        $("#local_ip").html( "Connected from: " + ip.slice( ip.lastIndexOf( ":" ) + 1 ) );
                        break;
                     }
                  case 'error':
                     {
                        writeTermRaw( '\n::Unable to connect to ' + data.host + ' port ' + data.port + '::\n<br>' );
                        writeTermRaw( '::Connection refused::\n<br>' );
                        break;
                     }
                  case 'close':
                     {
                        writeTermRaw( '\n::Connection closed::<br>' );
                        $("#input").hide( 0 );
                        $("#connect").fadeIn( 400 );
                        break;
                     }
                  case 'reconnect':
                     {
                        writeTermRaw( '\n::Reconnecting to ' + data.host + ' port ' + data.port + '::\n<br>' );
                        break;
                     }
                  default:
                     {
                        writeTerm( text );
                        break;
                     }
               }
            });

      $("#input_form").submit(
         function( event )
         {
            event.preventDefault();
            socket.emit( "command", $("#input").val() );
            writeTermRaw( "<br>&gt;" + sanitize( $("#input").val() ) + "<br>" );
            $("#input").select();
         });

      $("#password_form").submit(
         function( event )
         {
            event.preventDefault();
            socket.emit( "command", $("#pw_input").val() );
            $("#pw_input").select();
         });

      $("#connect").click(
            function()
            {
               location.reload();
            });
    });

