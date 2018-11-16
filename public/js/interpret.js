function evalPrompt( obj )
{
   if( obj.data.gender == "female" )
      var bodyMesh = bodyMeshMain.female;
   else
      var bodyMesh = bodyMeshMain.male;

   $("#player-health").html( Math.floor(obj.data.cur_hp/obj.data.max_hp*100) + "%" );
   $("#player-encumberance").html( obj.data.encumberance + "%" );
   $("#player-signal").html( obj.data.signal + "%" );
   $("#player-bandwidth").html( obj.data.cur_bandwidth + " kbit/s" );
   $("#player-btc").html( obj.data.btc );
   $("#player-name").html( obj.data.name.toUpperCase() );
   $("#player-head-status").html( obj.data.body.head.health + "%" );
   $("#player-eyes-status").html( obj.data.body.eyes.health + "%" );
   $("#player-neck-status").html( obj.data.body.neck.health+ "%" );
   $("#player-larm-status").html( obj.data.body["left arm"].health + "%" );
   $("#player-rarm-status").html( obj.data.body["right arm"].health + "%" );
   $("#player-lleg-status").html( obj.data.body["left leg"].health + "%" );
   $("#player-rleg-status").html( obj.data.body["right leg"].health + "%" );
   $("#player-torso-status").html( obj.data.body.torso.health + "%" );
   $("#player-position").html( obj.data.position_string );

   $("#skill-combat").html( obj.data.skills.combat );
   $("#skill-engineering").html( obj.data.skills.engineering );
   $("#skill-subterfuge").html( obj.data.skills.subterfuge );
   $("#skill-medicine").html( obj.data.skills.medicine);
   $("#skill-personality").html( obj.data.skills.personality );
   
   if( obj.data.body.head.health < 50 )
   {
      $("#body-mesh-head").attr( "src", bodyMesh.head.red );
   }
   else if( obj.data.body.head.health < 75 )
   {
      $("#body-mesh-head").attr( "src", bodyMesh.head.yellow );
   }
   else
   {
      $("#body-mesh-head").attr( "src", bodyMesh.head.blue );
   }

   if( obj.data.body.eyes.health < 50 )
   {
      $("#body-mesh-eyes").attr( "src", bodyMesh.eyes.red );
   }
   else if( obj.data.body.eyes.health < 75 )
   {
      $("#body-mesh-eyes").attr( "src", bodyMesh.eyes.yellow );
   }
   else
   {
      $("#body-mesh-eyes").attr( "src", bodyMesh.eyes.blue );
   }

   if( obj.data.body.neck.health < 50 )
   {
      $("#body-mesh-neck").attr( "src", bodyMesh.neck.red );
   }
   else if( obj.data.body.neck.health < 75 )
   {
      $("#body-mesh-neck").attr( "src", bodyMesh.neck.yellow );
   }
   else
   {
      $("#body-mesh-neck").attr( "src", bodyMesh.neck.blue );
   }

   if( obj.data.body["left arm"].health < 50 )
   {
      $("#body-mesh-larm").attr( "src", bodyMesh.larm.red );
   }
   else if( obj.data.body["left arm"].health < 75 )
   {
      $("#body-mesh-larm").attr( "src", bodyMesh.larm.yellow );
   }
   else
   {
      $("#body-mesh-larm").attr( "src", bodyMesh.larm.blue );
   }

   if( obj.data.body["right arm"].health < 50 )
   {
      $("#body-mesh-rarm").attr( "src", bodyMesh.rarm.red );
   }
   else if( obj.data.body["right arm"].health < 75 )
   {
      $("#body-mesh-rarm").attr( "src", bodyMesh.rarm.yellow );
   }
   else
   {
      $("#body-mesh-rarm").attr( "src", bodyMesh.rarm.blue );
   }

   if( obj.data.body.torso.health < 50 )
   {
      $("#body-mesh-torso").attr( "src", bodyMesh.torso.red );
   }
   else if( obj.data.body.torso.health < 75 )
   {
      $("#body-mesh-torso").attr( "src", bodyMesh.torso.yellow );
   }
   else
   {
      $("#body-mesh-torso").attr( "src", bodyMesh.torso.blue );
   }

   if( obj.data.body["left leg"].health < 50 )
   {
      $("#body-mesh-lleg").attr( "src", bodyMesh.lleg.red );
   }
   else if( obj.data.body["left leg"] < 75 )
   {
      $("#body-mesh-lleg").attr( "src", bodyMesh.lleg.yellow );
   }
   else
   {
      $("#body-mesh-lleg").attr( "src", bodyMesh.lleg.blue );
   }

   if( obj.data.body["right leg"].health < 50 )
   {
      $("#body-mesh-rleg").attr( "src", bodyMesh.rleg.red );
   }
   else if( obj.data.body["right leg"].health  < 75 )
   {
      $("#body-mesh-rleg").attr( "src", bodyMesh.rleg.yellow );
   }
   else
   {
      $("#body-mesh-rleg").attr( "src", bodyMesh.rleg.blue );
   }

}

