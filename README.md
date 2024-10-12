# Shopping Cart App

**Contributors**

[Alexandra Straton](https://github.com/AlexStraton)

[Mike Williams](https://github.com/ValkarVarg)

##[App video demo] (https://youtu.be/f2mnA_EE71k)

This is a mobile app replicating the functionality of a shopping website, which allows users to add products to a cart, view the cart and update the quantity of contents, as well as the ability to add new products to the site. You can also checkout as if you were purchasing the contents of the cart and confirm the total of the products in the cart for purchase.

**Tech Stack**
- React Native
- PSQL
- Typescript
- Render
- Supabase

**Setup**

You will need to have node, psql and expo installed to run this

 - Clone the github repository to your local device:
 ```git clone https://github.com/AlexStraton/shopping_cart_app.git```
 - Install packages on both front and back-end:
	 ```cd back-end```
	 ```npm i```
	 ``` cd .. ```
	 ```cd shopping_cart```
	 ```npm i```
- Setup a .env.development file:
	create a file called .env.development in the back-end folder
	paste in ```PGDATABASE=shopping_cart```
- Create and seed the database:
	from the back-end folder run:
	```npm run setup-dbs```
	``` npm run seed```
- Run the database locally:
```npm run start```
-Run the application:
Navigate to the shopping_cart folder
```npm run start```
Use Expo Go and follow the prompts to run the application (recommended via emulator or Expo Go on your personal device)

**Approach**

We approached this as a pair-programming project, with all aspects of development being completed together.

We began by planning the project and discussing the tech stack we wanted to use. We wanted to utilise React Native to focus on a mobile application first, and to utilise TypeScript to ensure fully typed and safe coding. We decided to use PSQL for the database structure as the project needed relational database structures to work fully.

Following the initial planning, we created wireframes for the app layout and mapped the database structures, relations and data types to ensure we had full visiblity before starting coding.

After this, we focused on the back-end first by creating the tables, and creating a set of seed data to load for development. We then created the initial set of API's using the MVC model that would be required for the project. 

We then progressed onto the front-end development, where we took a functionality-first approach and implemented one function at a time, testing in the app as we went. We made sure the project was modular and created reusable components where possible, considering what we may do if the project was taken further and built on in the future. Once the functionality was built and fully functioning, we styled the entire app to be more user friendly and accessible. 

**Challenges**

Previously when using PSQL and hosting via render/supabase we had utilised the older pre-ES6 import terminology, however we ran into issues when using this with typescript and the module interactions. As such, we updated everything to ES6 import terminology which required numerous rewordings and restructurings of the code.

Coding with Expo and utilising the emulator posed challenges when pair programming as the emulator did not work all the time, and caused performance issues when video sharing at the same time. We used the Expo Go version on our personal deivces and shared screenshots which, while not ideal, helped us to bypass this issue.

**Further Ideas**

Next elements for this project would involve adding in user authentication, staff login so that only staff can add new products, and the ability to delete and edit existing products.

