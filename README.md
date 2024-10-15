[X] `node js`
[X] `pug`

## pub is used for to create html element more dynamically

1. npm i ---save pug
2. create folder and file
3. insert pug into main folder
   app.set('folderName', path.join(\_\_dirname), "folderName")
   define pug
   app.set('foldername engine', foldername)

## How to display HTML Content Using pug Engine

app.get('/path', (req,res={
res.render(fileName);
})

# Dbs - go to the file path of mongosh then run the mongosh

1. connect to database
2. type show db to see default db's in mongodb type show dbs
   use nodedemo which is create a db and switched to that db
3. create collection using db.creactCollection('Article')
4. show collections to the the Article
5. insert collection using db.article,insert({"title": "Article", "author": "brad", "body": "first article" })
6. use find() function to see the result db.article.find()

## connect database Using ## MONGOOSE Library

1. npm i mongoose
2. require moogose
3. create connection
   Mongoose.connect('Mongodb://localhost/urlPath')
4. Connection Store in a Variable
   const db = mongoose.connection
5. create a schema connection to identify whether its string || boolean
   require(mongoose)
   const StudentSchema = mongoose.schema({
   name:{
   type: string,
   require: true
   },
   age:{
   type : integer,
   require:true
   }
   })
6. Export schema
   const students = module.export = mongoose.model('variable', StudentSchema)
7. import models To display dynamic data's
   app.get('/', (req, res) => {
   add_student
   .find({})
   .then((students) => {
   res.render('app', { students: students, title: 'Students List' });
   })
   .catch((err) => {
   console.error(err);
   });
   });

## MAKE A FORM ELEMENT FOR TO INSERT DATA FROM BY A CLICKING A BUTTON AND REDIRECT TO '/PAGE'

1.  CREATE A URL PUG FILE WITH POST METHOD
    extends layouts

    block content
    h1 #{title}
    form(method= 'POST', action='/add_student')
    #form-group
    label name:
    input.form-control(name="name", type='text')

            #form-group
            label age:
            input.form-control(name="age", type='text')
             input.btn.btn-primary(type='submit', value='submit')

2.  SYNTAX LOOKS LIKE THIS
    const instance = new students(req.body);
    instance
    .save()
    .then(() => {
    res.redirect('/'); // Redirect to the success page
    })
    .catch((error) => {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
    });
    });
