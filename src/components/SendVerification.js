const sendVerificationCode = async (mobileNumber, code) => {
    try {
        // Replace this URL with your backend API endpoint for sending SMS
        const response = await fetch('https://your-api-endpoint.com/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobileNumber, code }),
        });

        if (!response.ok) {
            throw new Error('Failed to send verification code');
        }

        console.log(`Verification code ${code} sent to ${mobileNumber}`);
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error;
    }
};
