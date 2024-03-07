import React, {useState} from 'react';
import {IntlProvider} from 'react-intl';
import French from '../../lang/fr.json';
import English from '../../lang/en.json';

export const Context = React.createContext();

const local = navigator.language;
let lang;
if (local === 'en' || local === 'en-US') {
   lang = English;
}else if (local === 'fr') {
       lang = French;
   }
const Wrapper = (props) => {
   const [locale, setLocale] = useState(local);
   const [messages, setMessages] = useState(lang);
   function selectLanguage(e) {
    console.log("selectLanguage", e.target.value);
    //console.log("selectLanguage", e.target.lang);
       const newLocale = e.target?.value || e.target.lang;
       console.log("newLocale", newLocale);
       setLocale(newLocale);
       if (newLocale === 'en' || newLocale === 'en-US') {
           setMessages(English);
       } else if (newLocale === 'fr'){
        setMessages(French);
       }
   }
   return (
       <Context.Provider value = {{locale, selectLanguage}}>
           <IntlProvider messages={messages} locale={locale}>
               {props.children}
           </IntlProvider>
       </Context.Provider>
   );
}
export default Wrapper;