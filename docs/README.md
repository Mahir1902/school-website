# Project Documentation

This directory contains comprehensive documentation for the Singapore International School website project.

## Purpose

The `/docs` directory serves as a central hub for tracking features, changes, and implementation decisions. It helps maintain project continuity across development sessions and provides context for future work.

## Directory Structure

```
/docs
  /features     - Feature documentation and user guides
  /changes      - Chronological changelog of modifications
  /plans        - Implementation logs and technical decisions
  README.md     - This file
```

## How to Use Each Subdirectory

### `/features`
Contains detailed documentation for each major feature of the website:
- **Purpose**: What the feature does
- **Implementation**: How it works technically
- **Usage**: How to use or modify the feature
- **Architecture**: Key decisions and patterns

**When to update**: After completing a new feature or making significant changes to an existing one.

### `/changes`
Maintains a chronological log of all changes to the project:
- **Date-stamped entries**: When the change was made
- **What changed**: Files modified and nature of changes
- **Why changed**: Rationale and context
- **Related files**: List of affected files

**When to update**: After every significant code change or refactoring.

### `/plans`
Tracks implementation progress and technical decisions:
- **Step-by-step progress**: What has been completed
- **Decisions made**: Architecture choices and trade-offs
- **Issues encountered**: Problems and their solutions
- **Next steps**: Planned future work

**When to update**: During active development of major features.

## Conventions

### File Naming
- Use kebab-case: `sanity-integration.md`, `implementation-log.md`
- Be descriptive: Feature files should match feature names
- Date format in changelog: `YYYY-MM-DD`

### Writing Style
- Use clear, concise language
- Include code examples where helpful
- Link to related files using relative paths
- Keep entries factual and technical

### Maintenance
- Update documentation as you work, not after
- Review and update existing docs when making related changes
- Archive outdated documentation rather than deleting it

## Current Features

1. **Sanity CMS Integration** (In Progress)
   - See: `/features/sanity-integration.md`
   - Status: Phase 0 - Documentation setup complete

## Quick Reference

- **Adding a new feature?** Create a file in `/features/` and update this README
- **Making changes?** Add an entry to `/changes/changelog.md`
- **Working on implementation?** Track progress in `/plans/implementation-log.md`
- **Looking for context?** Check the relevant feature doc or changelog

## Integration with Claude Code

This documentation system is designed to work seamlessly with Claude Code:
- Provides context for future conversations
- Enables efficient problem-solving by referencing past decisions
- Maintains project knowledge across sessions
- Facilitates handoffs and collaboration

---

Last Updated: 2026-01-21
