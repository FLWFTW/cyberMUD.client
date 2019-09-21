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

function evalMstat( obj )
{
   writeTermRaw( "<span class-'ansi0'>MSTAT</span><br>" );
   writeTermRaw( "<table class='stat'>" );
   writeTermRaw( "<tr><td>Name: &nbsp;</td><td>" + obj.data.name + "</td><td>Vnum: &nbsp;</td><td>" + obj.data.vnum + "</td></tr>" );
   writeTermRaw( "<tr><td>Sdesc: &nbsp;</td><td>" + obj.data.sdesc + "</td><td>Ldesc: &nbsp;</td><td>" + obj.data.ldesc + "</td></tr>" );
   writeTermRaw( "<tr><td>Gender: &nbsp;</td><td>" + obj.data.gender + "</td><td>Race: &nbsp;</td><td>" + obj.data.race + "</td></tr>" );
   writeTermRaw( "<tr><td>Citizenship: &nbsp;</td><td>" + obj.data.citizenship + "</td><td>Association: &nbsp;</td><td>" + obj.data.association + "</td></tr>" );
   writeTermRaw( "<tr><td>Brains: &nbsp;</td><td>" + obj.data.brains + "</td></tr>" );
   writeTermRaw( "<tr><td>Brawn: &nbsp;</td><td>" + obj.data.brawn + "</td></tr>" );
   writeTermRaw( "<tr><td>Senses: &nbsp;</td><td>" + obj.data.senses + "</td></tr>" );
   writeTermRaw( "<tr><td>Stamina: &nbsp;</td><td>" + obj.data.stamina + "</td></tr>" );
   writeTermRaw( "<tr><td>Coordination: &nbsp;</td><td>" + obj.data.coordination + "</td></tr>" );
   writeTermRaw( "<tr><td>Cool: &nbsp;</td><td>" + obj.data.cool + "</td></tr>" );
   writeTermRaw( "<tr><td>Luck: &nbsp;</td><td>" + obj.data.luck + "</td></tr>" );
   writeTermRaw( "<tr><td>Health: &nbsp;</td><td>" + obj.data.cur_hp + "/" + obj.data.max_hp + "</td><td>Position: &nbsp;</td><td>" + obj.data.position + " (" + obj.data.position_string + ")</td></tr>" );
   writeTermRaw( "<tr><td>Height: &nbsp;</td><td>" + obj.data.height + "</td><td>Build: &nbsp;</td><td>" + obj.data.build + "</td></tr>" );
   writeTermRaw( "<tr><td>Eye Shape: &nbsp;</td><td>" + obj.data.eyeshape + "</td><td>Eye Color: &nbsp;</td><td>" + obj.data.eyecolor + "</td></tr>" );
   writeTermRaw( "<tr><td>Hair Style: &nbsp;</td><td>" + obj.data.hairstyle + "</td><td>Hair Color: &nbsp;</td><td>" + obj.data.eyecolor + "</td></tr>" );
   writeTermRaw( "<tr><td>Skin Color: &nbsp;</td><td>" + obj.data.skincolor + "</td><td>Age: &nbsp;</td><td>" + obj.data.age + "</td></tr>" );
   writeTermRaw( "<tr><td>Signal: &nbsp;</td><td>" + obj.data.signal + "</td><td>Encumberance: &nbsp;</td><td>" + obj.data.encumberance + "</td></tr>" );
   writeTermRaw( "<tr><td>BTC: &nbsp;</td><td>" + obj.data.btc + "</td></tr>" );

   writeTermRaw( "</table><br>" );
}

function evalOstat( obj )
{
   writeTermRaw( "<span class='ansi0'>OSTAT</span><br>" );
   writeTermRaw( "<table class='stat'>" );
   writeTermRaw( "<tr><td>Name: &nbsp;</td><td>" + obj.data.name + "</td></tr>" );
   writeTermRaw( "<tr><td>Vnum: &nbsp;</td><td>" + obj.data.vnum + "</td></tr>" );
   writeTermRaw( "<tr><td>GUID: &nbsp;</td><td>" + obj.data.guid + "</td></tr>" );
   writeTermRaw( "<tr><td>Short Desc: &nbsp;</td><td>" + obj.data.sdesc + "</td></tr>" );
   writeTermRaw( "<tr><td>Long Desc: &nbsp;</td><td>" + obj.data.ldesc + "</td></tr>" );
   writeTermRaw( "<tr><td>Wear Position: &nbsp;</td><td>" + obj.data.wear_pos_string + " (" + obj.data.wear_pos + ")</td></tr>" );
   writeTermRaw( "<tr><td>Type: &nbsp;</td><td>" + obj.data.type_string + " (" + obj.data.type + ")</td></tr>" );
   writeTermRaw( "<tr><td>Capacity (cm3): &nbsp;</td><td>" + ( "content_volume" in obj.data ? ( obj.data.content_volume + "/" ) : "" ) + obj.data.capacity + "</td></tr>" );
   writeTermRaw( "<tr><td>Volume (cm3): &nbsp;</td><td>" + obj.data.volume + "</td></tr>" );
   writeTermRaw( "</table><br>" );
}

