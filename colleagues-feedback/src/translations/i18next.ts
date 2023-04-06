import i18next from "i18next";
import { initReactI18next } from 'react-i18next';


//namespaces for translations are organised by page

import login_en from './en/login.json';
import login_fi from './fi/login.json';

export const defaultNS = "ns1";
export const resources = {
    en: {
        login: login_en,
    },
    fi: {
        login: login_fi
    }
};

i18next.use(initReactI18next).init({
    fallbackLng: "en",
    ns: ["login_en", "login_fi"],
    defaultNS,
    resources,
    react: {
        bindI18n: 'languageChanged loaded',
    }
});