/**
 * [services description]
 * @param  {[type]} base_url [description]
 * @return {[type]}          [description]
 */
function services(base_url) {
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
    url: base_url + 'services/create',
    type: "POST",
    data: formdata,
    success: function(data) {
      //code to execute
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
      code: {
        identifier: 'code',
        rules: [{
          type: 'empty',
          prompt: 'Please enter code'
        }]
      },
      service: {
        identifier: 'service',
        rules: [{
          type: 'empty',
          prompt: 'Please enter service'
        }]
      }
    });
}
