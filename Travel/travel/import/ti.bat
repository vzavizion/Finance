cd C:\Program Files\MongoDB\Server\4.0\bin

rem db.getCollection('country').remove( { } )
rem db.getCollection('group').remove( { } )

mongoimport --db travel --collection country --file C:\Users\vz73953\Finance\Travel\travel\import\country.json
mongoimport --db travel --collection group --file C:\Users\vz73953\Finance\Travel\travel\import\group.json

rem mongoimport --db travel --collection country --file C:\Users\vasile\Finance\Travel\travel\import\country.json
rem mongoimport --db travel --collection group --file C:\Users\vasile\Finance\Travel\travel\import\group.json

pause