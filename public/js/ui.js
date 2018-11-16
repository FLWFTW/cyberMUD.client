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

    });
