Pour generer la bdd les differentes possibilites:

mysql -u matcha -p matcha < matcha.sql

UNIX
shell> mysql matcha < matcha.sql

The same in Windows command prompt:
mysql -p -u matcha matcha < matcha.sql

PowerShell
C:\> cmd.exe /c "mysql -u root -p matcha < matcha.sql"

MySQL command line
mysql> use matcha;
mysql> source matcha.sql;