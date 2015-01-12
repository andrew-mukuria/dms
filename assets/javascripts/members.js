/**
 * [members description]
 * @param  {[type]} base_url [description]
 * @return {[type]}          [description]
 */
function members(base_url) {
    this.create = create;
    this.read = read;
    this.update = update;
    this.disable = disable;
    this.validate = validate;

    // Initialize Datepicker
    $("#dob").datepicker({
        changeMonth: true,
        changeYear: true
    });

}

/**
 * [create description]
 * @return {[type]} [description]
 */
function create(base_url, formdata) {
    $.ajax({
        url: base_url + 'members/create',
        type: "POST",
        data: formdata,
        success: function(data) {
            //code to execute
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
                prompt: 'Please enter a Member Number'
            }]
        },
        memberName: {
            identifier: 'memberName',
            rules: [{
                type: 'empty',
                prompt: 'Please enter A member name'
            }]
        },
        dob: {
            identifier: 'dob',
            rules: [{
                type: 'empty',
                prompt: 'Please enter A date of birth'
            }]
        },
        idNo: {
            identifier: 'idNo',
            rules: [{
                type: 'empty',
                prompt: 'Please enter an id No'
            }]
        },
        schemeName: {
            identifier: 'schemeName',
            rules: [{
                type: 'empty',
                prompt: 'Please enter Scheme Name'
            }]
        },
        employeeNo: {
            identifier: 'employeeNo',
            rules: [{
                type: 'empty',
                prompt: 'Please enter Employee Name'
            }]
        },
        nssfNo: {
            identifier: 'nssfNo',
            rules: [{
                type: 'empty',
                prompt: 'Please enter NSSF No'
            }]
        },
        nhifNo: {
            identifier: 'nhifNo',
            rules: [{
                type: 'empty',
                prompt: 'Please enter NHIF No'
            }]
        },
        pin: {
            identifier: 'pin',
            rules: [{
                type: 'empty',
                prompt: 'Please enter Pin'
            }]
        },
        inPatient: {
            identifier: 'inPatient',
            rules: [{
                type: 'empty',
                prompt: 'Please Enter Field'
            }]
        },
        outPatient: {
            identifier: 'outPatient',
            rules: [{
                type: 'empty',
                prompt: 'Please Enter Field'
            }]
        },
        dental: {
            identifier: 'dental',
            rules: [{
                type: 'empty',
                prompt: 'Please Enter Field'
            }]
        },
        optical: {
            identifier: 'optical',
            rules: [{
                type: 'empty',
                prompt: 'Please Enter Field'
            }]
        },
        maternity: {
            identifier: 'maternity',
            rules: [{
                type: 'empty',
                prompt: 'Please Enter Field'
            }]
        },
    });
}