function evalChat( obj )
{
   if( obj.data.from.toUpperCase() != $("#player-name").html() )
   {
      $("#player-chat-content").append( "<span class='color-chat'>" + sanitize( obj.data.from ) + ": " + sanitize( obj.data.message ) + "</span><br>" );
      $("#player-chat-content").scrollTop( $("#player-chat-content")[0].scrollHeight);
      writeTermRaw( "<span class='color-chat'>" + sanitize( obj.data.from ) + " chats: " + sanitize( obj.data.message ) + "</span><br>" );
   }
   else
   {
      $("#player-chat-content").append( "<span class='color-chat'>You: " + sanitize( obj.data.message ) + "</span><br>" );
      $("#player-chat-content").scrollTop( $("#player-chat-content")[0].scrollHeight);
      writeTermRaw( "<span class='color-chat'>You chat: " + sanitize( obj.data.message ) + "</span><br>" );
   }
}

function evalTell( obj )
{
   $("#player-chat-content").append( "<span class='color-tell'>" + sanitize( obj.data.from ) + " tells you: " + sanitize( obj.data.message ) + "</span><br>" );
   $("#player-chat-content").scrollTop( $("#player-chat-content")[0].scrollHeight);
   writeTermRaw( "<span class='color-tell'>" + sanitize( obj.data.from ) + " tells you, '" + sanitize( obj.data.message ) + "'</span><br>" );
}

function evalSay( obj )
{
   if( obj.data.from.toUpperCase() != $("#player-name").html() )
      writeTermRaw( "<span class='color-say'>" + sanitize( obj.data.from ) + " says, '" + sanitize( obj.data.message ) + "'</span><br>" );
   else
      writeTermRaw( "<span class='color-say'>You say, '" + sanitize( obj.data.message ) + "'</span><br>" );
}

function evalOstat( obj )
{
   writeTermRaw( "<span class='ansi0'>OSTAT</span><br>" );
   writeTermRaw( "<table>" );
   writeTermRaw( "<tr><td>Name: &nbsp;</td><td>" + obj.data.name + "</td></tr>" );
   writeTermRaw( "<tr><td>Vnum: &nbsp;</td><td>" + obj.data.vnum + "</td></tr>" );
   writeTermRaw( "<tr><td>GUID: &nbsp;</td><td>" + obj.data.guid + "</td></tr>" );
   writeTermRaw( "<tr><td>Short Desc: &nbsp;</td><td>" + obj.data.sdesc + "</td></tr>" );
   writeTermRaw( "<tr><td>Long Desc: &nbsp;</td><td>" + obj.data.ldesc + "</td></tr>" );
   writeTermRaw( "<tr><td>Wear Position: &nbsp;</td><td>" + obj.data.wear_pos_string + " (" + obj.data.wear_pos + ")</td></tr>" );
   writeTermRaw( "<tr><td>Wear Position: &nbsp;</td><td>" + obj.data.type_string + " (" + obj.data.type + ")</td></tr>" );
   writeTermRaw( "<tr><td>Capacity (cm3): &nbsp;</td><td>" + ( "content_volume" in obj.data ? ( obj.data.content_volume + "/" ) : "" ) + obj.data.capacity + "</td></tr>" );
   writeTermRaw( "<tr><td>Volume (cm3): &nbsp;</td><td>" + obj.data.volume + "</td></tr>" );
   writeTermRaw( "</table><br>" );
}

