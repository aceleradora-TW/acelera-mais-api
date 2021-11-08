const { GoogleSpreadsheet } = require('google-spreadsheet')
const { URL } = require('url')

const link = new URL('https://docs.google.com/spreadsheets/d/1FxkDqFIfCAwvwrwmR-BMCuV_uO_YQv1H8U7QHA-FJk4/edit#gid=0')
const idLink = link.pathname.split('/')[3]

const urlTable = new GoogleSpreadsheet(idLink).spreadsheetId

console.log(urlTable)
