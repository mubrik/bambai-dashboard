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

export interface User {
  _id: string;
  fullName: string | null;
  regionName: string;
  email: string;
  password?: string;
  registrationType?: string;
  profileType?: string;
  phoneNumber?: string;
  countryCode?: string;
  modeOfNotice?: string;
  authType?: 'email' | 'phone';
  containsSampleData?: boolean;
  practiceModeStatus?: number;
  showMobileAppDownloadInstructions?: boolean;
  deleted?: boolean;
  createdAt: string;
  updatedAt: string;
  classFilter?: string[];
  firstLogin?: boolean;
  lastLogin?: string;
  status?: string;
  academicYearSettingFilter?: string;
  enableParentCommunication?: boolean;
  academicYearSetting: UserAcademicYearSetting;
  currentRegion: CurrentRegion;
  profile: Record<string, unknown>;
  domains: [];
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
