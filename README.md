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
