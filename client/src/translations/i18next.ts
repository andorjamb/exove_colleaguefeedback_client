import i18next from "i18next";
import { initReactI18next } from 'react-i18next';


//namespaces for translations are organised by component

import login_en from './en/login.json';
import login_fi from './fi/login.json';
import header_en from './en/header.json';
import header_fi from './fi/header.json';
import dashboardUser_en  from './en/dashboardUser.json';


export const defaultNS = "ns1";
export const resources = {
    en: {
        login: login_en,
        header: header_en,
        dashboardUser: dashboardUser_en,
    },
    fi: {
        login: login_fi,
        header: header_fi
    }
};

i18next.use(initReactI18next).init({
    fallbackLng: "en",
    ns: ["login_en", "login_fi", "header_en", "header_fi", "dashboardUser_en"],
    defaultNS,
    resources,
    react: {
        bindI18n: 'languageChanged loaded',
    }
});