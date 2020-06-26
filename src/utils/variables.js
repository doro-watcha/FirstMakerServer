module.exports = {
	// regular expressions
	usernameRegex: /^(?=.{6,24}$)([a-zA-Z0-9]+[.]{0,1}[a-zA-Z0-9]+)$/,
  passwordRegex: /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#\$%\^&\*]{8,20}$/,


	// errors
	errors: {
		// 400 Bad Request
		INVALID_REQUEST: {
			status: 100,
			ko: '잘못된 요청',
			en: 'Invalid request',
		},
		EMAIL_ALREADY_VERIFIED: {
			status: 101,
			ko: '이미 인증된 이메일',
			en: 'Email already verified',
		},
		// 102 is already taken by JOI
		CHALLENGE_ENTRY_ALREADY_APPROVED: {
			status: 103,
			ko: '이미 승인된 참가 영상',
			en: 'Challenge entry already approved',
		},
		CHALLENGE_ENTRY_ALREADY_REJECTED: {
			status: 104,
			ko: '이미 거절된 참가 영상',
			en: 'Challenge entry already rejected',
		},
		PROMO_ALREADY_ENDED: {
			status: 105,
			ko: '이미 종료된 프로모',
			en: 'Promo already ended',
		},
		SOCIAL_CHANNEL_VIDEO_TYPE_CANNOT_BE_CHANGED: {
			status: 106,
			ko: '채널 변경 불가능',
			en: 'Channel type cannot be change',
		},
		// 401 Unauthorized
		PASSWORD_MISMATCH: {
			status: 200,
			ko: '비밀번호 불일치',
			en: 'Password mismatch',
		},
		INVALID_TOKEN: {
			status: 201,
			ko: '유효하지 않은 토큰',
			en: 'Invalid token',
		},
		UNVERIFIED_EMAIL: {
			status: 202,
			ko: '인증되지 않은 이메일',
			en: 'Unverified email',
		},
		CONSENT_REQUIRED: {
			status: 203,
			ko: '법적 고지에 대한 동의가 필요함',
			en: 'Consent required',
		},
		// 403 Forbidden
		NO_ACCESS: {
			status: 300,
			ko: '접근 권한 없음',
			en: 'No access',
		},
		// 404 Not Found
		USER_NOT_FOUND: {
			status: 402,
			ko: '사용자 없음',
			en: 'User not found',
		},
		VIDEO_NOT_FOUND: {
			status: 403,
			ko: '비디오 없음',
			en: 'Video not found',
		},
		COMMENT_NOT_FOUND: {
			status: 404,
			ko: '댓글 없음',
			en: 'Comment not found',
		},
		MUSIC_NOT_FOUND: {
			status: 405,
			ko: '노래 없음',
			en: 'Music not found',
		},
		BOOKMARK_NOT_FOUND: {
			status: 406,
			ko: '북마크 없음',
			en: 'Bookmark not found',
		},
		NOTIFICATION_NOT_FOUND: {
			status: 407,
			ko: '알림 없음',
			en: 'Notification not found',
		},
		NOTIFICATION_TYPE_NOT_FOUND: {
			status: 408,
			ko: '알림 유형 없음',
			en: 'Notification type not found',
		},
		ARTIST_NOT_FOUND: {
			status: 410,
			ko: '아티스트 없음',
			en: 'Artist not found',
		},
		USER_DEVICE_NOT_FOUND: {
			status: 412,
			ko: '기기 없음',
			en: 'User device not found',
		},
		LIKE_NOT_FOUND: {
			status: 413,
			ko: '좋아요 없음',
			en: 'Like not found',
		},
		USER_NOTIFICATION_SETTING_NOT_FOUND: {
			status: 418,
			ko: '사용자 알림 수신 설정 없음',
			en: 'User notification setting not found',
		},
		NEWS_NOT_FOUND: {
			status: 420,
			ko: '게시물 없음',
			en: 'News not found',
		},
		PART_NOT_FOUND: {
			status: 421,
			ko: '파트 없음',
			en: 'Part not found',
		},
		TAG_NOT_FOUND: {
			status: 422,
			ko: '태그 없음',
			en: 'Tag not found',
		},
		PROMO_NOT_FOUND: {
			status: 423,
			ko: '프로모 없음',
			en: 'Promo not found',
		},
		SOCIAL_CHANNEL_NOT_FOUND: {
			status: 424,
			ko: '소셜 채널 없음',
			en: 'Social channel not found',
		},
		SOCIAL_CHANNEL_VIDEO_NOT_FOUND: {
			status: 425,
			ko: '소셜 채널 비디오 없음',
			en: 'Social channel video not found',
		},
		USER_PAYMENT_METHOD_NOT_FOUND: {
			status: 426,
			ko: '사용자 결제 수단 없음',
			en: 'User payment method not found',
		},
		CHALLENGE_ENTRY_NOT_FOUND: {
			status: 427,
			ko: '챌린지 참가 없음',
			en: 'Challenge entry not found',
		},
		PAYMENT_NOT_FOUND: {
			status: 428,
			ko: '결제 없음',
			en: 'Payment not found',
		},
		// 409
		USER_ALREADY_EXISTS: {
			status: 500,
			ko: '이미 사용자 존재',
			en: 'User already exists',
		},
		BOOKMARK_ALREADY_EXISTS: {
			status: 501,
			ko: '이미 북마크 존재',
			en: 'Bookmark already exists',
		},
		LIKE_ALREADY_EXISTS: {
			status: 502,
			ko: '이미 좋아요 존재',
			en: 'Like already exists',
		},
		TAG_ALREADY_EXISTS: {
			status: 506,
			ko: '이미 태그 존재',
			en: 'Tag already exists',
		},
		SOCIAL_CHANNEL_ALREADY_EXISTS: {
			status: 507,
			ko: '이미 소셜 채널 존재',
			en: 'Social channel already exists',
		},
		SOCIAL_CHANNEL_VIDEO_ALREADY_EXISTS: {
			status: 508,
			ko: '이미 등록된 비디오',
			en: 'Social channel video already exists',
		},
		DUAL_SUBMISSION_IN_SAME_PART: {
			status: 509,
			ko: '해당 파트에 이미 비디오를 제출함',
			en: 'Video has already been submitted to this part.',
		},
		USER_PAYMENT_METHOD_ALREADY_EXISTS: {
			status: 510,
			ko: '이미 결제 수단 존재',
			en: 'User payment method already exists',
		},
		PROMO_ALREADY_EXISTS: {
			status: 511,
			ko: '이미 프로모 존재',
			en: 'Promo already exists',
		},
		// 410
		USER_DELETED: {
			status: 600,
			ko: '이미 탈퇴한 사용자입니다.',
			en: 'This user has deleted their account.',
		},
		VIDEO_DELETED: {
			status: 601,
			ko: '삭제된 영상입니다.',
			en: 'This video has been deleted.',
		},
		COMMENT_DELETED: {
			status: 602,
			ko: '삭제된 댓글입니다.',
			en: 'This comment has been deleted.',
		},
		// 500
		INTERNAL_SERVER_ERROR_700: {
			status: 700,
			ko: '서버 오류',
			en: 'Internal Server Error',
		},
		CONSTRAINT_FAILED: {
			status: 701,
			ko: '외래키 제약 조건 실패',
			en: 'Foreign key constraint fails',
		},
	}
}