function evalRoom( obj )
{
   writeTermRaw( "<span class='color-room-name'>" + sanitize( obj.data.name ) + "</span><br>" );
   $("#room-name").html( sanitize( obj.data.name ) );
   $("#room-desc").html( sanitize( obj.data.description ) );
   writeTermRaw( "<span class='color-room-desc'>" + sanitize( obj.data.description ) + "</span><br>" );
   writeTermRaw( "<span class='ansi0'>Exits: </span>" );
   $(".globe-arrow").hide();
   let exitstring = "";
   obj.data.exits.forEach( function( exit )
         {
            const EXIT_FREE = 0, EXIT_JAMMED = 1, EXIT_CLOSED = 2, EXIT_OPEN = 3, EXIT_BROKEN_OPEN = 4;
            const LOCK_FREE = 0, LOCK_JAMMED = 1, LOCK_LOCKED = 2, LOCK_UNLOCKED = 3;
            console.log( exit );
            let context =  '[{"label":"look", "command":"look ' + sanitize( exit.name ) + '", "echo":"look ' + sanitize( exit.name ) + '"}';
            if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
            {
               context +=  ',{"label":"open", "command":"open ' + sanitize( exit.name ) + '", "echo":"open ' + sanitize( exit.name ) + '"}';
            }
            else if( exit.exit_state == EXIT_OPEN || exit.exit_state == EXIT_BROKEN_OPEN )
            {
               context +=  ',{"label":"close", "command":"close ' + sanitize( exit.name ) + '", "echo":"close ' + sanitize( exit.name ) + '"}';
            }
            if( exit.lock_state == LOCK_JAMMED || exit.lock_state == LOCK_LOCKED )
            {
               context +=  ',{"label":"unlock", "command":"unlock ' + sanitize( exit.name ) + '", "echo":"unlock ' + sanitize( exit.name ) + '"}';
            }
            else if( exit.lock_state == LOCK_LOCKED )
            {
               context +=  ',{"label":"lock", "command":"lock ' + sanitize( exit.name ) + '", "echo":"lock ' + sanitize( exit.name ) + '"}';
               context +=  ',{"label":"pick", "command":"pick ' + sanitize( exit.name ) + '", "echo":"pick ' + sanitize( exit.name ) + '"}';
            }
            context += ']';
            exitstring += "&nbsp;<span class='ansi0 direction context' data-direction='" + sanitize( exit.name ) + "' data-context='" + window.btoa( context ) + "'>";
            if( exit.exit_state == EXIT_CLOSED )
            {
               exitstring += '[' + sanitize( exit.name ) + ']';
            }
            else if( exit.exit_state == EXIT_OPEN )
            {
               exitstring += ']' + sanitize( exit.name ) + '[';
            }
            else if( exit.exit_state == EXIT_BROKEN_OPEN )
            {
               exitstring += '}' + sanitize( exit.name ) + '{';
            }
            else if( exit.exit_State == EXIT_JAMMED )
            {
               exitstring += '{' + sanitize( exit.name ) + '}';
            }
            else
            {
               exitstring += sanitize( exit.name );
            }

            exitstring += "</span>";

            if( exit.name.toLowerCase() == "north" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-north-arrow").html("&#8892;");
               else
                  $("#globe-north-arrow").html("^");
               $("#globe-north").show();
            }
            else if( exit.name.toLowerCase() == "northeast" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-northeast-arrow").html("&#8892;");
               else
                  $("#globe-northeast-arrow").html("^");
               $("#globe-northeast").show();
            }
            else if( exit.name.toLowerCase() == "east" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-east-arrow").html("&#8892;");
               else
                  $("#globe-east-arrow").html("^");
               $("#globe-east").show();
            }
            else if( exit.name.toLowerCase() == "southeast" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-southeast-arrow").html("&#8892;");
               else
                  $("#globe-southeast-arrow").html("^");
               $("#globe-southeast").show();
            }
            else if( exit.name.toLowerCase() == "south" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-south-arrow").html("&#8892;");
               else
                  $("#globe-south-arrow").html("^");
               $("#globe-south").show();
            }
            else if( exit.name.toLowerCase() == "southwest" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-southwest-arrow").html("&#8892;");
               else
                  $("#globe-southwest-arrow").html("^");
               $("#globe-southwest").show();
            }
            else if( exit.name.toLowerCase() == "west" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-west-arrow").html("&#8892;");
               else
                  $("#globe-west-arrow").html("^");
               $("#globe-west").show();
            }
            else if( exit.name.toLowerCase() == "northwest" )
            {
               if( exit.exit_state == EXIT_CLOSED || exit.exit_state == EXIT_JAMMED )
                  $("#globe-northwest").html("&#8892;");
               else
                  $("#globe-northwest").html("^");
               $("#globe-northwest").show();
            }

         });
   writeTermRaw( exitstring );
   $("#room-exits").html( "<span class='ansi0'>Exits: </span>" + exitstring );
   if( obj.data.exits.length == 0 )
      writeTermRaw( "<span class='ansi0'>&nbsp;None</span>" );
   writeTermRaw( ".<br>" );
   obj.data.mobiles.forEach( function( mob )
         {
            let position = "";
            switch( mob.position_string )
            {
               case "standing":
                  position += " is standing here.";
                  break;
               default:
                  position += " is " + mob.position_string + " here.";
                  break;
            }
            let context=window.btoa( '[{"label":"look", "command":"look '+mob.guid+'", "echo":"look &apos;'+mob.name+'&apos;"},{"label":"speak", "command":"speak '+mob.guid+'", "echo":"speak &apos;'+mob.name+'&apos;"},{"label":"kill", "command":"kill '+mob.guid+'", "echo":"kill &apos;'+mob.name+'&apos;"}]' );
            if( "ldesc" in mob )
               writeTermRaw( "<span class='color-mob mobile context' data-guid='" + mob.guid + "' data-default='look' data-context='" + context + "'>" + sanitize( mob.ldesc ) + "</span><br>" );
            else
               writeTermRaw( "<span class='color-mob mobile context' data-guid='" + mob.guid + "' data-default='look' data-context='" + context + "'>" + sanitize( mob.name ) + position + "</span><br>" );
         });

   obj.data.objects.forEach( function( obj )
         {
            let context = window.btoa( '[{"label":"examine","command":"examine '+obj.guid+'", "echo":"examine &apos;'+obj.sdesc+'&apos;"},{"label":"stow","command":"stow '+obj.guid+'", "echo":"stow &apos;'+obj.sdesc+'&apos;"},{"label":"get","command":"get '+obj.guid+'", "echo":"get &apos;'+obj.sdesc+'&apos;"}]' );
            writeTermRaw( "<span class='color-obj object context' data-guid='" + obj.guid + "' data-default='look' data-context='" + context + "'>" + sanitize( obj.ldesc ) + "</span><br>" );
         });
}

