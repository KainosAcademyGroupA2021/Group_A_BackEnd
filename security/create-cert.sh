#!/bin/bash


#https://stackoverflow.com/a/49784278

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256