function evalRoom( obj )
{
   writeTermRaw( "<span class='color-room-name'>" + sanitize( obj.data.name ) + "</span><br>" );
   $("#room-name").html( sanitize( obj.data.name ) );
   $("#room-desc").html( sanitize( obj.data.description ) );
   writeTermRaw( "<p class='color-room-desc room-desc'>" + sanitize( obj.data.description ) + "</p>" );
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
   writeTermRaw( "<br>" );
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

   obj.data.objects.forEach( function( item )
         {
            item .count = 1;
            for( var i = obj.data.objects.length -1; i > 0; i-- )
            {
               if( item == obj.data.objects[i] )
                  break;
               if( item .vnum == obj.data.objects[i].vnum )
               {
                  item.count++;
                  obj.data.objects.splice(i,1);
               }
            }
            let context = window.btoa( '[{"label":"examine","command":"examine '+item.guid+'", "echo":"examine &apos;'+item.sdesc+'&apos;"},{"label":"stow","command":"stow '+item.guid+'", "echo":"stow &apos;'+item.sdesc+'&apos;"},{"label":"get","command":"get '+item.guid+'", "echo":"get &apos;'+item.sdesc+'&apos;"}]' );
            if( item.count > 1 )
            {
               writeTermRaw( "<span class='color-obj object context' data-guid='" + item.guid + "' data-default='look' data-context='" + context + "'>" + sanitize( item.ldesc ) + " (" + item.count +")</span><br>" );
            }
            else
            {
               writeTermRaw( "<span class='color-obj object context' data-guid='" + item.guid + "' data-default='look' data-context='" + context + "'>" + sanitize( item.ldesc ) + "</span><br>" );
            }
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
      writeTermRaw( "<br>&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;<span class='color-obj object context' data-guid='"+ guid + "' data-default='look " + guid + "' data-context='" + context + "'>" +" "+ sanitize( sdesc ) + "</span>" );

      if( "contents" in obj.data.right )
      {
         listContents( obj.data.right, 9 );
      }
   }
   if( "left" in obj.data )
   {
      hasInventory = true;
      let sdesc = sanitize(obj.data.left.object.sdesc);
      let guid = obj.data.left.object.guid;
      let context = window.btoa( '[{"label":"wear","command":"wear '+guid+'", "echo":"wear &apos;'+sdesc+'&apos;"},{"label":"stow","command":"stow '+guid+'", "echo":"stow &apos;'+sdesc+'&apos;"},{"label":"drop","command":"drop '+guid+'", "echo":"drop &apos;'+sdesc+'&apos;"}]' );

      writeTermRaw( "<br>&nbsp&nbsp&nbsp<span class='color-normal'>Held in left hand</span>" );
      writeTermRaw( "<br>&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;<span class='color-obj object context' data-guid='"+ guid + "' data-default='look " + guid + "' data-context='" + context + "'>"  + " "+ sanitize( sdesc ) + "</span>" );

      if( "contents" in obj.data.left )
      {
         listContents( obj.data.left, 9 );
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
         writeTermRaw( "<br>&nbsp;&nbsp;&nbsp;<span class='color-normal object context' data-default='' data-context='"+context+"'>In " + " "+ sanitize( item.sdesc ) + "</span>" );
         listContents( item, 7 );
      });
   }
   if( hasInventory == false )
   {
      writeTermRaw( "<br><span class='color-red'>&nbsp;&nbsp;&nbsp;Nothing.</span>" );
   }
   writeTermRaw( "</span><br>" );
}

