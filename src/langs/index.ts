export enum Langs {
  RU = 'ru',
  EN = 'en',
}

export const translate = {
  en: {
    header: {
      nav: {
        home: 'Home',
        shop: 'Shop',
        blog: 'Blog',
        club: 'Club',
        contacts: 'Contacts',
      },
      search: {
        search: 'Search',
        error: 'Enter your request',
        inShop: 'in shop',
        inBlog: 'in blog',
      },
      account: {
        account: 'Account',
        logout: 'Logout',
        login: 'Log In',
        register: 'Sign Up',
      },
    },
    shop: {
      sorting: {
        Sorting: 'Sorting',
      },
    },
    auth: {
      login: {
        login: 'Log In',
        registration: 'Registration',
        email: 'Email',
        password: 'Password',
        have: 'You dont have an account?',
        send: 'Send',
        emailValidate: {
          required_error: 'Enter your email',
          message: 'Enter your email',
          correct: 'Enter the correct email',
        },
        passwordValidate: {
          required_error: 'Enter password',
          message: 'Enter the correct password',
          correct: 'Enter the correct password',
        },
      },
    },
  },
  ru: {
    header: {
      nav: {
        home: 'Главная',
        shop: 'Магазин',
        blog: 'Блог',
        club: 'Клуб',
        contacts: 'Контакты',
      },
      search: {
        search: 'Поиск',
        error: 'Введите запрос',
        inShop: 'в магазине',
        inBlog: 'в блоге',
      },
      account: {
        account: 'Кабинет',
        logout: 'Выйти',
        login: 'Войти',
        register: 'Регистрация',
      },
    },
    shop: {
      sorting: {
        Sorting: 'Сортировка',
      },
    },
    auth: {
      login: {
        login: 'Вход',
        registration: 'Регистрация',
        email: 'Email',
        password: 'Пароль',
        have: 'У вас нет аккаунта?',
        send: 'Отправить',
        emailValidate: {
          required_error: 'Введите ваш email',
          message: 'Введите ваш email',
          correct: 'Введите корректный email',
        },
        passwordValidate: {
          required_error: 'Введите пароль',
          message: 'Введите корректный пароль',
          correct: 'Введите корректный пароль',
        },
      },
    },
  },
}
