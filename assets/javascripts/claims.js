/**
 * [claims description]
 * @param  {[type]} base_url [description]
 * @return {[type]}          [description]
 */
function claims(base_url) {
  this.create = create;
  this.read = read;
  this.update = update;
  this.disable = disable;
  this.fetch = fetch;
  this.validate = validate;
}

/**
 * [create description]
 * @return {[type]} [description]
 */
function create(base_url, formdata) {
  $.ajax({
    url: base_url + 'claims/create',
    type: "POST",
    data: formdata,
    success: function(data) {
      //code to execute
      console.log(data);
      alert(data)
    }
  });
}

/**
 * [read description]
 * @return {[type]} [description]
 */
function read() {

}

/**
 * [update description]
 * @return {[type]} [description]
 */
function update() {

}

/**
 * [disable description]
 * @return {[type]} [description]
 */
function disable() {

}

/**
 * [validate description]
 * @return {[type]} [description]
 */
function validate() {
  $('.ui.form')
    .form({
      memberNo: {
        identifier: 'memberNo',
        rules: [{
          type: 'empty',
          prompt: 'Please Select a Member'
        }]
      },
      providerCode: {
        identifier: 'providerCode',
        rules: [{
          type: 'empty',
          prompt: 'Please select a provider'
        }]
      },
      serviceCode: {
        identifier: 'serviceCode',
        rules: [{
          type: 'empty',
          prompt: 'Please select a service'
        }]
      },
      benefitCode: {
        identifier: 'benefitCode',
        rules: [{
          type: 'empty',
          prompt: 'Please Select benefit'
        }]
      },
      serviceAmt: {
        identifier: 'serviceAmt',
        rules: [{
          type: 'empty',
          prompt: 'Please enter Amount'
        }]
      },
      serviceDate: {
        identifier: 'serviceDate',
        rules: [{
          type: 'empty',
          prompt: 'Please enter Date'
        }]
      }


    });
}

/**
 * Fetch Pre-requisite information for form
 * @return {[type]} [description]
 */
function fetch() {
  //populate dropdown on load
  var members_drop_down = '';
  var get_members = base_url + "members/getAll/";
  //alert (get_members)
  $.getJSON(get_members, function(json) {
    $("#memberN").html(
      '<div class="item" data-value="1">Add Member</div>');
    $.each(json, function(key, val) {
      members_drop_down += "<div class='item' data-value='" + json[
          key]["memberNo"] + "'>" + json[key]["memberName"] +
        "</div>";

    });
    //alert(drop_down);
    $("#memberN").html(members_drop_down);
  });

  var provider_drop_down = '';
  var get_provider = base_url + "provider/getAll/";
  $.getJSON(get_provider, function(json) {
    $("#providerN").html(
      '<div class="item" data-value="1">Add Provider</div>');
    $.each(json, function(key, val) {
      provider_drop_down += "<div class='item' data-value='" + json[
          key]["providerCode"] + "'>" + json[key]["providerName"] +
        "</div>";

    });
    $("#providerN").html(provider_drop_down);
  });

  var service_drop_down = '';
  var get_service = base_url + "services/getAll/";
  $.getJSON(get_service, function(json) {
    $("#serviceC").html(
      '<div class="item" data-value="1">Add Service</div>');
    $.each(json, function(key, val) {
      service_drop_down += "<div class='item' data-value='" + json[
        key]["id"] + "'>" + json[key]["service"] + "</div>";

    });
    $("#serviceC").html(service_drop_down);
  });

  var benefits_drop_down = '';
  var get_benefit = base_url + "benefits/getAll/";
  $.getJSON(get_benefit, function(json) {
    $("#benefitC").html(
      '<div class="item" data-value="1">Add benefit</div>');
    $.each(json, function(key, val) {
      benefits_drop_down += "<div class='item' data-value='" + json[
        key]["id"] + "'>" + json[key]["benefit"] + "</div>";

    });
    $("#benefitC").html(benefits_drop_down);
  });

  //Prepare Form
  $('.ui.selection.dropdown').dropdown();
  $("#serviceDate").datepicker();
}
