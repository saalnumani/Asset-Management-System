/* global window */
// ============================================================
// Permissions — 3-role matrix (HQ / Embassy Admin / Embassy Staff)
// Encoded per the brief's permission table.
// ============================================================

const PERMISSION_ACTIONS = [
  "view-posting", "register-posting", "register-property",
  "register-floor", "register-room", "register-sub-space",
  "edit-asset", "mark-asset-missing-broken",
  "schedule-maintenance", "approve-maintenance-cost",
  "record-bill",
  "manage-event", "record-gift-received", "set-gift-disposition",
  "record-gift-given", "manage-gift-stock",
  "view-cross-posting-reports", "view-audit-log",
  "manage-users-any", "manage-users-own-posting",
  "submit-request", "approve-request",
];

// Each rule returns true if allowed.
// `target` may include { postingId, propertyId, cost }
function _ownPosting(user, target) {
  if (!target || !target.postingId) return true; // no scope context — assume ok
  return user.postingId && user.postingId === target.postingId;
}

const RULES = {
  "view-posting": {
    "hq-admin":       () => true,
    "embassy-admin":  _ownPosting,
    "embassy-staff":  _ownPosting,
  },
  "register-posting":      { "hq-admin": () => true, "embassy-admin": () => false, "embassy-staff": () => false },
  "register-property":     { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "register-floor":        { "hq-admin": () => false, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "register-room":         { "hq-admin": () => false, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "register-sub-space":    { "hq-admin": () => false, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "edit-asset":            { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": _ownPosting },
  "mark-asset-missing-broken": { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": _ownPosting },
  "schedule-maintenance":  { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": _ownPosting },
  "approve-maintenance-cost": {
    "hq-admin": () => true,
    "embassy-admin":  (u, t) => _ownPosting(u, t) && (!t || !t.cost || t.cost <= 200),
    "embassy-staff":  () => false,
  },
  "record-bill":           { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": _ownPosting },
  "manage-event":          { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": _ownPosting },
  "record-gift-received":  { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": _ownPosting },
  "set-gift-disposition":  { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "record-gift-given":     { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": _ownPosting },
  "manage-gift-stock":     { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "view-cross-posting-reports": { "hq-admin": () => true, "embassy-admin": () => false, "embassy-staff": () => false },
  "view-audit-log":        { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "manage-users-any":      { "hq-admin": () => true, "embassy-admin": () => false, "embassy-staff": () => false },
  "manage-users-own-posting": { "hq-admin": () => true, "embassy-admin": _ownPosting, "embassy-staff": () => false },
  "submit-request":        { "hq-admin": () => false, "embassy-admin": () => true, "embassy-staff": () => true },
  "approve-request":       { "hq-admin": () => true, "embassy-admin": () => false, "embassy-staff": () => false },
};

function can(user, action, target) {
  if (!user) return false;
  const rule = RULES[action];
  if (!rule) return false;
  const fn = rule[user.role];
  if (!fn) return false;
  return fn(user, target);
}

Object.assign(window, { PERMISSION_ACTIONS, can });
