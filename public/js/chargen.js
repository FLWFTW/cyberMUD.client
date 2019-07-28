
   const helps = {
      "name-input-div": "Name<br>You are required to come up with a unique, cyberpunk themed name for your character. The name you create should take into account your character's gender, race, background, and personality. Characters should not be named after popular fictional characters; they should not be named after celebrities or political figures; they should be in good taste and not contain foul language, and they should not be ordinary words or slang nick-names.",
      "gender-input-div": "Gender<br>Your character can be either male, female, or nonbinary. Your gender can be a significant part of your role-playing in the game, but otherwise your gender has no actual affect on your character's strength, success, or capability. Select the gender that best describes your character.",
      "race-input-div": "Race<br>Your race is an important part of the story you craft for your character. You can be either human or synthetic, each has their strengths and weaknesses. The main differences are outlined below.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Humans: Humans are organic creatures ....................<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Synthetics: Synthetics are inorganic machines engineered by .........................",
      "age-input-div": "Age<br>Characters do not age in CyberMUD. Choose an age between 18 and 65 that best represents your character.",
      "brains-input-div": "Brains<br>The mental capacity of your character. Characters with high brains are able to learn faster, gain more skill points per level, and are better able to complete skills requiring brainpower.",
      "brawn-input-div": "Brawn<br>The overall strength of a character. Characters with high brawn are able to lift more, hit harder, and are better able to complete skills requiring brute strength.",
      "stamina-input-div": "Stamina<br>The physical constitution of a character. Characters with high stamina are able to endure more damage, run farther, and are better able to complete skills requiring endurance.",
      "senses-input-div": "Senses<br>Represents the character's ability to observe and understand the world around them. Characters with acute senses quickly notice changes in the environment, they are more perceptive and notice details others may miss, and are better able to complete skills requiring keen senses.",
      "coordination-input-div": "Coordination<br>Represents the overall agility or dexterity of a character. Character with high coordination are able to quickly move during combat, fire more accurately, and exhibit greater finesse in any physical action.",
      "cool-input-div": "Cool<br>Represents your character's charm and ability to interact with, talk to, convince, inspire, and lead others. Persons with high cool are able to talk themselves out of bad situations and are better able to complete skills which require a certain amount of cool-ness.",
      "luck-input-div": "Luck<br>Represents a character's tendency to succeed or prosper through chance or good fortune. Lucky characters are more likely to land critical strikes and are less likely to break equipment during use. As in life, the complete extent of luck's influence remains a mystery, but it is also a certainty that its influence is pervasive."
   };

   $(document).ready( function()
   {
      $(".stat-value-input").val("5");
      $(".stats-points").val("5");
      $("#chargen-player-name").val("");
      $("#stat-age").val("18");
      $("#chargen-player-name").focus();

      $("#chargen-nav-next").click( function()
      {
         $("#chargen-biographics").hide();
         $("#chargen-physicals").show();
      });

      $("#chargen-nav-back").click( function()
      {
         $("#chargen-physicals").hide();
         $("#chargen-biographics").show();
         $("#chargen-player-name").focus();
      });

      $("#chargen-nav-cancel").click( function()
      {
         /*
         $("#client").show().animate({height:"75vh"});
         $("#left-window").animate({left:"0px"});
         $("#right-window").animate({right:"0px"});
         $("#bottom-window").animate({height:"20vh",padding:"10px"}, function(){$("#output").scrollTop( $("#output")[0].scrollHeight);});
         $("#bottom-show-hide").html("&#9660").css('top', '-0.5em');
         $("#left-show-hide").html( "&#9664;").css('right', '-0.5em' );
         $("#right-show-hide").html( "&#9654;").css('left', '-0.5em' );
         $("#chargen-wrapper").hide();
         */
         socket.emit("command", "cancel" );
      });

      $("#chargen-nav-submit").click( function()
      {
         let pcjson = {};
         pcjson.pcname = $("#chargen-player-name").val();
         pcjson.age = parseInt( $("#stat-age").val(), 10 );
         pcjson.gender = $("input[name=gender]:checked").val();
         pcjson.race = $("input[name=race]:checked").val();
         pcjson.brains = parseInt( $("#stat-brains").val(), 10 );
         pcjson.brawn = parseInt( $("#stat-brawn").val(), 10 );
         pcjson.senses = parseInt( $("#stat-senses").val(), 10 );
         pcjson.stamina = parseInt( $("#stat-stamina").val(), 10 );
         pcjson.coordination = parseInt( $("#stat-coordination").val(), 10 );
         pcjson.cool = parseInt( $("#stat-cool").val(), 10 );
         pcjson.luck = parseInt( $("#stat-luck").val(), 10 );
         pcjson.eyecolor = $("input[name=eyecolor]:checked").val();
         pcjson.eyeshape = $("input[name=eyeshape]:checked").val();
         pcjson.haircolor = $("input[name=haircolor]:checked").val();
         pcjson.hairstyle = $("input[name=hairstyle]:checked").val();
         pcjson.skincolor = $("input[name=skincolor]:checked").val();
         pcjson.build = $("input[name=build]:checked").val();
         pcjson.height = $("input[name=height]:checked").val();

         console.log( pcjson );
         socket.emit("command", "submit " + JSON.stringify( pcjson ) );
      });

      $(".stat-value-input, .age-value-input").click( function()
            {
               $(this).prev().focus();
            });

      $(".stat-button-minus, .age-button-minus, .name-input-field").focus( function()
      {
         $("#chargen-help-window").html( helps[$(this).parents("[id$=-input-div]").prop('id')] );
      });

      $("[class^=chargen-]").focus( function()
      {
         $("#chargen-help-window").html( helps[$(this).parents("[id$=-input-div]").prop('id')] );
      });

      $("[id$=-input-div]").hover( function()
      {
         $("#chargen-help-window").html( helps[$(this).prop('id')] );
      });

      $("#chargen-player-name").focus( function(){ $("#chargen-name-label").addClass('has-focus'); });
      $("#chargen-player-name").blur( function(){ $("#chargen-name-label").removeClass('has-focus'); });

      $("input:radio[name=race]").focus( function() {$("#chargen-race-label").addClass('has-focus'); });
      $("input:radio[name=race]").blur( function() {$("#chargen-race-label").removeClass('has-focus'); });

      $("input:radio[name=gender]").focus( function() {$("#chargen-gender-label").addClass('has-focus'); });
      $("input:radio[name=gender]").blur( function() {$("#chargen-gender-label").removeClass('has-focus'); });
      
      $(".chargen-age").focus( function() {$("#chargen-age-label").addClass('has-focus'); });
      $(".chargen-age").blur( function() {$("#chargen-age-label").removeClass('has-focus'); });

      $(".chargen-brains").focus( function() {$("#chargen-brains-label").addClass('has-focus2'); });
      $(".chargen-brains").blur( function() {$("#chargen-brains-label").removeClass('has-focus2'); });

      $(".chargen-brawn").focus( function() {$("#chargen-brawn-label").addClass('has-focus2'); });
      $(".chargen-brawn").blur( function() {$("#chargen-brawn-label").removeClass('has-focus2'); });

      $(".chargen-stamina").focus( function() {$("#chargen-stamina-label").addClass('has-focus2'); });
      $(".chargen-stamina").blur( function() {$("#chargen-stamina-label").removeClass('has-focus2'); });

      $(".chargen-senses").focus( function() {$("#chargen-senses-label").addClass('has-focus2'); });
      $(".chargen-senses").blur( function() {$("#chargen-senses-label").removeClass('has-focus2'); });

      $(".chargen-coordination").focus( function() {$("#chargen-coordination-label").addClass('has-focus2'); });
      $(".chargen-coordination").blur( function() {$("#chargen-coordination-label").removeClass('has-focus2'); });

      $(".chargen-cool").focus( function() {$("#chargen-cool-label").addClass('has-focus2'); });
      $(".chargen-cool").blur( function() {$("#chargen-cool-label").removeClass('has-focus2'); });

      $(".chargen-luck").focus( function() {$("#chargen-luck-label").addClass('has-focus2'); });
      $(".chargen-luck").blur( function() {$("#chargen-luck-label").removeClass('has-focus2'); });

      $("input:radio[name=eyecolor]").focus( function() {$("#chargen-eyecolor-label").addClass('has-focus'); });
      $("input:radio[name=eyecolor]").blur( function() {$("#chargen-eyecolor-label").removeClass('has-focus'); });
      
      $("input:radio[name=haircolor]").focus( function() {$("#chargen-haircolor-label").addClass('has-focus'); });
      $("input:radio[name=haircolor]").blur( function() {$("#chargen-haircolor-label").removeClass('has-focus'); });
      
      $("input:radio[name=hairstyle]").focus( function() {$("#chargen-hairstyle-label").addClass('has-focus'); });
      $("input:radio[name=hairstyle]").blur( function() {$("#chargen-hairstyle-label").removeClass('has-focus'); });
      
      $("input:radio[name=eyeshape]").focus( function() {$("#chargen-eyeshape-label").addClass('has-focus'); });
      $("input:radio[name=eyeshape]").blur( function() {$("#chargen-eyeshape-label").removeClass('has-focus'); });
      
      $("input:radio[name=skincolor]").focus( function() {$("#chargen-skincolor-label").addClass('has-focus'); });
      $("input:radio[name=skincolor]").blur( function() {$("#chargen-skincolor-label").removeClass('has-focus'); });
      
      $("input:radio[name=build]").focus( function() {$("#chargen-build-label").addClass('has-focus'); });
      $("input:radio[name=build]").blur( function() {$("#chargen-build-label").removeClass('has-focus'); });
      
      $("input:radio[name=height]").focus( function() {$("#chargen-height-label").addClass('has-focus'); });
      $("input:radio[name=height]").blur( function() {$("#chargen-height-label").removeClass('has-focus'); });
      
      $(".age-button-minus").click( function()
      {
         $("#stat-age").val( function( i, val )
         {
            val--;
            if( val < 18 )
               return 18;
            return val;
         });
      });

      $(".age-button-minus").keydown( function( val )
      {
         if( val.which == 37 || val.which == 40 )
         {
            $("#stat-age").val( function( i, val )
            {
               val--;
               if( val < 18 )
                  return 18;
               return val;
            });
         }
         else if( val.which == 38 || val.which == 39 )
         {
            $("#stat-age").val( function( i, val )
            {
               val++;
               if( val > 65 )
                  return 65;
               return val;
            });
         }
      });

      $(".stat-button-minus").keydown( function( val )
      {
         if( val.which == 37 || val.which == 40 ) //They've either pressed the left or down arrow key
         {
            $(this).next().val( function( i, val )
            {
               val--;
               if( val < 1 )
                  return 1;
               return val;
            });

            $(".stats-points").val( function( i, val )
            {
               var total = 0;
               $(".stat-value-input").each( function()
                     {
                        total += parseInt( $(this).val(), 10 );
                     });
               return 40 - total;
            });
         }
         else if( val.which == 38 || val.which == 39 ) //They've pressed either the up or right arrow key
         {
            $(this).next().val( function( i, val )
            {
               var total = 0;
               $(".stat-value-input").each( function()
                     {
                        total += parseInt($(this).val(), 10);
                     });
               if( total > 39 )
                  return val;
               val++;
               if( val > 10 )
                  return 10;
               return val;
            });

            $(".stats-points").val( function( i, val )
            {
               var total = 0;
               $(".stat-value-input").each( function()
                     {
                        total += parseInt( $(this).val(), 10 );
                     });
               return 40 - total;
            });
         }
         calc_base_stats();
      });

      $(".age-button-plus").click( function()
      {
         $("#stat-age").val( function( i, val )
         {
            val++;
            if( val > 65 )
               return 65;
            return val;
         });
      });

      $(".stat-button-minus").click( function()
      {
         $(this).next().val( function( i, val )
         {
            val--;
            if( val < 1 )
               return 1;
            return val;
         });

         $(".stats-points").val( function( i, val )
         {
            var total = 0;
            $(".stat-value-input").each( function()
                  {
                     total += parseInt( $(this).val(), 10 );
                  });
            return 40 - total;
         });
         calc_base_stats();
      });

      $(".stat-button-plus").click( function()
      {
         $(this).prev().val( function( i, val )
         {
            var total = 0;
            $(".stat-value-input").each( function()
                  {
                     total += parseInt($(this).val(), 10);
                  });
            if( total > 39 )
               return val;
            val++;
            if( val > 10 )
               return 10;
            return val;
         });

         $(".stats-points").val( function( i, val )
         {
            var total = 0;
            $(".stat-value-input").each( function()
                  {
                     total += parseInt( $(this).val(), 10 );
                  });
            return 40 - total;
         });
         calc_base_stats();
      });
   });

function calc_base_stats()
{
   let base_hp = 100 + (parseInt( $("#stat-stamina").val(), 10) *10);
   $("#chargen-base-health").html(base_hp);

   let base_crit = 3+(parseInt( $("#stat-luck").val(),10)/3 );
   $("#chargen-crit-chance").html(base_crit.toFixed(1) + '%');

   let carry_capacity = (parseInt( $("#stat-brawn").val(),10)/2)*100;
   $("#chargen-carry-capacity").html(carry_capacity + 'kgs');

   let heal_rate = (parseInt( $("#stat-stamina").val(),10)/2);
   $("#chargen-heal-rate").html( heal_rate );

   let exp_bonus = (parseInt( $("#stat-brains").val(),10)*2.5);
   $("#chargen-exp-bonus").html( exp_bonus + '%' );
}
