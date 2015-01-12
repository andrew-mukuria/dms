function runApp(base_url) {

  var filter;
  filter = '';
  var array_size;
  var index;
  index = 0;
  var resultSet;
  toggle_search(filter);



  $('.ui.dropdown#filter').dropdown({
    onChange: function(text, value) {
      filter = $(this).dropdown('get text');
      toggle_search(filter);
      $('input[type="search"]').attr('data-criteria', filter);
      value = $('input[type="search"]').val();
      if (value != '') {
        search(base_url, ctrl + '/read', value);
        index = 0;
      }
    }
  });

  // Load Form
  $('#main.menu > a').click(function() {
    $('#main.menu a').removeClass('active');
    $(this).addClass('active');
    $('.sub.menu a').removeClass('active');
    ctrl = $(this).attr('data-ctrl');
    $('#view-content').load(base_url + ctrl + '/' + 'info', function() {
      $('form :input').attr('readonly', 'readonly');
      $('.sub.menu a.view').addClass('active');
      // $('form').append('<div class="ui error message"></div>');
    });

    $('input[type="search"]').attr('data-target', ctrl);
    set_total();

    $('input[type="search"]').keyup(function() {
      value = $(this).val();
      search(base_url, ctrl + '/read', value);
      index = 0;
    });

    get_criteria(base_url, ctrl);
    reset_total();
    reset_found();
    $('.ui.dropdown').dropdown();

  });

  $('.sub.menu a').click(function() {
    $('.sub.menu a').removeClass('active');
    $(this).addClass('active');
  });


  $('#register').click(function() {
    $('form button').remove();
    $('form :input').removeAttr('readonly');
    $('form').append(
      '<button class="ui mini button register"><i class="icon"></i>Register</button>'
    );
    $('form :input').val('');
  });

  $('#view').click(function() {
    $('form button').remove();
    $('form :input').attr('readonly', 'readonly');
    $('form :input').val('');
  });
  $('#previous').addClass('disabled');
  $('#next').addClass('disabled');
  $('#previous').click(function() {
    //Bug on Condition
    if (1 <= index || index <= array_size - 1) {
      index = index - 1;
      previous(resultSet, index, array_size);
      $('#next').removeClass('disabled');
    } else {
      $('#previous').addClass('disabled');
    }
  });

  $('#next').click(function() {
    //console.log('Size is  '+array_size);
    //Bug on Condition
    if (1 <= index || index <= array_size - 1) {
      index = index + 1;
      next(resultSet, index, array_size);
      $('#previous').removeClass('disabled');
    } else {
      $('#next').addClass('disabled');
    }
  });

  /**
   * [set_total description]
   */
  function set_total() {
      $('#total>.value').load(base_url + ctrl + '/' + 'count');
    }
    /**
     * [set_found description]
     * @param {[type]} value [description]
     */
  function set_found(value) {
      $('#found>.value').html(value);
    }
    /**
     * [reset_count description]
     */
  function reset_total() {
      $('#total>.value').html('0');
    }
    /**
     * [reset_count description]
     */
  function reset_found() {
      $('#found>.value').html('0');
    }
    /**
     * [get_criteria description]
     * @return {[type]} [description]
     */
  function get_criteria(base_url, ctrl) {
      items = '';
      $.ajax({
        url: base_url + ctrl + '/getCriteria',
        beforeSend: function(xhr) {
          $('#filter').dropdown('restore defaults');
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        },
        success: function(data) {
          //alert(value);
          var obj = $.parseJSON(data);
          $.each(obj, function(k, v) {
            items += '<div class="item" data-value="' + v.text +
              '"><i class="icon ' + v.icon + '"></i>' + v.text +
              '</div>';
          });

          $('#filter').find('.menu').html(items);

        },
        error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status == 404 || errorThrown == 'Not Found') {
            $('#filter').dropdown('restore defaults');
            $('#filter').find('.menu').html(
              '<div class="item"><i class="icon ion-alert"></i>No Criteria Defined</div>'
            );
          }
        }
      });
    }
    /**
     * [toggle_search description]
     * @return {[type]} [description]
     */
  function toggle_search(filter) {
    if (filter == '') {
      $('#search').attr('disabled', 'disbaled');
    } else {
      $('#search').removeAttr('disabled');
    }
  }

  /**
   * [search description]
   * @param  {[type]} base_url     [description]
   * @param  {[type]} function_url [description]
   * @return {[type]}              [description]
   */
  function search(base_url, function_url, value) {
      reset_found();
      value = encodeURIComponent(value);
      //initialize_typeahead(value);
      getData(value, base_url, function_url);

    }
    /**
     * [getData description]
     * @param {[type]} value        [description]
     * @param {[type]} base_url     [description]
     * @param {[type]} function_url [description]
     */
  function getData(value, base_url, function_url) {
      criteria = $('#search').attr('data-criteria');
      //value = encodeURIComponent(value);
      $.ajax({
        url: base_url + function_url + '/' + criteria + '/' + value,
        beforeSend: function(xhr) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        },
        success: function(data) {
          resultSet = $.parseJSON(data);
          if (value == ' ' || (resultSet.data == null) || (resultSet.data ==
              'Id Parameter Missing!')) {
            $('form input').val(' ');
          } else {
            array_size = parseInt(resultSet.data.length);
            set_found(array_size);
            populate_form(resultSet, index, array_size);
            if (array_size > 1) {
              $('#next').removeClass('disabled');
            }
          }

        }
      });
    }
    /**
     * [populate_form description]
     * @param  {[type]} array      [description]
     * @param  {[type]} index      [description]
     * @param  {[type]} array_size [description]
     * @return {[type]}            [description]
     */
  function populate_form(array, index, array_size) {
    if (index < array_size && index >= 0) {
      $.each(array.data[index], function(k, v) {
        $('input[name="' + k + '"]').val(v);
      });
    }

  }

  /**
   * [next description]
   * @param  {[type]}   resultSet  [description]
   * @param  {[type]}   index      [description]
   * @param  {[type]}   array_size [description]
   * @return {Function}            [description]
   */
  function next(resultSet, index, array_size) {
      populate_form(resultSet, index, array_size);
    }
    /**
     * [previous description]
     * @param  {[type]} resultSet  [description]
     * @param  {[type]} index      [description]
     * @param  {[type]} array_size [description]
     * @return {[type]}            [description]
     */
  function previous(resultSet, index, array_size) {
      populate_form(resultSet, index, array_size);
    }
    /**
     * [initialize_typeahead description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
  function initialize_typeahead(value) {
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({
              value: str
            });
          }
        });
        cb(matches);
      };
    };

    $('#search.typeahead').typeahead({
      highlight: true
    }, {
      name: 'code',
      displayKey: 'value',
      source: substringMatcher(value),
      templates: {
        header: '<h5 class="query-title">Code</h5>'
      }
    }, {
      name: 'name',
      displayKey: 'value',
      source: substringMatcher(value),
      templates: {
        header: '<h5 class="query-title">Name</h5>'
      }
    }).on('typeahead:selected', onSelected);


    function onSelected($e, datum) {
      $.each(datum, function(k, v) {
        alert(v);
      });
    }
  }
}
