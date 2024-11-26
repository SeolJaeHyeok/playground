type PatternType = 
  | 'email' 
  | 'phone' 
  | 'url' 
  | 'date' 
  | 'time' 
  | 'creditCard' 
  | 'ipv4' 
  | 'ipv6'
  | 'password'
  | 'username'
  | 'postalCode'
  | 'hexColor'  
  | 'koreanName'
  | 'businessNumber' 
  | 'corporateNumber'
  | 'residentNumber'
  | 'driverLicense'
  | 'carNumber'
  | 'koreanOnly'
  | 'hangleOnly'
  | 'bankAccount';

const patterns: Record<PatternType, RegExp> = {
  // 이메일
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  
  // 한국 전화번호 (휴대폰 & 일반전화)
  phone: /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
  
  // URL
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  
  // 날짜 (YYYY-MM-DD)
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  
  // 시간 (HH:MM:SS)
  time: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  
  // 신용카드
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/,
  
  // IPv4
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  
  // IPv6
  ipv6: /^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  
  // 비밀번호 (최소 8자, 대문자, 소문자, 숫자, 특수문자 포함)
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  
  // 사용자명 (영문, 숫자, _- 포함 3-16자)
  username: /^[a-zA-Z0-9_-]{3,16}$/,
  
  // 우편번호 (한국)
  postalCode: /^\d{5}$/,
  
  // HEX 컬러코드
  hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,

  // 한글 이름 (2-4자)
  koreanName: /^[가-힣]{2,4}$/,
  
  // 사업자등록번호
  businessNumber: /^(\d{3})-?(\d{2})-?(\d{5})$/,
  
  // 법인등록번호
  corporateNumber: /^(\d{6})-?(\d{7})$/,
  
  // 주민등록번호
  residentNumber: /^(\d{6})-?([1-4]\d{6})$/,
  
  // 운전면허번호 (2015년 이후 형식)
  driverLicense: /^(1[1-9]|2[0-9]|서울|부산|대구|인천|대전|광주|울산|제주|경기|강원|충북|충남|전북|전남|경북|경남)-?(\d{2})-?(\d{6}-?\d{2})$/,
  
  // 차량번호판 (신형식)
  carNumber: /^(\d{2,3})[가-힣]\s?(\d{4})$/,
  
  // 한글+영어+숫자 조합
  koreanOnly: /^[가-힣a-zA-Z0-9\s]+$/,
  
  // 순수 한글만
  hangleOnly: /^[가-힣\s]+$/,
  
  // 은행 계좌번호 (모든 은행 통합)
  bankAccount: /^\d{1,6}-?\d{2,6}-?\d{2,6}$/
};

interface ValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * 주어진 값이 지정된 패턴과 일치하는지 검사합니다.
 */
function check(type: PatternType, value: string): boolean {
  const pattern = patterns[type];
  if (!pattern) {
    throw new Error(`패턴 "${type}"을(를) 찾을 수 없습니다.`);
  }
  
  return pattern.test(value);
}

/**
 * 지정된 패턴의 정규식을 반환합니다.
 */
function getPattern(type: PatternType): RegExp {
  const pattern = patterns[type];
  if (!pattern) {
    throw new Error(`패턴 "${type}"을(를) 찾을 수 없습니다.`);
  }
  return pattern;
}

/**
 * 새로운 패턴을 추가합니다.
 */
function addPattern(name: string, pattern: RegExp): void {
  patterns[name as PatternType] = pattern;
}

/**
 * 값을 검증하고 결과 메시지를 반환합니다.
 */
function validate(type: PatternType, value: string): ValidationResult {
  const isValid = check(type, value);
  return {
    isValid,
    message: isValid ? '유효한 형식입니다.' : '유효하지 않은 형식입니다.'
  };
}

export {
  check,
  getPattern,
  addPattern,
  validate,
  type PatternType,
  type ValidationResult
};
