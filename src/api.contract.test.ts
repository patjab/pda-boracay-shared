import { describe, it, expect } from 'vitest';
import { ApiConstants } from './api';
import { SiteUrls } from './siteUrls';

/**
 * Contract tests — no network. They lock the *shape* of the endpoint config so a
 * refactor (notably the planned move from raw `*.execute-api…` URLs to stable
 * custom domains like api.pdaboracay.com) can't silently drop, rename, or
 * malform an endpoint.
 *
 * Why these survive the custom-domain switch: they assert the **resource path**
 * (e.g. `/login`), never the host or the `/production` stage prefix. Moving a
 * host or dropping the stage segment leaves the resource path unchanged, so
 * these stay green — but a typo'd or missing path goes red.
 */

// Resource path = pathname minus any query. The 5 REST APIs sit under
// api.pdaboracay.com/<frontend>/… (base path per API); the stable domains
// (survey, faces-control, faces box, moments-official) carry their own paths.
function resourcePath(url: string): string {
    return new URL(url).pathname || '/';
}

// The agreed endpoint inventory (full resource paths incl. the api.pdaboracay.com
// base path). Update deliberately when adding/removing/moving an endpoint —
// that's the point: it forces a conscious, reviewed change.
const EXPECTED_PATHS: Record<keyof typeof ApiConstants, string> = {
    GET_ALL_INVITES: '/admin/invite',
    GET_INVITE: '/public/invite',
    CREATE_INVITES_BY_CSV_UPLOAD: '/admin/scramble',
    INCREMENT_COUNT_OF_INVITE_SENT: '/admin/scramble/increment',
    GET_RSVPS: '/reservations/rsvp',
    GET_AND_PUT_ADMIN_ADDED_DATA_TO_RSVPS: '/reservations/organize',
    GET_PRECHECKINS: '/reservations/pda-boracay-precheckins',
    SEND_CODE: '/reservations/send-code',
    VERIFY_CODE: '/reservations/verify-code',
    GET_SAVE_THE_DATE_RECORDS: '/savethedate/records',
    SAVE_THE_DATE_RECORD: '/savethedate/record',
    GUEST_AUTH: '/savethedate/guest',
    GET_ALL_SURVEYS: '/surveys',
    GET_SURVEY_COUNTS: '/surveys/count',
    GET_IP_ADDRESSES: '/admin',
    LOGIN: '/admin/login',
    ADMIN_EVENTS: '/admin/events',
    TEMPLATES: '/admin/templates',
    EMAIL_TEMPLATE: '/admin/email-template',
    WISHES: '/public/wishes',
    EVENTS: '/public/events',
    SURVEY: '/public/survey',
    INITIATE_UPLOAD: '/share/initiate',
    COMPLETE_UPLOAD: '/share/complete',
    MOMENTS_ADMIN: '/admin/moments',
    MOMENTS_PUBLIC: '/public/moments/public',
    FACES_CONTROL: '/',
    FACES_BOX: '/',
    MOMENTS_OFFICIAL_MANIFEST: '/uploads/official/manifest.json',
    MOMENTS_OFFICIAL_BOOT: '/uploads/official/_boot.json',
};

const entries = Object.entries(ApiConstants) as [keyof typeof ApiConstants, string][];

describe('ApiConstants — endpoint contract', () => {
    it('has no endpoint without an expected resource path (and vice-versa)', () => {
        expect(Object.keys(ApiConstants).sort()).toEqual(Object.keys(EXPECTED_PATHS).sort());
    });

    it.each(entries)('%s is a valid https:// URL', (_key, url) => {
        const u = new URL(url); // throws if malformed
        expect(u.protocol).toBe('https:');
        expect(u.host).not.toBe('');
    });

    it.each(entries)('%s resolves to its agreed resource path (host-agnostic)', (key, url) => {
        expect(resourcePath(url)).toBe(EXPECTED_PATHS[key]);
    });
});

describe('SiteUrls — site/page links', () => {
    it.each(Object.entries(SiteUrls) as [string, string][])('%s is a valid https:// URL', (_key, url) => {
        const u = new URL(url);
        expect(u.protocol).toBe('https:');
        expect(u.host).not.toBe('');
    });
});
