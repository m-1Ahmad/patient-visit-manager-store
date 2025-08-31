# Patient Visit Manager

## Introduction
In the **Patient Visit Manager**, I have implemented **NGXS store** for state management. The structure of the application has mostly remained the same, with the **store managing the state** and the **services handling HTTP requests**.  

The project uses the **NGXS Storage Plugin** to save the authentication token in **sessionStorage**, ensuring that users remain logged in even after a page refresh.  

All **CRUD operations** for **Patients, Doctors, and Visits** have been fully implemented. For **Users**, only **view** and **delete** functionalities have been added; **add** and **update** remain to be implemented.


## Store Structure
Each module has its **own store** inside the `core/store` folder. This is done to avoid a single bulky store and to make the project easier to **extend and maintain**.


## Possible Extensions
Future extensions could include:

- Using **cookies** to manage user sessions.  
- Adding a **User Profile** page, allowing users to view and manage their own profile.  


## Notes
- **Fee Schedule** and **Activity Log** features have not been implemented yet, as doing so would require **backend modifications**.  
- The project’s **hierarchical structure** and **modular stores** make it **easy to extend** the application in the future, including integrating fee schedules and activity logs once the backend is updated.

## How to Run
- First make sure you have node <=20.19 by 
```
npm -v
```

- Install Angular 17 by:
```
npm i @angular/cli@17
```

- Install Node dependencies by:
```
npm install
```

- Serve the project by:
```
ng serve
```

