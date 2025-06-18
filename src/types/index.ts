export interface ErrorResponse {
  error?: string;
  message?: string;
}

export interface APIError {
  data?: ErrorResponse;
  status?: number;
}

export interface ActionSuccessResponse<T> {
  error: null;
  data: T;
}

export interface ActionErrorResponse {
  error: string;
  data: null;
}

export type ActionResponse<T> = ActionErrorResponse | ActionSuccessResponse<T>;

export type ActionPromiseResponse<T> = Promise<ActionResponse<T>>;

export type BaseParams = {[key: string]: string | string[] | undefined};
export type SearchParams = Promise<BaseParams>;

export interface LoginUserData {
  email: string;
  password?: string;
  otp?: string;
  type?: 'email' | 'otp'; // default: "auth/signin" or "auth/otp-signin"
  date?: string;
}

export interface AcademicYearSetting {
  _id: string;
  region: string;
  academicYear: {
    _id: string;
    name: string;
    year: string;
    createdAt: string;
    updatedAt: string;
  };
  period: {start: string; end: string};
  isSample: boolean;
  isPracticeMode: boolean;
  isSetupComplete: boolean;
  terms: {term: number; start: string; end: string}[];
}

interface UserAcademicYearSetting extends AcademicYearSetting {
  id: string;
  isNextAYsetUp: boolean;
  currentAY?: AcademicYearSetting | null;
  previousAY?: AcademicYearSetting | null;
  nextAY?: AcademicYearSetting | null;
  allAys?: AcademicYearSetting[];
  previousAYs?: AcademicYearSetting[];
  upcomingAYs?: AcademicYearSetting[];
}

interface CurrentRegion {
  _id: string;
  name: string;
  code: string;
  registrationType: string;
  recentConversionRates: boolean;
  deletionConfirmations: boolean;
  studentInactiveThreshold: number;
  testTypes: [];
  showSchoolVitalsPowerUp: boolean;
  showRoriPowerUp: boolean;
  showSinidiPowerUp: boolean;
  showCalendarPowerUp: boolean;
  showRisingFasterPowerUp: boolean;
  showAccountingPosPaymentSubMenu: boolean;
  enableFeeNotification: boolean;
  feeAndCurrencyLocked: boolean;
  defaultCurrency: string;
  CountryCode: string;
  deleted: boolean;
  terms: [];
  createdAt: string;
  updatedAt: string;
  feeCadence: string;
  academicYearSetting: string;
  feesNotificationFrequency: string;
  featureList: string[];
  isPipelineReady: boolean;
}

interface Role {
  _id: string;
  name: string;
  accessLevel: number;
  pages: string[];
}

interface Domain {
  region: CurrentRegion;
  role: Role;
  pages: [];
  schools: [];
  schoolList: [];
  _id: string;
}

// prev Staff academic year
interface UserAcademicYear {
  _id: string;
  user: string;
  academicYearSetting: string;
  classes: {
    _id: string;
    isPrimary?: boolean;
    isSecondary?: boolean;
    subjects: {_id: string; isSecondary: boolean}[];
  }[];
  createdAt: string;
  staff: string;
  updatedAt: string;
  updatedBy: string;
}

export interface User {
  _id: string;
  fullName: string | null;
  email: string;
  phoneNumber?: string;
  profileType?: string;
  modeOfNotice?: string;
  currentRegion: CurrentRegion;
  deleted?: boolean;
  domains: Domain[];
  registrationType?: string;
  countryCode?: string;
  authType?: 'email' | 'phone';
  containsSampleData?: boolean;
  practiceModeStatus?: number;
  showMobileAppDownloadInstructions?: boolean;
  createdAt: string;
  updatedAt: string;
  classFilter?: string[];
  schoolsFilter?: string[];
  firstLogin?: boolean;
  isProfileAccount?: boolean;
  lastLogin?: string;
  status?: string;
  academicYearSettingFilter?: string;
  enableParentCommunication?: boolean;
  userAcademicYear?: UserAcademicYear;
  academicYearSetting: UserAcademicYearSetting;
  profile: {
    notifications: {
      emailOnUnusualActivity: boolean;
      emailOnNewBrowserSignin: boolean;
      emailSalesAndNews: boolean;
      emailOnNewFeatureUpdates: boolean;
      emailTips: boolean;
    };
    saveActivityLog: boolean;
  };
  preferenceSettings: {
    showPromoteStudentPrompt: boolean;
    showConfirmSwitchingAYPrompt: boolean;
  };
  otpTracker?: {
    isOtpLocked: boolean;
    otpFailCount: number;
    otpLockDate: string;
  };
}

export interface QueryFilterParams {
  tags?: string[];
  region?: string;
  district?: string;
  page?: number;
  perPage?: number;
  sortColumn?: string;
  gender?: '' | 'Male' | 'Female' | 'Other';
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedItem<T> {
  total?: number;
  records?: T[];
}

export interface Student {
  _id: string;
  studentID: string | null;
  fullName: string | null;
  school?: {schoolName: string};
  class: string | null;
  gender: string | null;
  mobileNumber: string | null;
}

export interface School {
  _id: string;
  schoolCode: string | null;
  schoolID: string | null;
  schoolName: string | null;
  region: string | null;
  noOfStudents: number | null;
}
