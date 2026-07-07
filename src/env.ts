// Runtime environment detection (pda-boracay-cdk #6 testing rollout): the SAME
// UI bundle serves every environment, so the environment is picked at RUNTIME
// from the page hostname — no per-bundler build flags.
//
// This is THE environment check (extracted from api.ts for pda-boracay#119,
// where a hand-rolled copy in an app repo missed the rebranded test host and a
// test page linked prod; grown into a named-env hostmap for cdk#562/#563,
// where a second hand-rolled copy in Valet did the same for invite links).
// Consumers should use the derived constants (ApiConstants, SiteUrls, …)
// rather than re-deriving hosts from these exports.

export type EnvName = 'PROD' | 'TEST';

// Ordered hostname→environment rules. First match wins; no match — prod pages,
// and Node/SSR/unit-test where `window` is absent — resolves PROD. A rule
// matches its host and any subdomain of it (e.g. www.test.pdaboracay.com).
// Onboarding a future environment (DEV, AUTO_QA, …) = one row here + its
// subdomain marker in ENV_SUBDOMAIN below; nothing else re-derives hosts.
const HOST_RULES: ReadonlyArray<{ pattern: RegExp; env: EnvName }> = [
    { pattern: /(^|\.)test\.(pdaboracay|boracaya)\.com$/, env: 'TEST' },
];

const resolveEnv = (): EnvName => {
    if (typeof window === 'undefined') return 'PROD';
    const hostname = window.location.hostname;
    return HOST_RULES.find((r) => r.pattern.test(hostname))?.env ?? 'PROD';
};

/** The page's environment, resolved once at module load (the hostname cannot
 *  change without a full navigation). */
export const ENV: EnvName = resolveEnv();

/** Legacy boolean — prefer ENV in new code; kept because the host builders
 *  need exactly a boolean while only two environments exist. */
export const isTestEnv: boolean = ENV === 'TEST';

/** The per-environment subdomain marker on platform hosts: '' (prod), '.test'
 *  (testing) — e.g. `valet${ENV_SUBDOMAIN}.boracaya.com`. A future env extends
 *  this alongside HOST_RULES. */
export const ENV_SUBDOMAIN: string = isTestEnv ? '.test' : '';
