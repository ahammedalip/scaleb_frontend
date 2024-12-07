# **Scale.B - Business Management Application**

![React](https://img.shields.io/badge/react-17-blue)  
![Node.js](https://img.shields.io/badge/node.js-v14-green)  


**Scale.B** is a business management application designed to help small and medium-sized businesses streamline their operations. With features such as role-based authentication, real-time chat, and secure payment integration, Scale.B provides a seamless platform for managing business processes.

---

## **Features**

- **Role-Based Authentication**: Secure access for admins and users.  
- **Real-Time Chat**: Powered by Socket.IO for efficient communication.  
- **Payment Gateway Integration**: Supports Stripe for secure payments.  
- **File Uploads**: Image and document management via Firebase.  
- **Business Analytics Dashboard**: Track and analyze key metrics.

---

## **Tech Stack**

### **Frontend**

- React.js  
- Redux Toolkit  
- Tailwind CSS  

### **Backend**

- Node.js  
- Express.js  
- MongoDB (Mongoose ODM)  

### **Integrations and Tools**

- JWT (JSON Web Tokens)  
- AWS EC2  
- Socket.IO  
- Firebase  
- Stripe Payment Gateway  

---

## **Installation**
This is the front end for the Scale.B. You can find the Backend for the same from the repositories
### **Prerequisites**

- **Node.js** (v14 or above)  
- **MongoDB** (Local or cloud instance)  

### **Steps**

1. Clone the repository:
   ```bash
   git clone: https://github.com/ahammedalip/scaleb_frontend.git

2. Navigate to the project directory:
   ```bash
   cd scaleb_frontend
3. Install dependencies:
   ```bash
   npm install

---
---
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

