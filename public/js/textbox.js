//Javascript for showing TextBox if users select other option

        function changeFunc() {
        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if (selectedValue=="others"){
        $('#textboxes').show();
        }
        else {
        $('#textboxes').hide();
        }
    }