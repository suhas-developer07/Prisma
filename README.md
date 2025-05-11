## Install prisma 
     npm install prisma --save-dev
## initialize prisma 
     npx prisma init --datasource-provider postgres --output ../generated/prisma
## for generating prisma 
     npx prisma generate
## for migrating prisma 
     npx prisma migrate dev --name init 
 ## for visulize the database 
      npx prisma studio 
## postgres url 
     postgresql://username:password@localhost:5432/databasename?schema=public
        # Prisma

## for visulaize through terminal
      docker ps
      docker exec -it containername bash
      psql -U username -d your_database_name

## commands for psql
\dt         -- list all tables
 \l          -- list all databases
\c mydb     -- connect to a specific database
SELECT * FROM "User";  -- view data from a table (case-sensitive)