function evalInventory( obj )
{
   let hasInventory = false;
   writeTermRaw( "<span class='color-inventory'>Inventory" );
   if( "right" in obj.data )
   {
      hasInventory = true;
      let guid = obj.data.right.object.guid;
      let sdesc = obj.data.right.object.sdesc;
      let context = window.btoa( '[{"label":"wear","command":"wear '+guid+'", "echo":"wear &apos;'+sdesc+'&apos;"},{"label":"stow","command":"stow '+guid+'", "echo":"stow &apos;'+sdesc+'&apos;"},{"label":"drop","command":"drop '+guid+'", "echo":"drop &apos;'+sdesc+'&apos;"}]' );

      writeTermRaw( "<br>&nbsp&nbsp&nbsp<span class='color-normal'>Held in right hand</span>" );
      writeTermRaw( "<br>&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;<span class='color-obj object context' data-guid='"+ guid + "' data-default='look " + guid + "' data-context='" + context + "'>"  + aoran(sdesc) +" "+ sanitize( sdesc ) + "</span>" );

      if( "contents" in obj.data.right )
      {
         obj.data.right.contents.forEach( function(item)
         {
            let guid = item.guid;
            let context = window.btoa( '[{"label":"get","command":"get ' + guid + " " + obj.data.right.object.guid + '", "echo":"get &apos;'+item.sdesc+'&apos; from &apos;'+sdesc+'&apos;"}]' );
            writeTermRaw("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='color-obj object context' data-default='' data-context='"+context+"'>"  + aoran(item.sdesc) +" "+ sanitize( item.sdesc ) + "</span>" );
         });
      }
   }
   if( "left" in obj.data )
   {
      hasInventory = true;
      let sdesc = sanitize(obj.data.left.object.sdesc);
      let guid = obj.data.left.object.guid;
      let context = window.btoa( '[{"label":"wear","command":"wear '+guid+'", "echo":"wear &apos;'+sdesc+'&apos;"},{"label":"stow","command":"stow '+guid+'", "echo":"stow &apos;'+sdesc+'&apos;"},{"label":"drop","command":"drop '+guid+'", "echo":"drop &apos;'+sdesc+'&apos;"}]' );

      writeTermRaw( "<br>&nbsp&nbsp&nbsp<span class='color-normal'>Held in left hand</span>" );
      writeTermRaw( "<br>&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;<span class='color-obj object context' data-guid='"+ guid + "' data-default='look " + guid + "' data-context='" + context + "'>"  + aoran(sdesc) +" "+ sanitize( sdesc ) + "</span>" );

      if( "contents" in obj.data.left )
      {
         obj.data.left.contents.forEach( function(item)
         {
            let guid = item.guid
            let context = window.btoa( '[{"label":"get","command":"get ' + guid + " " + obj.data.left.object.guid + '", "echo":"get &apos;'+sanitize(item.sdesc)+'&apos; from &apos;'+sanitize(sdesc)+'&apos;"}]' );
            writeTermRaw("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='color-obj object context' data-default='' data-context='"+context+"'>"  + aoran(item.sdesc) +" "+ sanitize( item.sdesc ) + "</span>" );
         });
      }
   }

   if( "containers" in obj.data )
   {
      obj.data.containers.forEach( function(item)
      { 
         hasInventory = true;
         let sdesc = item.sdesc;
         let guid = item.guid;
         let context = window.btoa( '[{"label":"remove","command":"remove '+guid+'", "echo":"remove &apos;'+sdesc+'&apos;"},{"label":"stow","command":"stow '+guid+'", "echo":"stow &apos;'+sdesc+'&apos;"},{"label":"drop","command":"drop '+guid+'", "echo":"drop &apos;'+sdesc+'&apos;"}]' );
         writeTermRaw( "<br>&nbsp;&nbsp;&nbsp;<span class='color-normal object context' data-default='' data-context='"+context+"'>In " + aoran(item.sdesc) +" "+ sanitize( item.sdesc ) + "</span>" );
         item.contents.forEach( function(content)
         {
            let context = window.btoa( '[{"label":"get","command":"get ' + content.guid + " " + item.guid + '", "echo":"get &apos;'+sanitize(content.sdesc)+'&apos; from &apos;'+sanitize(item.sdesc)+'&apos;"}]' );
            writeTermRaw( "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='color-obj object context' data-default='' data-context='"+context+"'>"  + aoran(content.sdesc) +" "+ sanitize( content.sdesc ) + "</span>" );
         });
      });
   }
   if( hasInventory == false )
   {
      writeTermRaw( "<br><span class='color-red'>&nbsp;&nbsp;&nbsp;Nothing.</span>" );
   }
   writeTermRaw( "</span><br>" );
}

