npx sequelize-cli model:create --name User --attributes email:string,password:string

npx sequelize-cli model:create --name Category --attributes name:string

npx sequelize-cli model:create --name Profile --attributes fullname:string,address:string,balance:integer,UserId:integer

npx sequelize-cli model:create --name Product --attributes name:string,price:integer,description:string,CategoryId:integer

npx sequelize-cli model:create --name Bid --attributes date_event:date,name_event:string,UserId:integer,ProfileId:integer
