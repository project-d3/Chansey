# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'AC876d912e07039205aebffdde776bb367'
auth_token = 'b12b22c6a0a4ee4bf5a03104890a45db'
client = Client(account_sid, auth_token)

def notify(message):
    message = client.messages \
                    .create(
                        body=message,
                        from_='+14088504309',
                        to='+14086180825'
                    )