function listContents( obj, indent )
{
   obj.contents.forEach( function( item ) //Count and remove duplicates
         {
            item.count = 1;
            for( var i = obj.contents.length -1; i > 0; i-- )
            {
               if( item == obj.contents[i] )
                  break;
               if( item.vnum == obj.contents[i].vnum )
               {
                  item.count++;
                  obj.contents.splice(i,1);
               }
            }
         });
   obj.contents.forEach( function( item )
         {
            let context = window.btoa( '[{"label":"get","command":"get ' + item.guid + " " + obj.guid + '", "echo":"get &apos;'+sanitize(item.sdesc)+'&apos; from &apos;'+sanitize(obj.sdesc)+'&apos;"}]' );
            if( item.count > 1 )
            {
               writeTermRaw( "<br>" + "&nbsp;".repeat(indent) + "<span class='color-obj object context' data-default='' data-context='"+context+"'>" + sanitize( item.sdesc ) + " (" + item.count + ")</span>" );
            }
            else
            {
               writeTermRaw( "<br>" + "&nbsp;".repeat(indent) + "<span class='color-obj object context' data-default='' data-context='"+context+"'>" + sanitize( item.sdesc ) + "</span>" );
            }
         });
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
      //$("#client").show().animate({height:"75vh"});
      $("#left-window").animate({left:"0px"});
      $("#right-window").animate({right:"0px"});
      $("#bottom-window").animate({height:"20vh",padding:"10px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
      $("#bottom-show-hide").html("&#9660").css('top', '-0.5em');
      $("#left-show-hide").html( "&#9664;").css('right', '-0.5em' );
      $("#right-show-hide").html( "&#9654;").css('left', '-0.5em' );
      $("#chargen-wrapper").hide();
      $("#redit-wrapper").hide();
      
   }
   else if( obj.data.text == "Hide_all_windows" )
   {
      $("#client").show().animate({height:"95vh"});
      $("#left-window").animate({left:"-20vw"});
      $("#right-window").animate({right:"-20vw"});
      $("#bottom-window").animate({height:"0px", padding:"0px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
      $("#right-show-hide").html( "&#9664;").css('left', '-1em' );
      $("#left-show-hide").html( "&#9654;").css('right', '-1em' );
      $("#bottom-show-hide").html("&#9650").css('top', '-1em');
      $("#chargen-wrapper").hide();
   }
   else if( obj.data.text == "chargen_menu" )
   {
      $("#left-window").animate({left:"-20vw"});
      $("#right-window").animate({right:"-20vw"});
      $("#bottom-window").animate({height:"0px", padding:"0px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
      $("#right-show-hide").html( "&#9664;").css('left', '-1em' );
      $("#left-show-hide").html( "&#9654;").css('right', '-1em' );
      $("#bottom-show-hide").html("&#9650").css('top', '-1em');
      $("#client").animate({height:"0vh"}).hide();
      $("#chargen-wrapper").show();
   }
   else if( obj.data.text == "redit" )
   {
      $("#redit-room-name").val( obj.data.room.name );
      $("#redit-room-desc").val( obj.data.room.description );
      $("#redit-room-vnum").html( obj.data.room.vnum );
      obj.data.room.exits.forEach( function( exit )
      {
         $("#redit-exits").append( "<div class='redit-exit-row'><select class='redit-exit-direction'>" );
         if( exit.name == 'north' )
         {
            $("#redit-exits").append( "<option value='north' selected>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'south' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south' selected>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'east' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east' selected>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'west' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west' selected>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'northeast' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast' selected>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'southeast' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast' selected>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'northwest' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest' selected>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'southwest' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest' selected>southwest</option><option value='up'>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'up' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up' selected>up</option><option value='down'>down</option></select>" );
         }
         else if( exit.name == 'down' )
         {
            $("#redit-exits").append( "<option value='north'>north</option><option value='south'>south</option><option value='east'>east</option><option value='west'>west</option><option value='northeast'>northeast</option><option value='southeast'>southeast</option><option value='northwest'>northwest</option><option value='southwest'>southwest</option><option value='up'>up</option><option value='down' selected>down</option></select>" );
         }

         $("#redit-exits").append("<input type='number' class='redit-exit-to-vnum' autocomplete='off' min='1' value='" + exit.to_vnum + "'>");
         if( exit.lock_state == 0 )
         {
            $("#redit-exits").append( "<select class='redit-exit-state'><option value='free' selected>free</option><option value='jammed'>jammed</option><option value='closed'>closed</option><option value='open'>open</option><option value='broken'>broken</option></select>" );
         }
         else if( exit.lock_state == 1 )
         {
            $("#redit-exits").append( "<select class='redit-exit-state'><option value='free'>free</option><option value='jammed' selected>jammed</option><option value='closed'>closed</option><option value='open'>open</option><option value='broken'>broken</option></select>" );
         }
         else if( exit.lock_state == 2 )
         {
            $("#redit-exits").append( "<select class='redit-exit-state'><option value='free'>free</option><option value='jammed'>jammed</option><option value='closed' selected>closed</option><option value='open'>open</option><option value='broken'>broken</option></select>" );
         }
         else if( exit.lock_state == 3 )
         {
            $("#redit-exits").append( "<select class='redit-exit-state'><option value='free'>free</option><option value='jammed'>jammed</option><option value='closed'>closed</option><option value='open' selected>open</option><option value='broken'>broken</option></select>" );
         }
         else if( exit.lock_state == 4 )
         {
            $("#redit-exits").append( "<select class='redit-exit-state'><option value='free'>free</option><option value='jammed'>jammed</option><option value='closed'>closed</option><option value='open'>open</option><option value='broken' selected>broken</option></select>" );
         }

         $("#redit-exits").append( "<select class='redit-lock-type'><option value='pintumbler'>pintumbler</option><option value='combo'>combo</option><option value='electricpin'>electric</option><option value='fingerprint'>fingerprint</option><option value='remote'>remote</option></select><select class='redit-lock-state'><option value='free'>free</option><option value='jammed'>jammed</option><option value='locked'>locked</option><option value='unlocked'>unlocked</option></select>&nbsp;<span class='redit-exit-delete' style='font-weight:bold;cursor:pointer;'>&#10060;</span></div><!--end-exit-row-->" );
      });
                  
      $("#redit-wrapper").show();
   }
}

function evalBuildRoomData( obj )
{
   console.log( obj );
   $("#redit-room-name").val( obj.data.room.name );
   $("#redit-room-description").val( obj.data.room.description );
   $("#redit-room-vnum").html( obj.data.room.vnum );
   $("#redit-wrapper").show();
}
