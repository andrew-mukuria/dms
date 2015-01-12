/**
 * [members description]
 * @param  {[type]} base_url [description]
 * @return {[type]}          [description]
 */
function providers(base_url) {
  this.create = create;
  this.read = read;
  this.update = update;
  this.disable = disable;
  this.validate = validate;
}

/**
 * [create description]
 * @return {[type]} [description]
 */
function create(base_url, formdata) {
  $.ajax({
    url: base_url + 'provider/create',
    type: "POST",
    data: formdata,
    success: function(data) {
      //code to execute
      console.log(data);
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
      providerCode: {
        identifier: 'providerCode',
        rules: [{
          type: 'empty',
          prompt: 'Please enter provider code'
        }]
      },
      providerName: {
        identifier: 'providerName',
        rules: [{
          type: 'empty',
          prompt: 'Please enter provider name'
        }]
      },
      telephoneNo: {
        identifier: 'telephoneNo',
        rules: [{
          type: 'empty',
          prompt: 'Please enter phone No'
        }]
      },
      emailAddress: {
        identifier: 'emailAddress',
        rules: [{
          type: 'email',
          prompt: 'Please enter email'
        }]
      },
      subLocation: {
        identifier: 'subLocation',
        rules: [{
          type: 'empty',
          prompt: 'Please enter sublocation'
        }]
      },
      location: {
        identifier: 'location',
        rules: [{
          type: 'empty',
          prompt: 'Please enter location'
        }]
      },
      constituency: {
        identifier: 'constituency',
        rules: [{
          type: 'empty',
          prompt: 'Please enter constituency'
        }]
      },
      town: {
        identifier: 'town',
        rules: [{
          type: 'empty',
          prompt: 'Please enter Town'
        }]
      },
      county: {
        identifier: 'county',
        rules: [{
          type: 'empty',
          prompt: 'Please enter county'
        }]
      }
    });
}
