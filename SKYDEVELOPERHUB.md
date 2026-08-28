# SkyDeveloperHub — Wave 2 slot #164

SkyDeveloperHub is a bounded engineering-beta developer-resource registry core.

## Capability
- Validates resource IDs, titles, kinds, absolute documentation paths, and bounded tags.
- Normalizes tags deterministically, removes duplicates, and produces a stable resource index.
- Rejects duplicate resource IDs.
- Publishes `sky.developer.resource.register.v1` and `sky.developer.resource.index.v1` integration identifiers.
- Replaces the repository's previous fake-success build/test/lint scripts with real TypeScript, executable test, audit, and package verification gates.

## SKYCOIN4444 integration boundary
The registry can provide metadata to a separately hosted documentation/developer experience. `hostsPortal` and `issuesCredentials` are explicitly `false`.

## Limitations
No hosted developer portal, API key issuance, OAuth application registration, credential issuance, billing, telemetry collection, external documentation deployment, durable database, access control service, compliance certification, or verified production deployment is included.
