const hoursInDay = 24;
const hourStart = 0;
const containerEl = $('.container');
var eventInfoCache = {};

var eventInfo = {
    timeStart: 0,
    content: "",

    save: function() {
        eventInfoCache[this.timeStart] = this.content;
        localStorage.setItem('eventInfo', JSON.stringify(eventInfoCache))
  },
  load: function() {
      eventInfoCache = JSON.parse(localStorage.getItem('eventInfo'))

      if (eventInfoCache != null) {
          for (const [key, value] of Object.entries(eventInfoCache)) {
              var thE1 = $(`th:contains('${key}')`)
              thE1.siblings('col-event').text(value)

          }
      } else {
          eventInfoCache = {}
      }
  }
}

var time = moment().format('dddd, mmmm do yyyyy, hh:mm:ss a');
$('#currentDay').text(time);

setInterval(function() {
    time = moment().format('dddd, mmmm do yyyyy, hh:mm:ss a');
    $('#currentDay').text(time);
}, 1000);

const tableE1 = $('<table>').addClass('table');
const tBodyE1 = $('<tbody>');