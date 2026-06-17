// API endpoints. The 5 REST APIs are fronted by the stable custom domain
// api.pdaboracay.com, disambiguated by a base path per frontend
// (admin/public/reservations/savethedate/share) — so the volatile execute-api
// IDs never leak into the UIs and a from-scratch API rebuild can't break them
// (resolves pda-boracay-cdk#2). faces-control is the v2 control API on its own
// custom domain. survey / moments(-official) / faces box are already stable.
const API = 'https://api.pdaboracay.com';

export const ApiConstants = {
    // Invites
    GET_ALL_INVITES: `${API}/admin/invite?userId=lakandula`,
    GET_INVITE: `${API}/public/invite`,
    CREATE_INVITES_BY_CSV_UPLOAD: `${API}/admin/scramble`,
    INCREMENT_COUNT_OF_INVITE_SENT: `${API}/admin/scramble/increment`,

    // RSVP
    GET_RSVPS: `${API}/reservations/rsvp`,

    // Organizer / admin data
    GET_AND_PUT_ADMIN_ADDED_DATA_TO_RSVPS: `${API}/reservations/organize`,

    // Pre-checkins (reservations)
    GET_PRECHECKINS: `${API}/reservations/pda-boracay-precheckins`,

    // OTP login (reservations)
    SEND_CODE: `${API}/reservations/send-code`,
    VERIFY_CODE: `${API}/reservations/verify-code`,

    // Save the date
    GET_SAVE_THE_DATE_RECORDS: `${API}/savethedate/records`,
    SAVE_THE_DATE_RECORD: `${API}/savethedate/record`,
    GUEST_AUTH: `${API}/savethedate/guest?guest=`,

    // Surveys (survey app — already on its own stable domain)
    GET_ALL_SURVEYS: 'https://survey.pdaboracay.com/surveys',
    GET_SURVEY_COUNTS: 'https://survey.pdaboracay.com/surveys/count',

    // IP tracking (admin API root)
    GET_IP_ADDRESSES: `${API}/admin`,

    // Admin auth
    LOGIN: `${API}/admin/login`,

    // Admin events config
    ADMIN_EVENTS: `${API}/admin/events`,

    // Admin email templates
    TEMPLATES: `${API}/admin/templates`,
    EMAIL_TEMPLATE: `${API}/admin/email-template`,

    // Guestbook wishes
    WISHES: `${API}/public/wishes`,

    // Events (dynamic app config)
    EVENTS: `${API}/public/events`,

    // Visit analytics
    SURVEY: `${API}/public/survey`,

    // Media upload (share app)
    INITIATE_UPLOAD: `${API}/share/initiate`,
    COMPLETE_UPLOAD: `${API}/share/complete`,

    // Moments gallery
    MOMENTS_ADMIN: `${API}/admin/moments`,
    MOMENTS_PUBLIC: `${API}/public/moments/public`,

    // Faces — control plane (v2 API on its own stable domain) + box base.
    // FACES_BOX is an EPHEMERAL on-demand instance and is usually off, so it is
    // excluded from live smoke checks (see api.smoke.test.ts).
    FACES_CONTROL: 'https://faces-control.pdaboracay.com',
    FACES_BOX: 'https://faces.pdaboracay.com',

    // Moments "Official" gallery — static objects served by CloudFront.
    MOMENTS_OFFICIAL_MANIFEST: 'https://moments.pdaboracay.com/uploads/official/manifest.json',
    MOMENTS_OFFICIAL_BOOT: 'https://moments.pdaboracay.com/uploads/official/_boot.json',
} as const;
