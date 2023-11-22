import React from 'react';
import axios from 'axios';



function SendGrid() {

    const sendEmail = async () => {
        try {
            const response = await axios.post('/api/sendgrid', {
                to: 'mtthw.jhnson@gmail.com',
                from: 'jadeintelliu@gmail.com',
                subject: 'Your Analysis Results',
                text: 'Please find attached your IntelliU AI document analysis.',
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div>
            <h1>SendGrid Email</h1>
            <button className="rounded-full" onClick={sendEmail}>Send Email</button>
        </div>
    );
}

export default SendGrid;
