const bodyMeshMain = {
               female: { 
                   head: { red: "../images/female-mesh/female-mesh-head-red.png",
                           blue: "../images/female-mesh/female-mesh-head-blue.png",
                           yellow: "../images/female-mesh/female-mesh-head-yellow.png" },
                   eyes: { red: "../images/female-mesh/female-mesh-eyes-red.png",
                           blue: "../images/female-mesh/female-mesh-eyes-blue.png",
                           yellow: "../images/female-mesh/female-mesh-eyes-yellow.png" },
                   neck: { red: "../images/female-mesh/female-mesh-neck-red.png",
                           blue: "../images/female-mesh/female-mesh-neck-blue.png",
                           yellow: "../images/female-mesh/female-mesh-neck-yellow.png" },
                   larm: { red: "../images/female-mesh/female-mesh-larm-red.png",
                           blue: "../images/female-mesh/female-mesh-larm-blue.png",
                           yellow: "../images/female-mesh/female-mesh-larm-yellow.png" },
                   rarm: { red: "../images/female-mesh/female-mesh-rarm-red.png",
                           blue: "../images/female-mesh/female-mesh-rarm-blue.png",
                           yellow: "../images/female-mesh/female-mesh-rarm-yellow.png" },
                   torso: { red: "../images/female-mesh/female-mesh-torso-red.png",
                           blue: "../images/female-mesh/female-mesh-torso-blue.png",
                           yellow: "../images/female-mesh/female-mesh-torso-yellow.png" },
                   lleg: { red: "../images/female-mesh/female-mesh-lleg-red.png",
                           blue: "../images/female-mesh/female-mesh-lleg-blue.png",
                           yellow: "../images/female-mesh/female-mesh-lleg-yellow.png" },
                   rleg: { red: "../images/female-mesh/female-mesh-rleg-red.png",
                           blue: "../images/female-mesh/female-mesh-rleg-blue.png",
                           yellow: "../images/female-mesh/female-mesh-rleg-yellow.png" }
                  },
               male: { 
                   head: { red: "../images/male-mesh/male-mesh-head-red.png",
                           blue: "../images/male-mesh/male-mesh-head-blue.png",
                           yellow: "../images/male-mesh/male-mesh-head-yellow.png" },
                   eyes: { red: "../images/male-mesh/male-mesh-eyes-red.png",
                           blue: "../images/male-mesh/male-mesh-eyes-blue.png",
                           yellow: "../images/male-mesh/male-mesh-eyes-yellow.png" },
                   neck: { red: "../images/male-mesh/male-mesh-neck-red.png",
                           blue: "../images/male-mesh/male-mesh-neck-blue.png",
                           yellow: "../images/male-mesh/male-mesh-neck-yellow.png" },
                   larm: { red: "../images/male-mesh/male-mesh-larm-red.png",
                           blue: "../images/male-mesh/male-mesh-larm-blue.png",
                           yellow: "../images/male-mesh/male-mesh-larm-yellow.png" },
                   rarm: { red: "../images/male-mesh/male-mesh-rarm-red.png",
                           blue: "../images/male-mesh/male-mesh-rarm-blue.png",
                           yellow: "../images/male-mesh/male-mesh-rarm-yellow.png" },
                   torso: { red: "../images/male-mesh/male-mesh-torso-red.png",
                           blue: "../images/male-mesh/male-mesh-torso-blue.png",
                           yellow: "../images/male-mesh/male-mesh-torso-yellow.png" },
                   lleg: { red: "../images/male-mesh/male-mesh-lleg-red.png",
                           blue: "../images/male-mesh/male-mesh-lleg-blue.png",
                           yellow: "../images/male-mesh/male-mesh-lleg-yellow.png" },
                   rleg: { red: "../images/male-mesh/male-mesh-rleg-red.png",
                           blue: "../images/male-mesh/male-mesh-rleg-blue.png",
                           yellow: "../images/male-mesh/male-mesh-rleg-yellow.png" }
                  }
            };


function turnEchoOff()
{
   $("#pw_input").val("").select();
   $("#input_form").hide();
   $("#password_form").show();
   $("#pw_input").select();
}

function turnEchoOn()
{
   $("#input").val("").select();
   $("#input_form").show();
   $("#password_form").hide();
   $("#input").select();//we do it twice because there's a bit of a lag between switching inputs and if you type fast you can miss the first character of your password.
}

function aoran( input )
{
   return ( ( 'aeiouAEIOU'.indexOf(input[0]) != -1 ) ? "an" : "a" );
}

function sanitize(str)
{
   return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br>');
}

function spaces(str)
{
   return String(str).replace(/ /g, '&nbsp;' );
}

function sanitizeString( input )
{
   var output = new String();

   for( i = 0; i < input.length; i++ )
   {
      switch( input.charAt(i) )
      {
         default:
            output += input.charAt(i);
            break;
         case '<':
            output += "&lt;";
            break;
         case '>':
            output += "&gt;";
            break;
         case '&':
            output += "&amp;";
            break;
         case ' ':
            output += "&nbsp;";
            break;
         case '"':
            output += "&quot;";
            break;
         case '\'':
            output += "&apos;";
            break;
         case '\n':
            output += "<br>";
            break;
         case '\r':
            break;
         case ' ':
            output += "&nbsp;";
            break;
      }
   }
   return output;
}

function ansiEncode( input )
{
   input = input.replace( /\[([0-9];)*[0-9]*m/g,
         function( data )
         {
            data = data.substr( 1, data.length ); //knock off the leading '['
            var args = data.split( ';' );
            var ret = new String();

            if (args[0] == 1 ) //Bright mode is set
            {
               var colorClass = 'B' + args[args.length-1];
               args = args.slice( 1, args.length-1 );
               for( i = 0; i < args.length; i++ )
               {
                  ret += "ansi" + args[i] + " ";
               }
               ret += colorClass;
            }
            else
            {
               var colorClass = 'c' + args[args.length-1];
               args = args.slice( 0, args.length-1);
               for( i = 0; i < args.length; i++ )
               {
                  ret += "ansi" + args[i] + " ";
               }
               ret += colorClass;
            }
            return "<span class='" + ret + "'>";
         });

   //Count how many spans I have to close
   var tmp = input.replace( /\<span/g, "" );
   var count = (input.length - tmp.length) / "<span".length;
   //close them
   for( i = 0; i < count; i++ )
      input += "</span>";
   return input;
}

function parseEmails( data )
{
   var emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

   data = data.replace( emailRegex,
         function( email )
         {
            return "<a class='output' href='mailto:" + email + "' target='_blank'>" + email + "</a>";
         });
   return data;
}

function parseURLs( data )
{
   var urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/ig;

   data = data.replace( urlRegex,
         function( url )
         {
            return "<a class='output' href='" + url + "' target='_blank'>" + url + "</a>";
         });
   return data;
}

