# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.5] - 2022-10-19
### Added
- Authorization module
- Dockerfiles to run API with a Postgresql container for development

### Changed
- `/users/` route to pass authorization for GET, PATCH, POST, and DELETE
- `/authors/` route to pass authorization for GET, PATCH, POST, and DELETE
- `/books/` route to pass authorization for GET, PATCH, POST, and DELETE
- `/notes/` route to pass authorization for GET, PATCH, POST, and DELETE
- `/readings/` route to pass authorization for GET, PATCH, POST, and DELETE
- `/languages/` route to pass authorization for GET, PATCH, POST, and DELETE

## [0.0.3] - 2022-08-09
### Added
- isPublic column to OwnedEntity
- isAdmin column to User

## [0.0.2] - 2022-08-07
### Added
- `/auth/login` route to get a token
- A Note route

### Changed
- Require token to access API

### Security
- Hash passwords before storing them in the database
- Remove password from response when creating a new user

## [0.0.1] - 2022-08-05
### Added
- This CHANGELOG file to document changes
- A README to introduce the project and explain how to launch and test it
- The Nest starter repository files
- Create .env to store a default configuration which can be overwritten by a local .env.development file
- A User route to the API
- An Author route to the API
- A Language route
- A Book route
- A Reading route

[Unreleased]: https://github.com/taylorhmorris/reading-log-back/compare/v0.0.5...HEAD
[0.0.5]: https://github.com/taylorhmorris/reading-log-back/compare/v0.0.3...v0.0.5
[0.0.3]: https://github.com/taylorhmorris/reading-log-back/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/taylorhmorris/reading-log-back/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/taylorhmorris/reading-log-back/releases/tag/v0.0.1
