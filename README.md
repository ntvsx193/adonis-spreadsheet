# Adonis Spread Sheet

This is repo is a AdonisJs provider for simplicity work with sheets docs.
It's base on powerful [SheetJS](https://github.com/SheetJS/js-xlsx)

[![npm version](https://badge.fury.io/js/adonis-spreadsheet.svg)](https://badge.fury.io/js/adonis-spreadsheet)
[![Build Status](https://travis-ci.org/ntvsx193/adonis-spreadsheet.svg?branch=master)](https://travis-ci.org/ntvsx193/adonis-spreadsheet)
[![Coverage Status](https://coveralls.io/repos/github/ntvsx193/adonis-spreadsheet/badge.svg?branch=master)](https://coveralls.io/github/ntvsx193/adonis-spreadsheet?branch=master)

## Install

```
npm i --save adonis-spreadsheet
```

## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonis-spreadsheet/providers/SpreadSheetProvider'
]
```

That's all! Now you can use the mail provider as follows.

## Getting started

```js
const Route = use('Route')
const SpreadSheet = use('SpreadSheet')
const User = use('App/Models/User')

Route.get('/users/export/:format', async ({ request, response, params }) => {
  const ss = new SpreadSheet(request, params.format)
  
  const users = await User.all()
  const data = []
  
  data.push([
    'id',
    'First Name',
    'Last Name',
    'Email',
    'Phone'
  ])

  users.toJSON().forEach((user) => {
    data.push([
      user.id,
      user.first_name,
      user.last_name,
      user.phone
    ])
  })

  ss.addSheet('Users', data)
  ss.download('users-export')
})
```

Then you can fire url `/rest/users/export/csv` and received csv file sheet. 

## Supported formats

- xls
- xlsx
- csv
- ods
