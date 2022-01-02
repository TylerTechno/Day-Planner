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

for (hour = 0 + hourStart; hour < hoursInDay + hourStart; hour++) {
    var cellHour = moment().subtract(moment().format('hh') - hour, 'h')
    var tRowE1 = $('<tr>').addClass('time-block');
    var tHeadEl = $('<th>').attr('scope', 'row').addClass('hour align-middle').text(cellHour.format('hh:00 A'));
    var tRowEventEl = $('<td>').addClass('col-event text-break text-wrap text-left data-editable').attr('contenteditable', true);
    var tRowLockEl = $('<td>').addClass('col-lock align-middle saveBtn').text('💾');

    if (moment(cellHour).isBefore(moment(), 'h')) {
        tRowEventEl.addClass('past');

    } else if (moment(cellHour).isSame(moment(),'h')) {
        tHeadEl.addClass('past');
        tRowEventEl.addClass('present');
    }
    else if (moment(cellHour).isAfter(moment(), 'h')) {
        tRowEventEl.addClass('future')
    }
    tRowE1.append(tHeadEl);
    tRowE1.append(tRowEventEl);
    tRowE1.append(tRowLockEl);
    tBodyE1.append(tRowE1);


}

tableE1.append(tBodyE1);
containerEl.append(tableE1);

$('table').on('click', 'saveBtn',function(event) {
    eventInfo.timeStart = $(event.target).siblings('.hour').text();
    eventInfo.content = $(event.target).siblings('.col-event').text();
    eventInfo.save();
})

eventInfo.load();