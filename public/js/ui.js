$(document).ready(
   function()
   {
      $("#save").button({
         "icon": "ui-icon-disk",
         "showLabel": false
      });

      $("#font-size").change(
            function()
            {
               $("#output").css("font-size", $("#font-size").val() ).scrollTop( $("#output")[0].scrollHeight );
            });
      $("#font-family").change(
            function()
            {
               $("#output").css("font-family", $("#font-family").val() ).scrollTop( $("#output")[0].scrollHeight );
            });

      $("#client-preferences-cancel").click(
            function()
            {
               $("#client-preferences").hide();
            });

      $("#client-preferences-save").click(
            function()
            {
               $("#client-preferences").hide();
               $(".color-text").css( "color", $("#client-default-color").val() );
               $(".color-obj").css( "color", $("#client-objects-color").val() );
               $(".color-mob").css( "color", $("#client-mobiles-color").val() );
               $(".color-").css( "color", $("#client-default-color").val() );
               $("#output").css( "background-color", $("#client-background-color").val() );
            });
      $("#client-preferences-button").click(
            function()
            {
               $("#client-preferences").show();
            });

    });
