import { ApolloError } from 'apollo-server-express';

export class InvalidPassword extends ApolloError {
  constructor(message = 'Invalid password') {
    super(message);
    this.code = 'INVALID_PASSWORD';
  }
}

export class NoUserExists extends ApolloError {
  constructor(message = 'No user exists') {
    super(message);
    this.code = 'NON_EXISTENT_USER';
  }
}

export class DuplicatedEmail extends ApolloError {
  constructor(message = 'Duplicated email address') {
    super(message);
    this.code = 'DUPLICATED_EMAIL';
  }
}

export class InvalidToken extends ApolloError {
  constructor(message = 'Received invalid token, please check auth token') {
    super(message);
    this.code = 'INVALID_TOKEN';
  }
}
