const nodemailer = require('nodemailer');
const dkim = require('nodemailer-dkim');
const fs = require('fs');
const DKIM = require('nodemailer/lib/dkim');

dkim
// create a transport object
let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    // port: 465,
    secure: true,
    tls:{

    },
    dkim: {
      domainName: 'floidenergy.tech',
      keySelector: 'default',
      privateKey: `-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAuybrn5Fr+KnTRoIe4sRmyw2aV5Fl9d3EBTcyiq2zZAMI5vvWHH5Xi69FiCR4tUfJNJwA4coi00zAlo+IdG1d4Aa9sF8AD6xDIiO3yQTtg8qjBIKi1FSHSE8EEB06CA63fPjKXeuC+G77sUWrJJbZPVNQs89s2dB2vVka3jChRE4cZ4bu1yNcd8ux84SqDmsKO33B8LQtD+hTuPzr0c3I30HoxlyJVnqW0B0wLtKyTJdTFa/H+crbI+1lEhYt/wP1Rpout8usZJjoMtf5KDL5uFhzaYVgq/s5WL15P3pT8f4+SFL1M2wkaIImRW+2+c4AxAbiNdGFM+eXlbMk9geheQIDAQABAoIBAAJfgPdaAbN6e8pWFgwsD12dw4o+trtCX5ztUT++6hpni3JaWSGtXHDR/SC3zawGx/9Zxw0V4hEp1PtTwJgxVtJjY35cBgUs2wEQ0ODEpjpYlG6XNXdZxwlcryGBLV4yyZLVGMPOG7AIwDpENuJU41ZKuyg8hhXQ9eB6w8NzfGgAS/y6VfD66yUBqj3Ohe48xQm48FFDQFLq+bBXoN5HIhIu3kE7etS/JE0foSNaYDSuNH7vRoEHQXQMBPmIbyzq60nYPoiLKUqiLtX/QFgVUruQLZgiN9kv/jRDR30tQRFVuNGbQVaIan1Lmlodpv3CqFOWOV93EUOGJMOGcNRiQ3ECgYEA7Dn1Ko+0FzayadrFCkYUcqV7tCpfXOprIcqAj1EyNj/8awxmQwf2oebE6r/qJqoWsqbYZfvtanWWHAd/XyUy0zM+TdZFGCNzRFuwjeYygXxW7jaX03eliZs0hrZTMa56LsxThQgOM4U5X6/wpHLAIb1oBikAm6MbJyfPL7bNndUCgYEAytFb9SnnYGMLV6mcRyJihZEWEMsVyaABeZzAYNgY2MNVYB8WmgerX7o7inHUqERqsy6G1+LUW6O4oFxoYWFV2DafOkjSGvDnkyZMluZNO+OelW4iPF341skXqCb1xL1D76cakJTM1izh/dBVwk3c3MtNiyAWnjdVvxZWcq63cxUCgYEAt8U+3SV+TLDYi1EOCLgMIERsv/RWy8nyHg+Tg+r+zQVqMT0sMOl5DOqiNp2mYv3fOoxhvLUINdHUPWn3xOUDbRpoVdVjWyv4+Cz8ZOe4UtOQLTF7W5+wwCRl8IbWocfCdbWvI8bohVwXDkGpS8WZgqX+zwwG1Q1GimeF3vCvdSECgYEAkAiqc6t0o+Dy1yie0W275fspXne7W1sEcSc/AAe3bYkbAo5RcMXtkKgjTKiWS4F6/REXtg1inkng/hFiF3YWjtwLrEq222cmLjxOvAOF6fg2UQzLx289HtvkrwgsFbILoxBbLz5dUeTCAYyIutqs9Sh0Q09ggK/vdysX7Y3ivhkCgYB1u5BSCxJ190OJmarjwFQGNbo0AfP5u42sjMDQdkkfyBW8TR/2tbl+9vwSr5mOLRSiMDdYLQlTsN8V6Zij58bt9Mu8bGQkaNUEwbSq2hac2G2jhXfQ+5hjodyg3ctfawLbQS/oyP7DlWdZbHR7oUUvY9I1fPuxPg0szsNuxRFaMg==-----END RSA PRIVATE KEY-----`
    }
});

// configure DKIM options
// let dkimOptions = {
//     domainName: 'floidenergy.tech',
//     keySelector: 'default', // the name of your DKIM key record
//     privateKey: fs.readFileSync("./keys/floidenergy.tech.private")
// };

// add the DKIM plugin to the transport object
// transport.use('stream', dkim.DKIMSigner(dkimOptions));

// send an email
transport.sendMail({
    from: 'contact@floidenergy.tech',
    to: 'manipulatorrika@gmail.com',
    subject: 'Test email with DKIM signature',
    text: 'This is a test email sent with DKIM signature.',
}, (err, info) => {
    if (err) {
        console.error(err);
    } else {
        console.log(info);
    }
});