/* eslint-disable no-unused-vars */
/*eslint no-undef: "error"*/
/* eslint-disable max-len */
import moment from 'moment';
import 'moment/locale/pt-br';

export const now = (pattern) => {
    moment().locale('pt-br');
    return moment().format(pattern);
};

export const dateFormat = (date, pattern) => moment(date).format(pattern);

export const dateAdd = (date, toAdd, type, pattern) => moment(date).add(toAdd, type).format(pattern);

export const dateSub = (date, toAdd, type, pattern) => moment(date).subtract(toAdd, type).format(pattern);
