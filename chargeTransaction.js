// This Sample app is using VT-web

const config = {
    serverKey: 'your-server-key',
    clientKey: 'your-client-key',
    url: 'https://api.sandbox.veritrans.co.id/v2'
};

const Veritrans = require('veritrans');
const vt = new Veritrans(config);


route.post('/pay', (req, res, next) => {
    const transaction = {
        payment_type: 'vtweb',
        transaction_details: {
            order_id: 'A17550',
            gross_amount: '145000',
        },
        vtweb: {
            credit_card_3d_secure: 'true'
        },
    };

    vt.transaction.charge(transaction, (err, result) => {
        if (err) {
            console.error(err);

            //return res.redirect('/pay/error');
        }

        //return res.redirect('/pay/success')
    });
});
