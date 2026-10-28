---
title: "Memory That Outlives Its Owner"
date: 2026-10-21
slug: "memory-that-outlives-its-owner"
translation_key: "memory-that-outlives-its-owner"
lang: "en"
categories: ["Technology"]
tags: ["Debian","php","Vulnerability"]
---

_Draft of October 21, 2026, written a few hours after PHP published the patches. The technical facts were checked against the two official php-src advisories; my own readings are marked as such._

This afternoon, those of us who administer SIU installations received a communiqué with two identifiers, CVE-2026-109618 and CVE-2026-109619, and an urgent request: apply the patches as soon as possible. For tomorrow, the SIU team has called two working sessions, at 10:00 and 15:00, to support both the installation of the patches and the changes to `php.ini`. It is the right reaction to two critical flaws in the interpreter itself.

The quick answer to what must be done is obvious: update. But that answer confuses the remedy with the diagnosis. What I argue in this text is not a proof but a reading: the most instructive thing about these flaws is not their severity but their shape. This is state that outlives the request that created it, and that shape explains why the official advisories distrust almost any mitigation by configuration.

## Two flaws, one habit

PHP2Shell is the nickname under which the two flaws circulate. Both are rated 9.2 on CVSS 4.0, both allow, according to the php-src advisories, unauthenticated remote code execution with the privileges of the web process, and both are fixed in versions 8.2.35, 8.3.36, 8.4.27 and 8.5.12. Before publication a figure of 10.0 circulated; it is best to stick with the official one, which also declares high attack complexity and present prerequisites. They are critical, but not trivial to exploit, and that is no reason to delay.

The first, CVE-2026-109618, stems from the handling of exhausted memory. When a request exceeds the available memory, PHP abandons what it was doing through a non-local jump (`longjmp()`). If at that moment the request’s memory was only half initialized, the jump leaves it in an invalid state, and the request shutdown procedure reads it anyway. The advisory points out that Apache with mod\_php runs that shutdown unconditionally, even when request startup failed, so the problem occurs before a single line of the application has run. PHP-FPM, by contrast, terminates the child process when startup fails; code analysis considers it susceptible through other paths, although no complete exploit has been demonstrated for that mode.

The second, CVE-2026-109619, is harder to explain and more instructive. A PHP process that serves many requests keeps global state (of errors, sessions, objects, extensions) that points to memory belonging to a single one of them. If that request ends without resetting it, the next one may find a pointer to already freed memory before normal initialization replaces it. The advisory describes it as the conjunction of a producer and a consumer, in different requests served by the same process. Among the confirmed consumers are session upload progress and the configuration diagnostics emitted before request initialization; in PHP 8.5, the fatal error backtrace provides the best-demonstrated case. For this second flaw, the advisory reports remote code execution validated against mod\_php and also against FPM, although in FPM it depends on the application offering a suitable operation that an attacker can make fail.

There is a common thread, and it is my interpretation, not a sentence from the advisories: in both cases PHP leaves something half done and trusts the shutdown to clean it up. The vulnerability lies not in any isolated step but in the boundary between one request and the next.

## What configuration cannot reach

This is what, in my judgment, deserves a slow reading. The advisory for CVE-2026-109619 states plainly that there is no complete generic mitigation by configuration, because a route in the application, an extension or the server may publish or consume stale state without leaving a predictable log line. Updating is the only reliable measure; the advisory for CVE-2026-109618 says the same.

For those who cannot update today, the advisories offer partial containment. Against 109619: disable `session.upload_progress.enabled` and restart all processes; in PHP 8.5, also disable `fatal_error_backtraces`; clean up the configuration diagnostics emitted before request initialization, preferring startup configuration over per-request overrides; and, if performance does not matter, limit `pm.max_requests` to 1. Against 109618: set `memory_limit` to `-1` administratively, keep `post_max_size` conservative, and bound request size and the number of parts and headers at the frontend. Both advisories make clear that none of these measures is complete.

Two warnings contradict the usual reflex. The first: what the advisory recommends is removing the memory ceiling, not tuning it, because a finite, predictable limit is precisely what the confirmed exploit needs to trigger exhaustion at will. The second: the operating system limits `RLIMIT_AS` and `RLIMIT_DATA` must not be used, because they make `mmap()` fail when the limit is reached and send PHP back to the same vulnerable jump. Container limits (cgroups) help only in part: killing a container may also kill the master process and all the workers.

My inference, which does not appear in the advisories: removing the memory ceiling on an exposed service trades a remote code execution risk for a denial-of-service one. It is justified only as an hours-long bridge while the patch is prepared, not as a working configuration. For those who administer containers the practical consequence is direct: editing the `php.ini` of an image contains the risk but does not cure it; the cure is to rebuild on an already patched base.

```ini
; Temporary containment while the patch is prepared.
; Must be enforced administratively (php_admin_value in the FPM pool,
; php_admin_* in Apache) so that no application restores the previous value.
session.upload_progress.enabled = 0
fatal_error_backtraces = 0   ; PHP 8.5 only
memory_limit = -1            ; a bridge of hours; see the text
```

After any change, all processes must be restarted and it must be confirmed that no pool, directory or application restores a finite memory limit, as the advisory indicates.

Verifying the patch has its trap. Since distributions usually incorporate the fix without jumping to the upstream version number, `php -v` is not enough; the reliable check goes through the package changelog (replace `php8.3-cli` with the installed package):

```bash
# Debian and Ubuntu
apt changelog php8.3-cli | grep -n "CVE-2026-109618"
```
