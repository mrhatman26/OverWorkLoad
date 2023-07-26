#This first config is for running the website and database SEPERATELY during development.
'''dbconfig = {
    'user': 'root',
    'password': 'OverWorkLoad',
    'host': 'localhost',
    'port': '1234',
    'database': 'workloadDB'
}'''

#This second config is for running BOTH the website and database in a Docker container using docker-compose.
'''dbconfig = {
    'user': 'root',
    'password': 'BoysenCompare',
    'host': 'db',
    'port': '3306',
    'database': 'compareDB'
}'''

dbconfig = {
    "user": "yashcscadmin",
    "password": "$csc2023",
    "host": "cscserversql.mysql.database.azure.com",
    "port": "3306",
    "database": "workloaddb",
    "ssl_ca": "Workload_Form\TableForm\DigiCertGlobalRootCA.crt.pem"
}