function evalEquipment( obj )
{
   writeTermRaw( "<span class='ansi0'>You are wearing</span><br>" );
   writeTermRaw( "<table>" );
   if( obj.data.length > 0 )
   {
      obj.data.forEach( function( object )
            {
               switch( object.covers )
               {
                  default:
                     writeTermRaw( "<tr><td>" + "&lt;worn on your " + object.covers + "&gt;&nbsp;&nbsp;" + "&nbsp;</td><td>" + sanitize( object.sdesc ) + "</td></tr>" );
                     break;
                  case "slung":
                     writeTermRaw( "<tr><td>" + "&lt;" + object.covers + "&gt;" + "&nbsp;</td><td>" + sanitize( object.sdesc ) + "</td></tr>" );
                     break;
               }
            });
   }
   else
   {
      writeTermRaw( "<tr><td>Nothing.</td></tr>" );
   }
   writeTermRaw( "</table><br>" );
}

function evalUICommand( obj )
{
   console.log( obj );
   if( obj.data.text == "Show_all_windows" )
   {
      $("#client").animate({height:"75vh"});
      $("#left-window").animate({left:"0px"});
      $("#right-window").animate({right:"0px"});
      $("#bottom-window").animate({height:"20vh",padding:"10px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
      $("#bottom-show-hide").html("&#9660").css('top', '-0.5em');
      $("#left-show-hide").html( "&#9664;").css('right', '-0.5em' );
      $("#right-show-hide").html( "&#9654;").css('left', '-0.5em' );
      
   }
   else if( obj.data.text == "Hide_all_windows" )
   {
      $("#client").animate({height:"95vh"});
      $("#left-window").animate({left:"-20vw"});
      $("#right-window").animate({right:"-20vw"});
      $("#bottom-window").animate({height:"0px", padding:"0px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
      $("#right-show-hide").html( "&#9664;").css('left', '-1em' );
      $("#left-show-hide").html( "&#9654;").css('right', '-1em' );
      $("#bottom-show-hide").html("&#9650").css('top', '-1em');
   }
}

