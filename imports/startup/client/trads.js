import { $ } from 'meteor/jquery';

$.fn.form.settings.prompt = {
  integer: '{name} doit être un entier',
  empty: '{name} ne doit pas être vide',
};
