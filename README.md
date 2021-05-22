# konnex-aerothon

## Requirements
- Python3
- pip
- node.js >= v15

## Steps to run
- Install all the required softwares/frameworks as mentioned above.
- `git clone https://github.com/manas99/konnex-aerothon.git`
- In terminal, navigate to the cloned folder: `konnex-aerothon`
- follow steps below to setup python environment:
```bash
pip3 install virtualenv
virtualenv venv
source venv/bin/activate # In windows use: `venv\Scripts\activate`
pip3 install -r requirements.txt
npm install
```
- follow steps below to setup angular project:
```bash
cd admin-frontend
npm install # In windows use: `venv\Scripts\activate`
```

#### Everytime you run:
```bash
cd konnex-aerothon
source venv/bin/activate
```

#### To run:
- backend:
    - `cd backend`
    - `python3 manage.py runserver 0.0.0.0:8000`
- client-frontend:
    - `cd client-frontend`
    - `http-server`
- admin-frontend:
    - `cd admin-frontend`
    - `ng serve`

## COLLABORATORS
* [Manas Oswal](https://github.com/manas99)
* [Anshuman Singh Sisodia](https://github.com/graypacket)
* [Amrita Nayak](https://github.com/AmritaNayak1212)
* [Shaik Yasmeen](https://github.com/shaikyasmeen-mldl)
* [Sakilam Ravi Teja](https://github.com/RavitejaSakilam)
