export const SIDEBAR_WIDTH = 214;
export const SIDEBAR_WIDTH_COLLAPSED = 56;

export const TESTING_IDS_MAP = {
  TEXT_INPUT: 'text-input',
  PHONE_INPUT: 'phone-input',
  SELECT_INPUT: 'select-main-input',
  SELECT_OPTION_INPUT: 'select-option-input',
  DATE_INPUT: 'date-input',
  TIME_INPUT: 'time-input',
  NAVBAR: 'navbar',
  SIDEBAR: 'sidebar',
  BUTTON: 'button',
  LINK: 'link',
  HOMEPAGE_LINK: 'link_homepage_bambai',
  LOGINPAGE_LINK: 'link_loginpage',
  REGISTER_LINK: 'link_register',
  RADIO_INPUT: 'radio-input',
  OTP_INPUT: 'otp-input',
};

export const REGEX_PATTERNS = {
  NotOnlySpaces: /.*[^ ].*/,
  Email: /[A-Za-z0-9!#$%&'*+._]+@[A-Za-z0-9!#$%&'*+._]+\.[A-Za-z]{2,5}/,
  Amount: /^\d+([.,]\d{0,2})?$/,
  NotANumber: /[^0-9]/,
  lowerCaseLetters: /[a-z]/,
  upperCaseLetters: /[A-Z]/,
  numberOnly: /[0-9]/,
  isSpecialCharacter: /[^a-zA-Z0-9]/,
  notALetterOrSpace: /[^\p{L}\s]/u,
  notALetterOrNumGlobal: /[^\p{L}0-9]/gu,
};
