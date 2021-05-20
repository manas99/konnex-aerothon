### Before going live for the first time:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
# create oauth2 keys - check below
```


### Before going live everytime:
- Check if you need to create and run the migration files or not (like for development purposes). In production, always run the migration commands.


#### To create oauth2 keys:
- Go to your django admin console and login with your superuser account
- After successful login navigate to {BASE_URL}/oauth2/applications/ and click on `Click Here` to register a new application.
- Enter the following values:
```
Name: api  # anything that describes your application
Client Type: Confidential
Authorization grant type: Resource owner password-based
Algorithm: No OIDC support
```
- **Important:** Make note of or copy the Client id and Client secret somewhere.
- Create an `.env` file in the backend directory with the following content and insert the above copied values in required places.
```
DJANGO_SECRET_KEY="#rq9)-52kcz@yiyxcg+ajprlhu9ujz&nw5mz73ny_ci@zoz=^k"
DJANGO_DEBUG=True

DJANGO_BASE_URL="http://0.0.0.0:8000"
DJANGO_OAUTH2_CLIENT_ID={COPIED CLIENT ID}
DJANGO_OAUTH2_CLIENT_SECRET="{COPIED CLIENT SECRET}"

DJANGO_TIMEZONE="Asia/Kolkata"
```
- Re run the server

### Note:
- Whenever database is deleted and created again, it is essential to create an oauth2 application and put its keys in the `.env` file.
- Use `python3 runserver 0.0.0.0:8000` to make it accessible over the network. For development, it is important that the server is run using this command.
- Generate a new secret key when new installation is taking place. You can use: https://djecrety.ir
