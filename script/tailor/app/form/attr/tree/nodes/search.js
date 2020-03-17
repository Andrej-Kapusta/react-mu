import React from "react"
import SimpleEdit from 'tailor/form/attr/simple/edit'

export default (props) => {
  
  return (
    <div>
      <SimpleEdit urlContext={[...props.urlContext, "searchValue"]} value={props.searchValue} label="Filter..." info={{hideLabel: true}} />
    </div>
  )
}

/*
    <input type="hidden" name={[...props.urlContext, "displayFlag"]}>

out/paramRow{
  loc = in/paramRow;
  /pathChecked = in/paramRow/searchType/path ? "checked=\"true\"" : "";
  /pathActive = in/paramRow/searchType/path ? "active" : "";
  /stringChecked = in/paramRow/searchType/string ? "checked=\"true\"" : "";
  /stringActive = in/paramRow/searchType/string ? "active" : "";
  /displayStyle = in/tailorTree/info/display == true ? "block" : "none";
  /displayFlagValue = in/tailorTree/info/display == true ? "1" : "0";
}

<div class="bx_row row form-group bx_tree_search" style="display:%%displayStyle%%;">
  <input type="hidden" name="%%urlContext%%/displayFlag" class="bx_tree_search_displayFlag" value = "%%displayFlagValue%%" >
  
  <div class="bx_value_wrapper col-sm-12">
    <div class="input-group input-group-sm">
      <input type="text" class="bx_tree_search_input form-control input-sm" onload="$(this).focus();" name="%%urlContext%%/searchValue" value="%%searchValue%%" placeholder="Filter..." 
      onkeypress="return blox.submitAjaxOnEnter(event, '_event/refresh');" />
      <span class="input-group-addon" onclick="$(this).prev().val('');blox.doAjax(this,'_event/refresh');return false;"><span class="bx_icon bx_delete"></span></span>
    </div>
	</div>
	<script>
    var displaySearch = '%%displayFlagValue%%';
    if (displaySearch == '1'){
      var search_input = document.querySelectorAll('input[name=\'%%urlContext%%/searchValue\']')[0];
      if (search_input !== null){
        search_input.focus();
        var strLength = search_input.value.length +1;
        search_input.setSelectionRange(strLength,strLength);
      }
    }
  </script>
</div>

*/