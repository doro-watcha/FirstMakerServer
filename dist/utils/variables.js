"use strict";

module.exports = {
  // regular expressions
  usernameRegex: /^(?=.{6,24}$)([a-zA-Z0-9]+[.]{0,1}[a-zA-Z0-9]+)$/,
  passwordRegex: /^(?=.{8,20}$)([a-zA-Z0-9]+[.]{0,1}[a-zA-Z0-9]+)$/,
  // errors
  errors: {
    // 400 Bad Request
    INVALID_REQUEST: {
      status: 100,
      ko: '잘못된 요청',
      en: 'Invalid request'
    },
    EMAIL_ALREADY_VERIFIED: {
      status: 101,
      ko: '이미 인증된 이메일',
      en: 'Email already verified'
    },
    // 102 is already taken by JOI
    CHALLENGE_ENTRY_ALREADY_APPROVED: {
      status: 103,
      ko: '이미 승인된 참가 영상',
      en: 'Challenge entry already approved'
    },
    CHALLENGE_ENTRY_ALREADY_REJECTED: {
      status: 104,
      ko: '이미 거절된 참가 영상',
      en: 'Challenge entry already rejected'
    },
    PROMO_ALREADY_ENDED: {
      status: 105,
      ko: '이미 종료된 프로모',
      en: 'Promo already ended'
    },
    SOCIAL_CHANNEL_VIDEO_TYPE_CANNOT_BE_CHANGED: {
      status: 106,
      ko: '채널 변경 불가능',
      en: 'Channel type cannot be change'
    },
    // 401 Unauthorized
    PASSWORD_MISMATCH: {
      status: 200,
      ko: '비밀번호 불일치',
      en: 'Password mismatch'
    },
    INVALID_TOKEN: {
      status: 201,
      ko: '유효하지 않은 토큰',
      en: 'Invalid token'
    },
    UNVERIFIED_EMAIL: {
      status: 202,
      ko: '인증되지 않은 이메일',
      en: 'Unverified email'
    },
    CONSENT_REQUIRED: {
      status: 203,
      ko: '법적 고지에 대한 동의가 필요함',
      en: 'Consent required'
    },
    // 403 Forbidden
    NO_ACCESS: {
      status: 300,
      ko: '접근 권한 없음',
      en: 'No access'
    },
    // 404 Not Found
    USER_NOT_FOUND: {
      status: 402,
      ko: '사용자 없음',
      en: 'User not found'
    },
    COMMENT_NOT_FOUND: {
      status: 404,
      ko: '댓글 없음',
      en: 'Comment not found'
    },
    BOOKMARK_NOT_FOUND: {
      status: 406,
      ko: '북마크 없음',
      en: 'Bookmark not found'
    },
    NOTIFICATION_NOT_FOUND: {
      status: 407,
      ko: '알림 없음',
      en: 'Notification not found'
    },
    NOTIFICATION_TYPE_NOT_FOUND: {
      status: 408,
      ko: '알림 유형 없음',
      en: 'Notification type not found'
    },
    LIKE_NOT_FOUND: {
      status: 413,
      ko: '좋아요 없음',
      en: 'Like not found'
    },
    SCORE_NOT_FOUND: {
      status: 414,
      ko: '해당 성적 없음'
    },
    REPORT_NOT_FOUND: {
      status: 415,
      ko: '해당 예측 리포트 없음'
    },
    MAJOR_NOT_FOUND: {
      status: 416,
      ko: '해당 학과 없음'
    },
    UNIVERSITY_NOT_FOUND: {
      status: 416,
      ko: '검색 가능 대학 없음'
    },
    CONSULTING_NOT_FOUND: {
      status: 417,
      ko: '해당 상담 없음'
    },
    PAYMENT_RECORD_NOT_FOUND: {
      status: 418,
      ko: '해당 결제 기록 없음'
    },
    MAJOR_DATA_NOT_FOUND: {
      status: 419,
      ko: '해당 학과 정보 없음'
    },
    ACADEMY_NOT_FOUND: {
      status: 420,
      ko: '해당 학원 없음'
    },
    SUBJECT_NOT_FOUND: {
      status: 421,
      ko: '해당 과목 없음'
    },
    BIG_CHAPTER_NOT_FOUND: {
      status: 422,
      ko: '해당 대단원 없음'
    },
    MIDDLE_CHAPTER_NOT_FOUND: {
      status: 423,
      ko: '해당 중단원 없음'
    },
    SMALL_CHAPTER_NOT_FOUND: {
      status: 424,
      ko: '해당 소단원 없음'
    },
    HOMEWORK_NOT_FOUND: {
      status: 425,
      ko: '해당 숙제 없음'
    },
    EXAM_NOT_FOUND: {
      status: 426,
      ko: '해당 시험 없음'
    },
    PROBLEM_NOT_FOUND: {
      status: 427,
      ko: '해당 문제 없음'
    },
    NOTE_NOT_FOUND: {
      status: 428,
      ko: '해당 문제 기록 없음'
    },
    SCORING_NOT_FOUND: {
      status: 429,
      ko: '채점 과정 오류'
    },
    WRONG_TEACHER_CODE: {
      status: 430,
      ko: '선생님 비밀번호 오류입니다'
    },
    CLASS_NOT_FONUD: {
      status: 431,
      ko: '해당 클래스 없음'
    },
    STUDENT_NOT_FOUND: {
      status: 432,
      ko: '해당 학생 없음'
    },
    WORK_BOOK_NOT_FOUND: {
      status: 433,
      ko: '해당 문제집 없음'
    },
    BLACK_LSIST_NOT_FOUND: {
      status: 434,
      ko: '해당 블랙 리스트 없음'
    },
    TIME_LIMIT_NOT_FOUND: {
      status: 435,
      ko: '제한 시간 없음'
    },
    WORK_PAPER_NOT_FOUND: {
      status: 436,
      ko: '해당 문제지 없음'
    },
    // 409
    USER_ALREADY_EXISTS: {
      status: 500,
      ko: '이미 사용자 존재',
      en: 'User already exists'
    },
    BOOKMARK_ALREADY_EXISTS: {
      status: 501,
      ko: '이미 북마크 존재',
      en: 'Bookmark already exists'
    },
    LIKE_ALREADY_EXISTS: {
      status: 502,
      ko: '이미 좋아요 존재',
      en: 'Like already exists'
    },
    UNIVERSITY_ALREADY_EXISTS: {
      status: 503,
      ko: '이미 존재하는 대학입니다'
    },
    MAJOR_ALREADY_EXISTS: {
      status: 504,
      ko: '이미 존재하는 학과입니다'
    },
    SCORE_ALREADY_EXISTS: {
      status: 505,
      ko: '이미 성적이 존재합니다'
    },
    REPORT_ALREADY_EXISTS: {
      status: 506,
      ko: '이미 존재하는 예측 보고서입니다'
    },
    REFLECTION_RATIO_ALREADY_EXISTS: {
      status: 507,
      ko: '이미 해당 대학의 반영비율이 존재합니다'
    },
    PAYMENT_RECORD_ALREADY_EXISTS: {
      status: 508,
      ko: '이미 결제 기록이 존재합니다'
    },
    CONSULTING_ALREADY_EXISTS: {
      status: 509,
      ko: '이미 존재하는 상담입니다'
    },
    ACADEMY_ALREADY_EXISTS: {
      status: 510,
      ko: '이미 존재하는 학원입니다'
    },
    SUBJECT_ALREADY_EXISTS: {
      status: 511,
      ko: '이미 존재하는 과목입니다'
    },
    BIG_CHAPTER_ALREADY_EXISTS: {
      status: 512,
      ko: '이미 존재하는 대단원입니다'
    },
    MIDDLE_CHAPTER_ALREADY_EXISTS: {
      status: 513,
      ko: '이미 존재하는 중단원입니다'
    },
    SMALL_CHAPTER_ALREADY_EXISTS: {
      status: 514,
      ko: '이미 존재하는 소단원입니다'
    },
    HOMEWORK_ALREADY_EXISTS: {
      status: 515,
      ko: '이미 존재하는 숙제입니다'
    },
    EXAM_ALREADY_EXISTS: {
      status: 516,
      ko: '이미 존재하는 시험입니다'
    },
    PROBLEM_ALREADY_EXISTS: {
      status: 517,
      ko: '이미 존재하는 문제입니다'
    },
    NOTE_ALREADY_EXISTS: {
      status: 518,
      ko: '이미 존재하는 문제기록입니다.'
    },
    STUDENT_ALREADY_EXISTS: {
      status: 519,
      ko: '이미 존재하는 학생입니다.'
    },
    WORK_PAPER_ALREADY_EXISTS: {
      stuats: 520,
      ko: '이미 존재하는 문제지입니다'
    },
    // 410
    USER_DELETED: {
      status: 600,
      ko: '이미 탈퇴한 사용자입니다.',
      en: 'This user has deleted their account.'
    },
    COMMENT_DELETED: {
      status: 602,
      ko: '삭제된 댓글입니다.',
      en: 'This comment has been deleted.'
    },
    // 500
    INTERNAL_SERVER_ERROR_700: {
      status: 700,
      ko: '서버 오류',
      en: 'Internal Server Error'
    },
    CONSTRAINT_FAILED: {
      status: 701,
      ko: '외래키 제약 조건 실패',
      en: 'Foreign key constraint fails'
    }
  }
};